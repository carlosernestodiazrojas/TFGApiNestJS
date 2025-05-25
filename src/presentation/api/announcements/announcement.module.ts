import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { AnnouncementController } from "./announcement.controller";
import { Announcement } from "src/infrastructure/entities/announcement.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateAnnouncementDto } from "src/application/dtos/announcements/create-announcement.dto";
import { UpdateAnnouncementDto } from "src/application/dtos/announcements/update-announcement.dto";
import { AnnouncementManagementUseCase } from "src/application/usecases/announcement/announcement-management.usecase";
import { IAnnouncementRepositoryToken } from "src/domain/repository-interfaces/iannouncement.repository-interface";
import { AnnouncementRepository } from "src/infrastructure/repositories/announcement.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, Announcement])],
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
    ],
    controllers: [AnnouncementController]
})
export class AnnouncementModule {

}