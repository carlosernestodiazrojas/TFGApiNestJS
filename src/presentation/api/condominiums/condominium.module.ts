import { Module } from "@nestjs/common";
import { CondominiumController } from "./condominium.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa])],
    providers: [JwtService],
    controllers: [CondominiumController]
})
export class CondominiumModule {

}