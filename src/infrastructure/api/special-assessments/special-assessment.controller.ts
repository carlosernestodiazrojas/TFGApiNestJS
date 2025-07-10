/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateSpecialAssessmentDto } from "src/adapters/dtos/special-assessments/create-special-assessment.dto";
import { UpdateSpecialAssessmentDto } from "src/adapters/dtos/special-assessments/update-special-assessment.dto";
import { FileService } from "src/application/services/upload/file.service";
import { SpecialAssessmentManagementUseCase } from "src/application/usecases/special-assessment/special-assessment-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('special-assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpecialAssessmentController {

    constructor(
        private useCase: SpecialAssessmentManagementUseCase,
        private fileService: FileService
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles('global_admin')
    async findAll(@Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string) {

        const specialAssessments = await this.useCase.findAll(hoa_id);

        for await (const specialAssessment of specialAssessments) {
            const { images } = specialAssessment

            const imagesUrls: string[] = []

            for await (const imageId of images) {
                const { url } = await this.fileService.getPresignedUrlById(imageId);
                imagesUrls.push(url);
            }

            specialAssessment.setImagesUrl(imagesUrls)
        }

        return specialAssessments

    }

    @Get(':id')
    @Roles('global_admin')
    async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        const specialAssessment = await this.useCase.findById(id);

        if (!specialAssessment)
            return null

        const { images } = specialAssessment

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        specialAssessment.setImagesUrl(imagesUrls)
        return specialAssessment;

    }

    @Post()
    @Roles('global_admin')
    create(@Body() dto: CreateSpecialAssessmentDto) {
        return this.useCase.create(dto);
    }

    @Patch(':id')
    @Roles('global_admin')
    update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() dto: UpdateSpecialAssessmentDto) {
        return this.useCase.update(id, dto);
    }

    @Delete(':id')
    @Roles('global_admin')
    delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.useCase.delete(id);
    }

}