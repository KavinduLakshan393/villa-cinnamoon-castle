import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import type { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { classifyNights, dateKey, parseDateKey, todayInSriLanka } from '../lib/dates.js';
import { HttpError } from '../lib/http-error.js';
import { money } from '../lib/serialize.js';

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const portion = z.enum(['WEEKDAY', 'WEEKEND']);
const inquiryCreateSchema = z.object({
  customerName: z.string().trim().min(3).max(160),
  whatsappNumber: z.string().trim().regex(/^\+[1-9]\d{6,14}$/),
  checkIn: dateString,
  checkOut: dateString,
  guestCount: z.number().int().min(1).max(15),
  specialRequests: z.string().trim().max(500).optional().nullable(),
  consent: z.literal(true),
  selections: z
    .array(z.object({ portion, packageVariantId: z.string().uuid() }))
    .min(1)
    .max(2)
    .refine(
      (value) => new Set(value.map((selection) => selection.portion)).size === value.length,
      'Each stay portion can be selected only once.',
    ),
});

const inquiryFilterSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']).optional(),
  checkInFrom: dateString.optional(),
  checkInTo: dateString.optional(),
});
const decisionSchema = z.object({ decision: z.enum(['ACCEPTED', 'REJECTED']) });

function parse<T>(schema: z.ZodType<T>, value: unknown, code: string): T {
  const result = schema.safeParse(value);
  if (!result.success) throw new HttpError(400, code, result.error.issues[0]?.message ?? 'Invalid input.');
  return result.data;
}

function inquiryReference() {
  const day = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `VCC-${day}-${randomBytes(4).toString('hex').toUpperCase()}`;
}

const inquiryInclude = {
  quoteLines: { orderBy: { portion: 'asc' as const } },
  decidedByAdmin: { select: { id: true, displayName: true } },
};
type InquiryRecord = Prisma.InquiryGetPayload<{ include: typeof inquiryInclude }>;

function inquiryJson(item: InquiryRecord) {
  const lines = item.quoteLines.map((line) => {
    const nightlyRate = money(line.quotedNightlyRate);
    return {
      id: line.id,
      packageVariantId: line.packageVariantId,
      portion: line.portion,
      nightCount: line.nightCount,
      stayName: line.quotedStayName,
      packageTitle: line.quotedPackageTitle,
      coolingType: line.quotedCoolingType,
      nightlyRate,
      subtotal: nightlyRate * line.nightCount,
    };
  });
  return {
    id: item.id,
    reference: item.reference,
    customerName: item.customerName,
    whatsappNumber: item.whatsappNumber,
    checkIn: dateKey(item.checkIn),
    checkOut: dateKey(item.checkOut),
    guestCount: item.guestCount,
    specialRequests: item.specialRequests,
    status: item.status,
    consentedAt: item.consentedAt.toISOString(),
    decidedAt: item.decidedAt?.toISOString() ?? null,
    decidedByAdmin: item.decidedByAdmin,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    quoteLines: lines,
    estimatedTotal: lines.reduce((total, line) => total + line.subtotal, 0),
  };
}

export function whatsappDecisionMessage(item: InquiryRecord, decision: 'ACCEPTED' | 'REJECTED') {
  if (decision === 'ACCEPTED') {
    return [
      `Hello ${item.customerName},`,
      '',
      `Your Villa Cinnamoon Castle stay inquiry ${item.reference} for ${dateKey(item.checkIn)} to ${dateKey(item.checkOut)} has been accepted.`,
      'Please review this message and reply to confirm the booking details with us.',
      '',
      'Thank you.',
    ].join('\n');
  }
  return [
    `Hello ${item.customerName},`,
    '',
    `Thank you for your Villa Cinnamoon Castle stay inquiry ${item.reference} for ${dateKey(item.checkIn)} to ${dateKey(item.checkOut)}.`,
    'Unfortunately, we are unable to accept this inquiry for the requested dates.',
    '',
    'Please contact us if you would like to check alternative dates. Thank you.',
  ].join('\n');
}

export function decisionWhatsappUrl(number: string, message: string) {
  return `https://wa.me/${number.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`;
}

