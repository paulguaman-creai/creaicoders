import { Request, Response, NextFunction } from 'express';
import { logger } from '@infrastructure/config/logger';
import { HttpStatus, ApiResponse } from '@shared/types/common';
import { isProduction } from '@infrastructure/config/app';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  error: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response<ApiResponse> {
  let { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = error;

  // Log del error
  logger.error('Error handled by middleware', {
    error: {
      message: error.message,
      stack: error.stack,
      statusCode,
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
  });

  // En desarrollo, incluir stack trace
  const response: ApiResponse = {
    success: false,
    message: isProduction ? 'Internal Server Error' : message,
  };

  // En desarrollo, añadir detalles del error
  if (!isProduction) {
    response.meta = {
      stack: error.stack,
      originalMessage: message,
    };
  }

  return res.status(statusCode).json(response);
}

// Middleware para rutas no encontradas
export function notFoundHandler(
  req: Request,
  res: Response
): Response<ApiResponse> {
  const message = `Route ${req.originalUrl} not found`;
  
  logger.warn('Route not found', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  return res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message,
  });
}

// Wrapper para funciones async en rutas
export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
} 