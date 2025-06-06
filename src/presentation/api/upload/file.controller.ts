import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/application/services/upload/file.service';
import { Response } from 'express';

@Controller('files')
export class FileController {
    constructor(private fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@UploadedFiles() files: Express.Multer.File[]) {
        const ids = await this.fileService.handleUpload(files);
        return { success: true, ids };
    }

    @Get(':id/preview')
    async preview(@Param('id') id: string, @Res() res: Response) {
        const { stream, mimetype, originalName } =
            await this.fileService.getPreviewStream(id);

        res.set({
            'Content-Type': mimetype,
            'Content-Disposition': `inline; filename="${originalName}"`,
        });

        stream.pipe(res);
    }

}
