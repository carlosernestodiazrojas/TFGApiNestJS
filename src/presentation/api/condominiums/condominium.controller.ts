import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateCondominiumDto } from "src/application/dtos/condominiums/create-condominium.dto";
import { UpdateCondominiumDto } from "src/application/dtos/condominiums/update-condominium.dto";
import { CondominiumManagementUseCase } from "src/application/usecases/condominium/condominium-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('condominiums')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CondominiumController {

    constructor(
        private useCase: CondominiumManagementUseCase
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles('global_admin')
    findAll(@Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string) {
        return this.useCase.findAll(hoa_id);
    }

    @Get(':id')
    @Roles('global_admin')
    findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.findById(id);
    }

    @Post()
    @Roles('global_admin')
    create(@Body() dto: CreateCondominiumDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateCondominiumDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}