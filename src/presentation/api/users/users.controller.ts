import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UpdateUserDto } from '../../../application/dtos/users/update-user.dto';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { UpdateUserUseCase } from '../../../application/usecases/update-user.usecase';
import { ChangePasswordUseCase } from '../../../application/usecases/change-password.usecase';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { RoleName } from 'src/common/enums/role-name.enum';
import { ChangePasswordDto } from 'src/application/dtos/users/change-password.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private userRepo: UserRepository,
        private registerUseCase: RegisterUserUseCase,
        private updateUseCase: UpdateUserUseCase,
        private changePwdUseCase: ChangePasswordUseCase,
    ) { }

    @Get()
    @Roles(RoleName.GLOBAL_ADMIN)
    findAll() {
        return this.userRepo.findAll();
    }

    @Get(':id')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN, RoleName.PRESIDENT, RoleName.OWNER)
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.userRepo.findById(id);
    }

    @Patch(':id')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN)
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateUserDto) {
        return this.updateUseCase.execute(id, dto);
    }

    @Patch(':id/password')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN, RoleName.PRESIDENT, RoleName.OWNER)
    changePassword(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() body: ChangePasswordDto) {
        return this.changePwdUseCase.execute(id, body.oldPass, body.newPass);
    }
}