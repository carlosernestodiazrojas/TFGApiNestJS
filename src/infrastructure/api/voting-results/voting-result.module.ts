/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hoa } from "src/adapters/entities/hoa.entity";
import { JwtService } from "@nestjs/jwt";
import { VotingResultController } from "./voting-result.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Hoa])],
    providers: [JwtService],
    controllers: [VotingResultController]
})
export class VotingResultModule {

}