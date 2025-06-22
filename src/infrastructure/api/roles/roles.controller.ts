import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleRepository } from 'src/adapters/repositories/role.repository';
import { GetRolesUseCase } from 'src/application/usecases/roles/get-roles.usecase';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
    constructor(private getRoleUseCase: GetRolesUseCase) { }

    @Get()
    @Roles('global_admin')
    findAll() {
        return this.getRoleUseCase.execute();
    }
}