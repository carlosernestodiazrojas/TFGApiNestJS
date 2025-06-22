import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateAnnouncementDto } from "src/adapters/dtos/announcements/create-announcement.dto";
import { UpdateAnnouncementDto } from "src/adapters/dtos/announcements/update-announcement.dto";
import { AnnouncementManagementUseCase } from "src/application/usecases/announcement/announcement-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnouncementController {

    constructor(
        private useCase: AnnouncementManagementUseCase
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
    create(@Body() dto: CreateAnnouncementDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateAnnouncementDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}