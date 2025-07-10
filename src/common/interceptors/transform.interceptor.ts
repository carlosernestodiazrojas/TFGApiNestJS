/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseInterfaceDto } from '../interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, ResponseInterfaceDto<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ResponseInterfaceDto<T>> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data,
                error: [],
            })),
        );
    }
}
