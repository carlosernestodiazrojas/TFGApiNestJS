import { Module } from "@nestjs/common";
import { HoaController } from "./hoa.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { IHoaRepositoryToken } from "src/domain/repository-interfaces/ihoa.repository-interface";
import { HoaRepository } from "src/infrastructure/repositories/hoa.repository";
import { HoaManagementUseCase } from "src/application/usecases/hoa/hoa-management.usecase";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateHoaDto } from "src/application/dtos/hoas/create-hoa.dto";
import { UpdateHoaDto } from "src/application/dtos/hoas/update-hoa.dto";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa])],
    providers: [
        JwtService,
        RolesGuard,
        HoaManagementUseCase,
        {
            provide: IHoaRepositoryToken,
            useClass: HoaRepository,
        },
        CreateHoaDto,
        UpdateHoaDto
    ],
    controllers: [HoaController]
})
export class HoaModule {

}