/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateAnnouncementDto } from "src/adapters/dtos/announcements/create-announcement.dto";
import { UpdateAnnouncementDto } from "src/adapters/dtos/announcements/update-announcement.dto";
import { FileService } from "src/application/services/upload/file.service";
import { AnnouncementManagementUseCase } from "src/application/usecases/announcement/announcement-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnouncementController {

    constructor(
        private useCase: AnnouncementManagementUseCase,
        private fileService: FileService
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles('global_admin')
    async findAll(
        @Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset
    ) {

        const announcements = await this.useCase.findAll(hoa_id, limit, offset);

        for await (const announcement of announcements) {
            const { images } = announcement

            const imagesUrls: string[] = []

            for await (const imageId of images) {
                const { url } = await this.fileService.getPresignedUrlById(imageId);
                imagesUrls.push(url);
            }

            announcement.setImagesUrl(imagesUrls)
        }

        return announcements
    }

    @Get(':id')
    @Roles('global_admin')
    async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        const announcement = await this.useCase.findById(id);

        if (!announcement)
            return null

        const { images } = announcement

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        announcement.setImagesUrl(imagesUrls)
        return announcement;
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