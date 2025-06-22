import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

import { CommonAreaManagementUseCase } from "src/application/usecases/common-area/common-area.usecase";
import { CreateCommonAreaDto } from "src/adapters/dtos/common-areas/create-common-area.dto";
import { UpdateCommonAreaDto } from "src/adapters/dtos/common-areas/update-common-area.dto";

@Controller('common-areas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommonAreaController {

    constructor(
        private useCase: CommonAreaManagementUseCase
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
    create(@Body() dto: CreateCommonAreaDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateCommonAreaDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}