export function createPublicInquiriesRouter(database: PrismaClient): Router {
  const router = Router();
  const submitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: { code: 'INQUIRY_RATE_LIMITED', message: 'Too many inquiries. Please try again later.' } },
  });

  router.post('/', submitLimiter, async (request, response) => {
    const input = parse(inquiryCreateSchema, request.body, 'INVALID_INQUIRY_INPUT');
    const checkIn = parseDateKey(input.checkIn, 'checkIn');
    const checkOut = parseDateKey(input.checkOut, 'checkOut');
    if (input.checkIn < todayInSriLanka()) {
      throw new HttpError(400, 'CHECK_IN_IN_PAST', 'Check-in cannot be in the past.');
    }
    const nights = classifyNights(checkIn, checkOut);
    const requiredPortions = (['WEEKDAY', 'WEEKEND'] as const).filter((key) => nights[key] > 0);
    const submittedPortions = new Set(input.selections.map((selection) => selection.portion));
    if (requiredPortions.length !== submittedPortions.size || requiredPortions.some((key) => !submittedPortions.has(key))) {
      throw new HttpError(
        400,
        'INCOMPLETE_STAY_SELECTION',
        'Select a package for every weekday/weekend portion of the stay.',
      );
    }

    const ids = input.selections.map((selection) => selection.packageVariantId);
    const variants = await database.packageVariant.findMany({
      where: {
        id: { in: ids },
        deletedAt: null,
        isActive: true,
        stayOption: { deletedAt: null, isActive: true },
      },
      include: { stayOption: true },
    });
    if (variants.length !== ids.length) {
      throw new HttpError(400, 'PACKAGE_UNAVAILABLE', 'One or more selected packages are unavailable.');
    }

    const byId = new Map(variants.map((variant) => [variant.id, variant]));
    const quoteLines = input.selections.map((selection) => {
      const variant = byId.get(selection.packageVariantId)!;
      if (variant.stayOption.stayType !== selection.portion) {
        throw new HttpError(400, 'PACKAGE_PORTION_MISMATCH', 'A selected package does not match its stay portion.');
      }
      if (input.guestCount > variant.stayOption.maxGuests) {
        throw new HttpError(400, 'PACKAGE_CAPACITY_EXCEEDED', 'A selected package cannot accommodate this guest count.');
      }
      return {
        packageVariantId: variant.id,
        portion: selection.portion,
        nightCount: nights[selection.portion],
        quotedStayName: variant.stayOption.publicName,
        quotedPackageTitle: variant.title,
        quotedCoolingType: variant.coolingType,
        quotedNightlyRate: variant.nightlyRate,
      };
    });

    const item = await database.inquiry.create({
      data: {
        reference: inquiryReference(),
        customerName: input.customerName,
        whatsappNumber: input.whatsappNumber,
        checkIn,
        checkOut,
        guestCount: input.guestCount,
        specialRequests: input.specialRequests || null,
        consentedAt: new Date(),
        quoteLines: { create: quoteLines },
      },
      include: inquiryInclude,
    });
    response.status(201).json({ inquiry: inquiryJson(item) });
  });

  return router;
}

export function createAdminInquiriesRouter(database: PrismaClient): Router {
  const router = Router();

  router.get('/', async (request, response) => {
    const filters = parse(inquiryFilterSchema, request.query, 'INVALID_INQUIRY_FILTER');
    const checkInFilter: Prisma.DateTimeFilter = {};
    if (filters.checkInFrom) checkInFilter.gte = parseDateKey(filters.checkInFrom, 'checkInFrom');
    if (filters.checkInTo) checkInFilter.lte = parseDateKey(filters.checkInTo, 'checkInTo');
    const items = await database.inquiry.findMany({
      where: {
        ...(filters.status ? { status: filters.status } : {}),
        ...(Object.keys(checkInFilter).length ? { checkIn: checkInFilter } : {}),
      },
      orderBy: [{ checkIn: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
      include: inquiryInclude,
    });
    const groups = new Map<string, ReturnType<typeof inquiryJson>[]>();
    items.forEach((item) => {
      const key = dateKey(item.checkIn);
      const group = groups.get(key) ?? [];
      group.push(inquiryJson(item));
      groups.set(key, group);
    });
    response.status(200).json({
      groups: [...groups].map(([checkIn, inquiries]) => ({ checkIn, inquiries })),
      total: items.length,
    });
  });

  router.get('/:id', async (request, response) => {
    const item = await database.inquiry.findUnique({ where: { id: request.params.id }, include: inquiryInclude });
    if (!item) throw new HttpError(404, 'INQUIRY_NOT_FOUND', 'Inquiry not found.');
    response.status(200).json({ inquiry: inquiryJson(item) });
  });

  router.patch('/:id/decision', async (request, response) => {
    const input = parse(decisionSchema, request.body, 'INVALID_INQUIRY_DECISION');
    const existing = await database.inquiry.findUnique({ where: { id: request.params.id }, select: { id: true } });
    if (!existing) throw new HttpError(404, 'INQUIRY_NOT_FOUND', 'Inquiry not found.');
    const item = await database.inquiry.update({
      where: { id: existing.id },
      data: {
        status: input.decision,
        decidedAt: new Date(),
        decidedByAdminId: request.adminAuth!.adminId,
      },
      include: inquiryInclude,
    });
    const message = whatsappDecisionMessage(item, input.decision);
    response.status(200).json({
      inquiry: inquiryJson(item),
      whatsapp: { message, url: decisionWhatsappUrl(item.whatsappNumber, message) },
    });
  });

  return router;
}
