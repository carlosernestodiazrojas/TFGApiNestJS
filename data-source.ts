
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { User } from './src/infrastructure/entities/user.entity';
import { Role } from './src/infrastructure/entities/role.entity';
import { Incidence } from 'src/infrastructure/entities/incidence.entity';
import { Hoa } from 'src/infrastructure/entities/hoa.entity';
import { Condominium } from 'src/infrastructure/entities/condominium.entity';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { CommonArea } from 'src/infrastructure/entities/common_area.entity';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { SpecialAssessment } from 'src/infrastructure/entities/special-assessment.entity';
import { HoaMeeting } from 'src/infrastructure/entities/hoa_meeting.entity';
import { Property } from 'src/infrastructure/entities/property.entity';
import { MeetingSubject } from 'src/infrastructure/entities/meeting_subject.entity';
import { Voting } from 'src/infrastructure/entities/voting.entity';
import { VotingResult } from 'src/infrastructure/entities/voting_result.entity';
import { SubjectAssessment } from 'src/infrastructure/entities/subject_assessment.entity';
import { SubjectIncidence } from 'src/infrastructure/entities/subject_incidence.entity';

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
    SubjectIncidence
  ],
  synchronize: true,
  migrations: ['src/migrations/*.ts'],
  migrationsRun: false,
});
