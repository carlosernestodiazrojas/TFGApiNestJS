import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateHoaMeetingDto } from "src/adapters/dtos/hoa-meetings/create-hoa-meeting.dto";
import { UpdateHoaMeetingDto } from "src/adapters/dtos/hoa-meetings/update-hoa-meeting.dto";
import { HoaMeetingManagementUseCase } from "src/application/usecases/hoa-meeting/hoa-meeting-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('hoa-meetings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HoaMeetingController {

    constructor(
        private useCase: HoaMeetingManagementUseCase
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
    create(@Body() dto: CreateHoaMeetingDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateHoaMeetingDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}