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

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(
        private userRepo: UserRepository,
        private registerUseCase: RegisterUserUseCase,
        private updateUseCase: UpdateUserUseCase,
        private changePwdUseCase: ChangePasswordUseCase,
        private getUserUseCase: GetUserUseCase,
        private fileService: FileService
    ) { }

    @Get()
    @Roles(RoleName.GLOBAL_ADMIN)
    findAll() {
        return this.userRepo.findAll();
    }

    @Get(':id')
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
        return user;

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