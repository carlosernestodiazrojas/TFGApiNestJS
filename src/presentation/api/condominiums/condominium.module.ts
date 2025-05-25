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

@Module({
    imports: [TypeOrmModule.forFeature([Condominium, Hoa])],
    providers: [
        JwtService,
        RolesGuard,
        CreateCondominiumDto,
        UpdateCondominiumDto,
        {
            provide: ICondominiumRepositoryToken,
            useClass: CondominiumRepository,
        },

        CondominiumManagementUseCase,
    ],
    controllers: [CondominiumController]
})
export class CondominiumModule {

}