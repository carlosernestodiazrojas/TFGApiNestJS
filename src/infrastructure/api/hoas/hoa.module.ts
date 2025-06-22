import { Module } from "@nestjs/common";
import { HoaController } from "./hoa.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { IHoaRepositoryToken } from "src/application/repository-interfaces/ihoa.repository-interface";
import { HoaRepository } from "src/adapters/repositories/hoa.repository";
import { HoaManagementUseCase } from "src/application/usecases/hoa/hoa-management.usecase";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateHoaDto } from "src/adapters/dtos/hoas/create-hoa.dto";
import { UpdateHoaDto } from "src/adapters/dtos/hoas/update-hoa.dto";
import { FileService } from "src/application/services/upload/file.service";

import { IFileEntityRepositoryToken } from "src/application/repository-interfaces/ifile-entity.repository-interface";
import { FileEntityRepository } from "src/adapters/repositories/file-entity.repository";
import { FileEntity } from "src/adapters/entities/file.entity";
import { S3Service } from "src/application/services/upload/s3.service";
import { IFileRelationRepositoryToken } from "src/application/repository-interfaces/ifile-relation.repository-interface";
import { FileRelationRepository } from "src/adapters/repositories/file-relation.repository";
import { FileRelation } from "src/adapters/entities/file_relations.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa, FileEntity, FileRelation])],
    providers: [
        JwtService,
        RolesGuard,
        HoaManagementUseCase,
        {
            provide: IHoaRepositoryToken,
            useClass: HoaRepository,
        },
        {
            provide: IFileEntityRepositoryToken,
            useClass: FileEntityRepository,
        },
        {
            provide: IFileRelationRepositoryToken,
            useClass: FileRelationRepository,
        },
        CreateHoaDto,
        UpdateHoaDto,
        FileService,
        S3Service
    ],
    controllers: [HoaController]
})
export class HoaModule {

}