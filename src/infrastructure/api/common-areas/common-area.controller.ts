import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

import { CommonAreaManagementUseCase } from "src/application/usecases/common-area/common-area.usecase";
import { CreateCommonAreaDto } from "src/adapters/dtos/common-areas/create-common-area.dto";
import { UpdateCommonAreaDto } from "src/adapters/dtos/common-areas/update-common-area.dto";
import { FileService } from "src/application/services/upload/file.service";

@Controller('common-areas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommonAreaController {

    constructor(
        private useCase: CommonAreaManagementUseCase,
        private fileService: FileService
    ) { }

    @Get('/allByCondominium/:condominium_id')
    @Roles('global_admin')
    async findAll(@Param('condominium_id', new ParseUUIDPipe({ version: '4' })) condominium_id: string) {

        const commonAreas = await this.useCase.findAll(condominium_id);

        console.log("Common areas", commonAreas)

        for await (const commonArea of commonAreas) {
            const { images } = commonArea

            const imagesUrls: string[] = []

            for await (const imageId of images) {
                const { url } = await this.fileService.getPresignedUrlById(imageId);
                imagesUrls.push(url);
            }

            commonArea.setImagesUrl(imagesUrls)
        }

        return commonAreas


    }

    @Get(':id')
    @Roles('global_admin')
    async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        const commonArea = await this.useCase.findById(id);

        if (!commonArea)
            return null

        const { images } = commonArea

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        commonArea.setImagesUrl(imagesUrls)
        return commonArea;

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