
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Incidence } from 'src/infrastructure/entities/incidence.entity';
import { Hoa } from 'src/infrastructure/entities/hoa.entity';
import { Condominium } from 'src/infrastructure/entities/condominium.entity';
import { CommonArea } from 'src/infrastructure/entities/common_area.entity';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { SpecialAssessment } from 'src/infrastructure/entities/special_assessment.entity';
import { HoaMeeting } from 'src/infrastructure/entities/hoa_meeting.entity';
import { Property } from 'src/infrastructure/entities/property.entity';
import { MeetingSubject } from 'src/infrastructure/entities/meeting_subject.entity';
import { Voting } from 'src/infrastructure/entities/voting.entity';
import { VotingResult } from 'src/infrastructure/entities/voting_result.entity';
import { SubjectAssessment } from 'src/infrastructure/entities/subject_assessment.entity';
import { SubjectIncidence } from 'src/infrastructure/entities/subject_incidence.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    console.log('DB_HOST=', config.get('DB_HOST'));
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
        SubjectIncidence
      ],
      synchronize: true,
    };
  },
};