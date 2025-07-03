import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../../../adapters/entities/user.entity';
import { Role } from '../../../adapters/entities/role.entity';
import { UserRepository } from '../../../adapters/repositories/user.repository';
import { RoleRepository } from '../../../adapters/repositories/role.repository';
import { RegisterUserUseCase } from '../../../application/usecases/register-user.usecase';
import { UpdateUserUseCase } from '../../../application/usecases/update-user.usecase';
import { ChangePasswordUseCase } from '../../../application/usecases/change-password.usecase';
import { IRoleRepositoryToken } from 'src/application/repository-interfaces/irole.repository-interface';
import { IUserRepositoryToken } from 'src/application/repository-interfaces/iuser.repository-interface';
import { JwtService } from '@nestjs/jwt';
import { IHoaMeetingRepositoryToken } from 'src/application/repository-interfaces/ihoa-meeting.repository-interface';
import { HoaRepository } from 'src/adapters/repositories/hoa.repository';
import { Hoa } from 'src/adapters/entities/hoa.entity';
import { IHoaRepositoryToken } from 'src/application/repository-interfaces/ihoa.repository-interface';
import { GetUserUseCase } from 'src/application/usecases/get-user.usecase';
import { FileService } from 'src/application/services/upload/file.service';
import { S3Service } from 'src/application/services/upload/s3.service';
import { IFileRelationRepositoryToken } from 'src/application/repository-interfaces/ifile-relation.repository-interface';
import { FileRelationRepository } from 'src/adapters/repositories/file-relation.repository';
import { FileRelation } from 'src/adapters/entities/file_relations.entity';
import { FileEntity } from 'src/adapters/entities/file.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Hoa, FileEntity, FileRelation])],
    controllers: [UsersController],
    providers: [
        UserRepository,
        RoleRepository,
        HoaRepository,
        RegisterUserUseCase,
        UpdateUserUseCase,
        GetUserUseCase,
        ChangePasswordUseCase,
        {
            provide: IRoleRepositoryToken,
            useClass: RoleRepository,
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserRepository,
        },
        {
            provide: IHoaRepositoryToken,
            useClass: HoaRepository,
        },
        JwtService,
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        FileService,
        S3Service
    ],
})
export class UsersModule { }