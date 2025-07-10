/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity } from '../entities/file.entity';
import { IFileEntityRepository } from 'src/application/repository-interfaces/ifile-entity.repository-interface';

@Injectable()
export class FileEntityRepository implements IFileEntityRepository {
    constructor(
        @InjectRepository(FileEntity)
        private readonly repo: Repository<FileEntity>,
    ) { }

}