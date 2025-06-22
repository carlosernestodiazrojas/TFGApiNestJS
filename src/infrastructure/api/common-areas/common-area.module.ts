import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { CommonAreaController } from "./common-area.controller";
import { Condominium } from "src/adapters/entities/condominium.entity";
import { CommonArea } from "src/adapters/entities/common_area.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CommonAreaManagementUseCase } from "src/application/usecases/common-area/common-area.usecase";
import { CreateCommonAreaDto } from "src/adapters/dtos/common-areas/create-common-area.dto";
import { UpdateCommonAreaDto } from "src/adapters/dtos/common-areas/update-common-area.dto";
import { ICommonAreaRepositoryToken } from "src/application/repository-interfaces/icommon-area.repository-interface";
import { CommonAreaRepository } from "src/adapters/repositories/common-area.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Condominium, CommonArea])],
    providers: [
        JwtService,
        RolesGuard,
        CommonAreaManagementUseCase,
        CreateCommonAreaDto,
        UpdateCommonAreaDto,
        {
            provide: ICommonAreaRepositoryToken,
            useClass: CommonAreaRepository,
        },
    ],
    controllers: [CommonAreaController]
})
export class CommonAreaModule {

}