import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { MeetingSubjectController } from "./meeting-subject.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa])],
    providers: [JwtService],
    controllers: [MeetingSubjectController]
})
export class MeetingSubjectModule {

}