import { Injectable } from '@nestjs/common';
import { AuthService } from '../../services/login/auth.service';
import { ILoginDto } from 'src/application/dto-interfaces/users/login.dto-interface';

@Injectable()
export class LoginUseCase {
    constructor(private authService: AuthService) { }

    async execute(dto: ILoginDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        return this.authService.login(user);
    }
}