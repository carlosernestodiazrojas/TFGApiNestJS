

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileEntity } from '../entities/file.entity';
import { IFileEntityRepository } from 'src/domain/repository-interfaces/ifile-entity.repository-interface';

@Injectable()
export class FileEntityRepository implements IFileEntityRepository {
    constructor(
        @InjectRepository(FileEntity)
        private readonly repo: Repository<FileEntity>,
    ) { }




}