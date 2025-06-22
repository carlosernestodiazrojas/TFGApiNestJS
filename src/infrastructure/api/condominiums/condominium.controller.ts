import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateCondominiumDto } from "src/adapters/dtos/condominiums/create-condominium.dto";
import { UpdateCondominiumDto } from "src/adapters/dtos/condominiums/update-condominium.dto";
import { FileService } from "src/application/services/upload/file.service";
import { CondominiumManagementUseCase } from "src/application/usecases/condominium/condominium-management.usecase";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller('condominiums')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CondominiumController {

    constructor(
        private useCase: CondominiumManagementUseCase,
        private fileService: FileService
    ) { }

    @Get('/allByHoa/:hoa_id')
    @Roles('global_admin')
    async findAll(@Param('hoa_id', new ParseUUIDPipe({ version: '4' })) hoa_id: string) {
        const condominiums = await this.useCase.findAll(hoa_id);

        for await (const condominium of condominiums) {
            const { images } = condominium

            const imagesUrls: string[] = []

            for await (const imageId of images) {
                const { url } = await this.fileService.getPresignedUrlById(imageId);
                imagesUrls.push(url);
            }

            condominium.setImagesUrl(imagesUrls)
        }

        return condominiums
    }

    @Get(':id')
    @Roles('global_admin')
    async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        const condominium = await this.useCase.findById(id)

        if (!condominium)
            return null

        const { images } = condominium

        const imagesUrls: string[] = []

        for await (const imageId of images) {
            const { url } = await this.fileService.getPresignedUrlById(imageId);
            imagesUrls.push(url);
        }

        condominium.setImagesUrl(imagesUrls)
        return condominium;
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