import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepository, IUserRepositoryToken } from '../../../domain/repository-interfaces/iuser.repository-interface';
import { UserVM } from 'src/common/vm/user.vm';

@Injectable()
export class AuthService {
    constructor(
        @Inject(IUserRepositoryToken)
        private userRepo: IUserRepository,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        const match = await bcrypt.compare(pass, user.password);
        if (!match) throw new UnauthorizedException('Credenciales inválidas');
        console.log("user", user)
        return user;
    }

    async login(user: UserVM) {
        const payload = { sub: user.id, email: user.email, role: user.role.name };
        return {
            access_token: this.jwtService.sign(payload),
            email: user.email,
            role: user.role.name,
            user_id: user.id,
            hoa_id: user.hoa ? user.hoa.id : null,
            name: user.name,
            last_name: user.last_name
        };
    }
}