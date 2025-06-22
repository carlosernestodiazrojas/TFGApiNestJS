import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../../../adapters/dtos/users/login.dto';
import { LoginUseCase } from '../../../application/usecases/login/login.usecase';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { CreateUserDto } from '../../../adapters/dtos/users/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private registerUseCase: RegisterUserUseCase,
        private loginUseCase: LoginUseCase,
    ) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.registerUseCase.execute(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    logout(@Request() req) {
        // Implementa blacklist si lo deseas
        return { message: 'Logout exitoso' };
    }
}