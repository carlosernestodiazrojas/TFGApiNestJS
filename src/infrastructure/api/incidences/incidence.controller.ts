/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateIncidenceDto } from "src/adapters/dtos/incidences/create-incidence.dto";
import { UpdateIncidenceDto } from "src/adapters/dtos/incidences/update-incidence.dto";
import { FileService } from "src/application/services/upload/file.service";
import { IncidenceManagementUseCase } from "src/application/usecases/incidence/incidence-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('incidences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncidenceController {

    constructor(
        private useCase: IncidenceManagementUseCase,
        private fileService: FileService
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles('global_admin')
    async findAll(@Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string) {

        const incidences = await this.useCase.findAll(hoa_id);

        for await (const incidence of incidences) {
            const { images } = incidence

            const imagesUrls: string[] = []

            for await (const imageId of images) {
                const { url } = await this.fileService.getPresignedUrlById(imageId);
                imagesUrls.push(url);
            }

            incidence.setImagesUrl(imagesUrls)
        }

        return incidences
    }

    @Get(':id')
    @Roles('global_admin')
    async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        const incidence = await this.useCase.findById(id);

        if (!incidence)
            return null

        const { images } = incidence

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        incidence.setImagesUrl(imagesUrls)
        return incidence;

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