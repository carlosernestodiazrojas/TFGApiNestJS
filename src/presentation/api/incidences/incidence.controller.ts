import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateIncidenceDto } from "src/application/dtos/incidences/create-incidence.dto";
import { UpdateIncidenceDto } from "src/application/dtos/incidences/update-incidence.dto";
import { IncidenceManagementUseCase } from "src/application/usecases/incidence/incidence-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('incidences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncidenceController {

    constructor(
        private useCase: IncidenceManagementUseCase
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
    create(@Body() dto: CreateIncidenceDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateIncidenceDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}