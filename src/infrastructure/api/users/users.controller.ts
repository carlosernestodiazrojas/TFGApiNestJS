/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UpdateUserDto } from '../../../adapters/dtos/users/update-user.dto';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { UpdateUserUseCase } from '../../../application/usecases/update-user.usecase';
import { ChangePasswordUseCase } from '../../../application/usecases/change-password.usecase';
import { UserRepository } from '../../../adapters/repositories/user.repository';
import { RoleName } from 'src/common/enums/role-name.enum';
import { ChangePasswordDto } from 'src/adapters/dtos/users/change-password.dto';
import { GetUserUseCase } from 'src/application/usecases/get-user.usecase';
import { FileService } from 'src/application/services/upload/file.service';
import { GetAllUsersUseCase } from 'src/application/usecases/get-all-users.usecase';

import { UserVM } from 'src/adapters/vm/user.vm';
import { ResetPasswordDto } from 'src/adapters/dtos/users/reset-password.dto';
import { ToggleUserActiveUseCase } from 'src/application/usecases/toggle-active-user.usecase';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private userRepo: UserRepository,
        private registerUseCase: RegisterUserUseCase,
        private updateUseCase: UpdateUserUseCase,
        private changePwdUseCase: ChangePasswordUseCase,
        private getUserUseCase: GetUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private fileService: FileService,
        private toggleUserActiveUseCase: ToggleUserActiveUseCase
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles(RoleName.GLOBAL_ADMIN)
    async findAll(@Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string) {

        const users = await this.getAllUsersUseCase.execute(hoa_id);

        for await (const user of users) {
            const { images } = user

            const imagesUrls: string[] = []

            for await (const imageId of images) {
                const { url } = await this.fileService.getPresignedUrlById(imageId);
                imagesUrls.push(url);
            }

            user.setImagesUrl(imagesUrls)

        }

        return users

    }

    @Get('/getUser/:id')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN, RoleName.PRESIDENT, RoleName.OWNER)
    async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        const user = await this.getUserUseCase.execute(id)

        if (!user)
            return null

        const { images } = user

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        user.setImagesUrl(imagesUrls)

        const { password, ...userNoPassword } = user

        return userNoPassword;

    }

    @Patch(':id')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN)
    async update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateUserDto) {
        const user = await this.updateUseCase.execute(id, dto);
        const { password, ...userNoPassword } = user as UserVM
        return userNoPassword;
    }

    @Patch(':id/password')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN, RoleName.PRESIDENT, RoleName.OWNER)
    changePassword(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() body: ChangePasswordDto) {
        return this.changePwdUseCase.execute(id, body.oldPass, body.newPass);
    }

    @Patch(':id/password_reset')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN)
    passwordReset(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() body: ResetPasswordDto) {
        return this.changePwdUseCase.forceChangePassword(id, body.newPass);
    }

    @Patch(':id/toggle_active')
    @Roles(RoleName.GLOBAL_ADMIN, RoleName.ADMIN)
    toogleActive(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.toggleUserActiveUseCase.execute(id);
    }

}