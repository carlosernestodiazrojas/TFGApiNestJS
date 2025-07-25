/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICondominiumRepository } from 'src/application/repository-interfaces/icondominium.repository-interface';
import { Condominium } from '../entities/condominium.entity';
import { CondominiumVM } from 'src/adapters/vm/condominium.vm';
import { CreateCondominiumDto } from 'src/adapters/dtos/condominiums/create-condominium.dto';
import { UpdateCondominiumDto } from 'src/adapters/dtos/condominiums/update-condominium.dto';
import { Hoa } from '../entities/hoa.entity';

@Injectable()
export class CondominiumRepository implements ICondominiumRepository {
    constructor(
        @InjectRepository(Condominium)
        private readonly repo: Repository<Condominium>,
        @InjectRepository(Hoa)
        private readonly repoHoa: Repository<Hoa>
    ) { }

    private toViewModel(condominium: Condominium): CondominiumVM {
        return new CondominiumVM(
            condominium.id,
            condominium.name,
            condominium.description,
            condominium.address,
            condominium.is_deleted,
            condominium.created_at,
            condominium.updated_at
        );
    }

    async findById(id: string): Promise<CondominiumVM | null> {
        const condominium = await this.repo.findOne({ where: { id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');
        return this.toViewModel(condominium);
    }

    async findAll(hoa_id: string): Promise<CondominiumVM[]> {

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({ where: { hoa }, order: { created_at: 'desc' } });
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateCondominiumDto): Promise<CondominiumVM> {

        const { hoa_id } = dto

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ent = this.repo.create({
            name: dto.name,
            address: dto.address,
            description: dto.description,
            is_deleted: false,
            hoa
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateCondominiumDto): Promise<CondominiumVM> {

        const condominium = await this.repo.findOne({ where: { id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');

        if (dto.name || dto.address || dto.description) {
            if (dto.name)
                condominium.name = dto.name
            if (dto.address)
                condominium.address = dto.address
            if (dto.description)
                condominium.description = dto.description

            await this.repo.save(condominium);
        }

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as Condominium);
    }

    async delete(id: string): Promise<void> {

        const condominium = await this.repo.findOne({ where: { id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');

        condominium.is_deleted = true;
        condominium.deleted_at = new Date().toDateString();
        await this.repo.save(condominium);

    }

}
