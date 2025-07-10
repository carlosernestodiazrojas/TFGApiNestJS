/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Incidence } from 'src/adapters/entities/incidence.entity';
import { Hoa } from 'src/adapters/entities/hoa.entity';
import { Condominium } from 'src/adapters/entities/condominium.entity';
import { CommonArea } from 'src/adapters/entities/common_area.entity';
import { Announcement } from 'src/adapters/entities/announcement.entity';
import { SpecialAssessment } from 'src/adapters/entities/special-assessment.entity';
import { HoaMeeting } from 'src/adapters/entities/hoa_meeting.entity';
import { Property } from 'src/adapters/entities/property.entity';
import { MeetingSubject } from 'src/adapters/entities/meeting_subject.entity';
import { Voting } from 'src/adapters/entities/voting.entity';
import { VotingResult } from '../entities/voting_result.entity';
import { SubjectAssessment } from 'src/adapters/entities/subject_assessment.entity';
import { SubjectIncidence } from 'src/adapters/entities/subject_incidence.entity';
import { FileEntity } from '../entities/file.entity';
import { FileRelation } from '../entities/file_relations.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASS'),
      database: config.get<string>('DB_NAME'),
      entities: [
        User,
        Role,
        Incidence,
        Hoa,
        Condominium,
        CommonArea,
        Announcement,
        SpecialAssessment,
        HoaMeeting,
        Property,
        MeetingSubject,
        Voting,
        VotingResult,
        SubjectAssessment,
        SubjectIncidence,
        FileEntity,
        FileRelation
      ],
      synchronize: true,
    };
  },
};