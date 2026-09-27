import { Router } from 'express';
import { Prisma, type PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { HttpError } from '../lib/http-error.js';
import { money } from '../lib/serialize.js';

const code = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and single hyphens only.');
const coolingType = z.enum(['NOT_APPLICABLE', 'NON_AC', 'AC']);
const stayType = z.enum(['WEEKDAY', 'WEEKEND']);
const nonNegativeInteger = z.number().int().min(0).max(1_000_000);
const rate = z.number().finite().min(0).max(9_999_999_999.99);

const variantCreateSchema = z.object({
  code,
  title: z.string().trim().min(2).max(180),
  coolingType,
  nightlyRate: rate,
  displayOrder: nonNegativeInteger.default(0),
  isActive: z.boolean().default(true),
});

const packageCreateSchema = z
  .object({
    code,
    publicName: z.string().trim().min(2).max(160),
    publicDetail: z.string().trim().min(2).max(300),
    stayType,
    minGuests: z.number().int().min(1).max(15),
    maxGuests: z.number().int().min(1).max(15),
    displayOrder: nonNegativeInteger.default(0),
    isActive: z.boolean().default(true),
    variants: z.array(variantCreateSchema).min(1).max(3),
  })
  .superRefine((value, context) => {
    if (value.maxGuests < value.minGuests) {
      context.addIssue({ code: 'custom', path: ['maxGuests'], message: 'Maximum guests must be at least minimum guests.' });
    }
    validateCoolingCombination(
      value.variants.map((variant) => variant.coolingType),
      context,
      ['variants'],
    );
    if (new Set(value.variants.map((variant) => variant.code)).size !== value.variants.length) {
      context.addIssue({ code: 'custom', path: ['variants'], message: 'Variant codes must be unique.' });
    }
  });

const packagePatchSchema = z
  .object({
    code: code.optional(),
    publicName: z.string().trim().min(2).max(160).optional(),
    publicDetail: z.string().trim().min(2).max(300).optional(),
    stayType: stayType.optional(),
    minGuests: z.number().int().min(1).max(15).optional(),
    maxGuests: z.number().int().min(1).max(15).optional(),
    displayOrder: nonNegativeInteger.optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, 'Provide at least one field to update.');

const variantPatchSchema = z
  .object({
    code: code.optional(),
    title: z.string().trim().min(2).max(180).optional(),
    coolingType: coolingType.optional(),
    nightlyRate: rate.optional(),
    displayOrder: nonNegativeInteger.optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, 'Provide at least one field to update.');

function validateCoolingCombination(types: string[], context?: z.RefinementCtx, path: Array<string | number> = []) {
  const unique = new Set(types);
  const valid = unique.size === types.length && !(unique.has('NOT_APPLICABLE') && types.length > 1);
  if (!valid && context) {
    context.addIssue({
      code: 'custom',
      path,
      message: 'Use one flat-rate variant, or distinct NON_AC and AC variants.',
    });
  }
  return valid;
}

function parse<T>(schema: z.ZodType<T>, value: unknown, codeValue: string): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    const detail = result.error.issues[0]?.message ?? 'Invalid input.';
    throw new HttpError(400, codeValue, detail);
  }
  return result.data;
}

const packageInclude = {
  variants: {
    where: { deletedAt: null },
    orderBy: [{ displayOrder: 'asc' as const }, { title: 'asc' as const }],
  },
};
type PackageRecord = Prisma.StayOptionGetPayload<{ include: { variants: true } }>;

function packageJson(item: PackageRecord) {
  return {
    id: item.id,
    code: item.code,
    publicName: item.publicName,
    publicDetail: item.publicDetail,
    stayType: item.stayType,
    minGuests: item.minGuests,
    maxGuests: item.maxGuests,
    displayOrder: item.displayOrder,
    isActive: item.isActive,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    variants: item.variants.map((variant) => ({
      ...variant,
      nightlyRate: money(variant.nightlyRate),
      createdAt: variant.createdAt.toISOString(),
      updatedAt: variant.updatedAt.toISOString(),
    })),
  };
}

async function assertVariantCombination(
  database: PrismaClient,
  stayOptionId: string,
  proposed?: { id?: string; coolingType: string },
) {
  const siblings = await database.packageVariant.findMany({
    where: { stayOptionId, deletedAt: null, ...(proposed?.id ? { id: { not: proposed.id } } : {}) },
    select: { coolingType: true },
  });
  const types = siblings.map((item) => item.coolingType as string);
  if (proposed) types.push(proposed.coolingType);
  if (!validateCoolingCombination(types)) {
    throw new HttpError(
      409,
      'INVALID_VARIANT_COMBINATION',
      'Use one flat-rate variant, or distinct NON_AC and AC variants.',
    );
  }
}

export function createPublicPackagesRouter(database: PrismaClient): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    const items = await database.stayOption.findMany({
      where: { deletedAt: null, isActive: true, variants: { some: { deletedAt: null, isActive: true } } },
      orderBy: [{ stayType: 'asc' }, { displayOrder: 'asc' }, { publicName: 'asc' }],
      include: {
        variants: {
          where: { deletedAt: null, isActive: true },
          orderBy: [{ displayOrder: 'asc' }, { title: 'asc' }],
        },
      },
    });
    response.status(200).json({ packages: items.map(packageJson) });
  });

  return router;
}

