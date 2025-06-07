import { Module } from "@nestjs/common";
import { CondominiumController } from "./condominium.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { CondominiumManagementUseCase } from "src/application/usecases/condominium/condominium-management.usecase";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateCondominiumDto } from "src/application/dtos/condominiums/create-condominium.dto";
import { UpdateCondominiumDto } from "src/application/dtos/condominiums/update-condominium.dto";
import { ICondominiumRepositoryToken } from "src/domain/repository-interfaces/icondominium.repository-interface";
import { CondominiumRepository } from "src/infrastructure/repositories/condominium.repository";
import { IHoaRepositoryToken } from "src/domain/repository-interfaces/ihoa.repository-interface";
import { HoaRepository } from "src/infrastructure/repositories/hoa.repository";
import { HoaManagementUseCase } from "src/application/usecases/hoa/hoa-management.usecase";
import { Condominium } from "src/infrastructure/entities/condominium.entity";
import { IFileRelationRepositoryToken } from "src/domain/repository-interfaces/ifile-relation.repository-interface";
import { FileRelationRepository } from "src/infrastructure/repositories/file-relation.repository";
import { FileEntity } from "src/infrastructure/entities/file.entity";
import { FileRelation } from "src/infrastructure/entities/file_relations.entity";
import { FileService } from "src/application/services/upload/file.service";
import { S3Service } from "src/application/services/upload/s3.service";

@Module({
    imports: [TypeOrmModule.forFeature([Condominium, Hoa, FileEntity, FileRelation])],
    providers: [
        JwtService,
        RolesGuard,
        CreateCondominiumDto,
        UpdateCondominiumDto,
        {
            provide: ICondominiumRepositoryToken,
            useClass: CondominiumRepository,
        },
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        CondominiumManagementUseCase,
        FileService,
        S3Service
    ],
    controllers: [CondominiumController]
})
export class CondominiumModule {

}