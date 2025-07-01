import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { AnnouncementController } from "./announcement.controller";
import { Announcement } from "src/adapters/entities/announcement.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateAnnouncementDto } from "src/adapters/dtos/announcements/create-announcement.dto";
import { UpdateAnnouncementDto } from "src/adapters/dtos/announcements/update-announcement.dto";
import { AnnouncementManagementUseCase } from "src/application/usecases/announcement/announcement-management.usecase";
import { IAnnouncementRepositoryToken } from "src/application/repository-interfaces/iannouncement.repository-interface";
import { AnnouncementRepository } from "src/adapters/repositories/announcement.repository";
import { FileService } from "src/application/services/upload/file.service";
import { S3Service } from "src/application/services/upload/s3.service";
import { FileEntity } from "src/adapters/entities/file.entity";
import { FileRelation } from "src/adapters/entities/file_relations.entity";
import { IFileRelationRepositoryToken } from "src/application/repository-interfaces/ifile-relation.repository-interface";
import { FileRelationRepository } from "src/adapters/repositories/file-relation.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, Announcement, FileEntity, FileRelation])],
    providers: [
        JwtService,
        RolesGuard,
        CreateAnnouncementDto,
        UpdateAnnouncementDto,
        AnnouncementManagementUseCase,
        {
            provide: IAnnouncementRepositoryToken,
            useClass: AnnouncementRepository,
        },
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        FileService,
        S3Service
    ],
    controllers: [AnnouncementController]
})
export class AnnouncementModule {

}