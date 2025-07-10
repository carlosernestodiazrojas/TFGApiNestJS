/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse =
            exception instanceof HttpException
                ? (exception.getResponse() as any)?.message || exception.message
                : 'Internal server error';

        const stack = exception instanceof Error ? exception.stack : undefined;
        this.logger.error(
            `HTTP ${status} — ${request.method} ${request.url} — ${JSON.stringify(
                errorResponse,
            )}`,
            stack,
        );

        response.status(status).json({
            success: false,
            data: null,
            error: Array.isArray(errorResponse)
                ? errorResponse
                : [errorResponse],
        });
    }
}

