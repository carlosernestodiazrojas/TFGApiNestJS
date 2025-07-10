/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { User } from './src/adapters/entities/user.entity';
import { Role } from './src/adapters/entities/role.entity';
import { Incidence } from 'src/adapters/entities/incidence.entity';
import { Hoa } from 'src/adapters/entities/hoa.entity';
import { Condominium } from 'src/adapters/entities/condominium.entity';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { CommonArea } from 'src/adapters/entities/common_area.entity';
import { Announcement } from 'src/adapters/entities/announcement.entity';
import { SpecialAssessment } from 'src/adapters/entities/special-assessment.entity';
import { HoaMeeting } from 'src/adapters/entities/hoa_meeting.entity';
import { Property } from 'src/adapters/entities/property.entity';
import { MeetingSubject } from 'src/adapters/entities/meeting_subject.entity';
import { Voting } from 'src/adapters/entities/voting.entity';
import { VotingResult } from 'src/adapters/entities/voting_result.entity';
import { SubjectAssessment } from 'src/adapters/entities/subject_assessment.entity';
import { SubjectIncidence } from 'src/adapters/entities/subject_incidence.entity';
import { FileEntity } from 'src/adapters/entities/file.entity';
import { FileRelation } from 'src/adapters/entities/file_relations.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
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
  migrations: ['src/migrations/*.ts'],
  migrationsRun: false,
});
