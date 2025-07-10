/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './adapters/orm/typeorm.config';
import { AuthModule } from './infrastructure/api/auth/auth.module';
import { UsersModule } from './infrastructure/api/users/users.module';
import { RolesModule } from './infrastructure/api/roles/roles.module';
import { HoaModule } from './infrastructure/api/hoas/hoa.module';
import { CondominiumModule } from './infrastructure/api/condominiums/condominium.module';
import { PropertyModule } from './infrastructure/api/properties/property.module';
import { AnnouncementModule } from './infrastructure/api/announcements/announcement.module';
import { IncidenceModule } from './infrastructure/api/incidences/incidence.module';
import { CommonAreaModule } from './infrastructure/api/common-areas/common-area.module';
import { HoaMeetingModule } from './infrastructure/api/hoa-meetings/hoa-meeting.module';
import { MeetingSubjectModule } from './infrastructure/api/meeting-subjects/incidence.module';
import { SpecialAssessmentModule } from './infrastructure/api/special-assessments/special-assessment.module';
import { SubjectAssessmentModule } from './infrastructure/api/subject-assessments/subject-assessment.module';
import { SubjectIncidenceModule } from './infrastructure/api/subject-incidences/subject-incidence.module';
import { VotingModule } from './infrastructure/api/votings/voting.module';
import { VotingResultModule } from './infrastructure/api/voting-results/voting-result.module';
import { FileModule } from './infrastructure/api/upload/file.module';

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
    VotingResultModule,
    FileModule
  ],
})
export class AppModule { }
