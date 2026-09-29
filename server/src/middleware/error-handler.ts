import type { ErrorRequestHandler, RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { HttpError } from '../lib/http-error.js';

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found.' } });
};

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({ error: { code: error.code, message: error.message } });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      response
        .status(409)
        .json({ error: { code: 'DUPLICATE_VALUE', message: 'A record with this code or value already exists.' } });
      return;
    }
    if (error.code === 'P2003') {
      response
        .status(409)
        .json({ error: { code: 'RECORD_IN_USE', message: 'This record is still in use and cannot be removed.' } });
      return;
    }
    if (error.code === 'P2025') {
      response.status(404).json({ error: { code: 'NOT_FOUND', message: 'Record not found.' } });
      return;
    }
  }

  console.error(error);
  response.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } });
};
