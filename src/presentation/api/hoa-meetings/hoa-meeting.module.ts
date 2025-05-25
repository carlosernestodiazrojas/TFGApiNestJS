import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { HoaMeetingController } from "./hoa-meeting.controller";
import { HoaMeeting } from "src/infrastructure/entities/hoa_meeting.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateHoaMeetingDto } from "src/application/dtos/hoa-meetings/create-hoa-meeting.dto";
import { UpdateHoaMeetingDto } from "src/application/dtos/hoa-meetings/update-hoa-meeting.dto";
import { HoaMeetingManagementUseCase } from "src/application/usecases/hoa-meeting/hoa-meeting-management.usecase";
import { IHoaMeetingRepositoryToken } from "src/domain/repository-interfaces/ihoa-meeting.repository-interface";
import { HoaMeetingRepository } from "src/infrastructure/repositories/hoa-meeting.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, HoaMeeting])],
    providers: [
        JwtService,
        RolesGuard,
        CreateHoaMeetingDto,
        UpdateHoaMeetingDto,
        HoaMeetingManagementUseCase,
        {
            provide: IHoaMeetingRepositoryToken,
            useClass: HoaMeetingRepository,
        },
    ],
    controllers: [HoaMeetingController]
})
export class HoaMeetingModule {

}