import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/infrastructure/entities/file.entity';
import { Repository } from 'typeorm';
import { S3Service } from './s3.service';
import * as crypto from 'crypto';
import * as mime from 'mime-types';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEntity)
        private fileRepo: Repository<FileEntity>,
        private s3Service: S3Service,
    ) { }

    async handleUpload(files: Express.Multer.File[]) {
        const result = [];

        for (const file of files) {
            const sha256 = crypto.createHash('sha256').update(file.buffer).digest('hex');
            const ext = mime.extension(file.mimetype) || 'bin';
            const key = `${sha256}.${ext}`;
            const url = await this.s3Service.uploadFile(key, file.buffer, file.mimetype);

            const fileEntity = this.fileRepo.create({
                sha256,
                mimetype: file.mimetype,
                extension: ext,
                size: file.size,
                originalName: file.originalname,
                url,
            });

            const saved = await this.fileRepo.save(fileEntity);

            result.push(saved.id as never);
        }

        return result;
    }

    async getPreviewStream(id: string) {
        const file = await this.fileRepo.findOne({ where: { id } });
        if (!file) throw new NotFoundException('Archivo no encontrado');

        const key = `${file.sha256}.${file.extension}`;
        const stream = await this.s3Service.getFileStream(key);

        return {
            stream,
            mimetype: file.mimetype,
            originalName: file.originalName,
        };
    }

}
