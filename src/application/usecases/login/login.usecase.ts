import { Injectable } from '@nestjs/common';
import { LoginDto } from '../../dtos/users/login.dto';
import { AuthService } from '../../services/login/auth.service';

@Injectable()
export class LoginUseCase {
    constructor(private authService: AuthService) { }

    async execute(dto: LoginDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        return this.authService.login(user);
    }
}