import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateHoaDto } from "src/application/dtos/hoas/create-hoa.dto";
import { UpdateHoaDto } from "src/application/dtos/hoas/update-hoa.dto";
import { FileService } from "src/application/services/upload/file.service";
import { HoaManagementUseCase } from "src/application/usecases/hoa/hoa-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('hoas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HoaController {
    constructor(
        private useCase: HoaManagementUseCase,
        private fileService: FileService
    ) { }

    @Get()
    @Roles('global_admin')
    findAll() {
        return this.useCase.findAll();
    }

    @Get(':id')
    @Roles('global_admin')
    async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        const hoa = await this.useCase.findById(id)
        if (!hoa)
            return null

        const { images } = hoa

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        hoa.setImagesUrl(imagesUrls)
        return hoa;
    }

    @Post()
    @Roles('global_admin')
    create(@Body() dto: CreateHoaDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateHoaDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}