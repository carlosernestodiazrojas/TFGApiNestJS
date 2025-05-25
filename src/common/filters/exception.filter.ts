
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

        // ───> Aquí logueamos el error completo incluyendo stack
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



// import {
//     ExceptionFilter,
//     Catch,
//     ArgumentsHost,
//     HttpException,
//     HttpStatus,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//     catch(exception: unknown, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const status =
//             exception instanceof HttpException
//                 ? exception.getStatus()
//                 : HttpStatus.INTERNAL_SERVER_ERROR;

//         const errorResponse =
//             exception instanceof HttpException
//                 ? (exception.getResponse() as any)?.message || exception.message
//                 : 'Internal server error';

//         response.status(status).json({
//             success: false,
//             data: null,
//             error: Array.isArray(errorResponse)
//                 ? errorResponse
//                 : [errorResponse],
//         });
//     }
// }
