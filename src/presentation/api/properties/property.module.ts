import { Module } from "@nestjs/common";
import { PropertyController } from "./property.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/infrastructure/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa])],
    providers: [JwtService],
    controllers: [PropertyController]
})
export class PropertyModule {

}