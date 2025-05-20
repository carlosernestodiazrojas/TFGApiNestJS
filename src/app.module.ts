import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './infrastructure/orm/typeorm.config';
import { AuthModule } from './presentation/api/auth/auth.module';
import { UsersModule } from './presentation/api/users/users.module';
import { RolesModule } from './presentation/api/roles/roles.module';
import { HoaModule } from './presentation/api/hoas/hoa.module';
import { CondominiumModule } from './presentation/api/condominiums/condominium.module';
import { PropertyModule } from './presentation/api/properties/property.module';
import { AnnouncementModule } from './presentation/api/announcements/announcement.module';
import { IncidenceModule } from './presentation/api/incidences/incidence.module';
import { CommonAreaModule } from './presentation/api/common-area/common-area.module';
import { HoaMeetingModule } from './presentation/api/hoa-meetings/hoa-meeting.module';
import { MeetingSubjectModule } from './presentation/api/meeting-subjects/incidence.module';
import { SpecialAssessmentModule } from './presentation/api/special-assessments/special-assessment.module';
import { SubjectAssessmentModule } from './presentation/api/subject-assessments/subject-assessment.module';
import { SubjectIncidenceModule } from './presentation/api/subject-incidences/subject-incidence.module';
import { VotingModule } from './presentation/api/votings/voting.module';
import { VotingResultModule } from './presentation/api/voting-results/voting-result.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'], }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    UsersModule,
    RolesModule,
    HoaModule,
    CondominiumModule,
    PropertyModule,
    AnnouncementModule,
    IncidenceModule,
    CommonAreaModule,
    HoaMeetingModule,
    MeetingSubjectModule,
    SpecialAssessmentModule,
    SubjectAssessmentModule,
    SubjectIncidenceModule,
    VotingModule,
    VotingResultModule
  ],
})
export class AppModule { }
