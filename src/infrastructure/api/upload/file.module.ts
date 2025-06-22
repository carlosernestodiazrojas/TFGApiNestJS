import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/adapters/entities/file.entity';
import { FileService } from 'src/application/services/upload/file.service';
import { S3Service } from 'src/application/services/upload/s3.service';
import { FileController } from './file.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FileEntity])],
    controllers: [FileController],
    providers: [FileService, S3Service],
})
export class FileModule { }
