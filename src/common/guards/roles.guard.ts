import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        if (!requiredRoles) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization as string;
        if (!authHeader) {
            throw new UnauthorizedException('No se proporcionó token JWT');
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('Formato de Authorization inválido');
        }

        let payload: any;
        try {
            payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET || 'secretKey',
            });
        } catch (err) {
            throw new UnauthorizedException('Token inválido o expirado');
        }

        const userRole = payload.role;
        if (!userRole || !requiredRoles.includes(userRole)) {
            throw new ForbiddenException(
                `Se requiere uno de estos roles: [${requiredRoles.join(
                    ', ',
                )}]`,
            );
        }

        req.user = payload;

        return true;
    }
}
