import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateCondominiumPropertyDto } from "src/adapters/dtos/condominium-properties/create-condominium-property.dto";
import { UpdateCondominiumPropertyDto } from "src/adapters/dtos/condominium-properties/update-condominium-property.dto";
import { CondominiumPropertyManagementUseCase } from "src/application/usecases/condominium-property/property-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PropertyController {

    constructor(
        private useCase: CondominiumPropertyManagementUseCase
    ) { }

    @Get('/allByCondominium/:condominium_id')
    @Roles('global_admin')
    findAll(@Param('condominium_id', new ParseUUIDPipe({ version: '4' })) condominium_id: string) {
        return this.useCase.findAll(condominium_id);
    }

    @Get(':id')
    @Roles('global_admin')
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.findById(id);
    }

    @Post()
    @Roles('global_admin')
    create(@Body() dto: CreateCondominiumPropertyDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateCondominiumPropertyDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}