export function createAdminPackagesRouter(database: PrismaClient): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    const items = await database.stayOption.findMany({
      where: { deletedAt: null },
      orderBy: [{ stayType: 'asc' }, { displayOrder: 'asc' }, { publicName: 'asc' }],
      include: packageInclude,
    });
    response.status(200).json({ packages: items.map(packageJson) });
  });

  router.post('/', async (request, response) => {
    const input = parse(packageCreateSchema, request.body, 'INVALID_PACKAGE_INPUT');
    const item = await database.stayOption.create({
      data: {
        code: input.code,
        publicName: input.publicName,
        publicDetail: input.publicDetail,
        stayType: input.stayType,
        minGuests: input.minGuests,
        maxGuests: input.maxGuests,
        displayOrder: input.displayOrder,
        isActive: input.isActive,
        variants: { create: input.variants },
      },
      include: packageInclude,
    });
    response.status(201).json({ package: packageJson(item) });
  });

  router.patch('/:id', async (request, response) => {
    const input = parse(packagePatchSchema, request.body, 'INVALID_PACKAGE_INPUT');
    const current = await database.stayOption.findFirst({ where: { id: request.params.id, deletedAt: null } });
    if (!current) throw new HttpError(404, 'PACKAGE_NOT_FOUND', 'Package not found.');
    const minGuests = input.minGuests ?? current.minGuests;
    const maxGuests = input.maxGuests ?? current.maxGuests;
    if (maxGuests < minGuests) {
      throw new HttpError(400, 'INVALID_GUEST_RANGE', 'Maximum guests must be at least minimum guests.');
    }
    const item = await database.stayOption.update({
      where: { id: current.id },
      data: input,
      include: packageInclude,
    });
    response.status(200).json({ package: packageJson(item) });
  });

  router.delete('/:id', async (request, response) => {
    const current = await database.stayOption.findFirst({
      where: { id: request.params.id, deletedAt: null },
      select: { id: true },
    });
    if (!current) throw new HttpError(404, 'PACKAGE_NOT_FOUND', 'Package not found.');
    const deletedAt = new Date();
    await database.$transaction([
      database.packageVariant.updateMany({
        where: { stayOptionId: current.id, deletedAt: null },
        data: { isActive: false, deletedAt },
      }),
      database.stayOption.update({ where: { id: current.id }, data: { isActive: false, deletedAt } }),
    ]);
    response.status(204).send();
  });

  router.post('/:id/variants', async (request, response) => {
    const input = parse(variantCreateSchema, request.body, 'INVALID_VARIANT_INPUT');
    const parent = await database.stayOption.findFirst({
      where: { id: request.params.id, deletedAt: null },
      select: { id: true },
    });
    if (!parent) throw new HttpError(404, 'PACKAGE_NOT_FOUND', 'Package not found.');
    await assertVariantCombination(database, parent.id, { coolingType: input.coolingType });
    const variant = await database.packageVariant.create({ data: { ...input, stayOptionId: parent.id } });
    response.status(201).json({ variant: { ...variant, nightlyRate: money(variant.nightlyRate) } });
  });

  return router;
}

export function createAdminPackageVariantsRouter(database: PrismaClient): Router {
  const router = Router();

  router.patch('/:id', async (request, response) => {
    const input = parse(variantPatchSchema, request.body, 'INVALID_VARIANT_INPUT');
    const current = await database.packageVariant.findFirst({ where: { id: request.params.id, deletedAt: null } });
    if (!current) throw new HttpError(404, 'VARIANT_NOT_FOUND', 'Package variant not found.');
    if (input.coolingType) {
      await assertVariantCombination(database, current.stayOptionId, {
        id: current.id,
        coolingType: input.coolingType,
      });
    }
    const variant = await database.packageVariant.update({ where: { id: current.id }, data: input });
    response.status(200).json({ variant: { ...variant, nightlyRate: money(variant.nightlyRate) } });
  });

  router.delete('/:id', async (request, response) => {
    const current = await database.packageVariant.findFirst({
      where: { id: request.params.id, deletedAt: null },
      select: { id: true },
    });
    if (!current) throw new HttpError(404, 'VARIANT_NOT_FOUND', 'Package variant not found.');
    await database.packageVariant.update({
      where: { id: current.id },
      data: { isActive: false, deletedAt: new Date() },
    });
    response.status(204).send();
  });

  return router;
}
