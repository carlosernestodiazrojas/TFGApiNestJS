/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IHoaRepository } from 'src/application/repository-interfaces/ihoa.repository-interface';
import { Hoa } from '../entities/hoa.entity';
import { HoaVM } from 'src/adapters/vm/hoa.vm';
import { CreateHoaDto } from 'src/adapters/dtos/hoas/create-hoa.dto';
import { UpdateHoaDto } from 'src/adapters/dtos/hoas/update-hoa.dto';

@Injectable()
export class HoaRepository implements IHoaRepository {
    constructor(
        @InjectRepository(Hoa)
        private readonly repo: Repository<Hoa>,
    ) { }

    private toViewModel(hoa: Hoa): HoaVM {
        return new HoaVM(
            hoa.id,
            hoa.name,
            hoa.address,
            hoa.president_id,
            hoa.admin_id
        );
    }

    async findById(id: string): Promise<HoaVM | null> {
        const hoa = await this.repo.findOne({ where: { id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');
        return this.toViewModel(hoa);
    }

    async findAll(): Promise<HoaVM[]> {
        const ents = await this.repo.find();
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateHoaDto): Promise<HoaVM> {

        const ent = this.repo.create({
            name: dto.name,
            address: dto.address
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateHoaDto): Promise<HoaVM> {

        const hoa = await this.repo.findOne({ where: { id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        if (dto.name || dto.address || dto.admin_id || dto.president_id)
            await this.repo.update(id, dto);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as Hoa);
    }

    async delete(id: string): Promise<void> {

        const hoa = await this.repo.findOne({ where: { id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        await this.repo.remove(hoa);
    }


    async getPropertiesStatistics(hoaId: string) {
        const queryBuilder = this.repo
            .createQueryBuilder('hoa')
            .leftJoin('hoa.condominiums', 'condominium')
            .leftJoin('condominium.properties', 'property');

        queryBuilder.andWhere('hoa.id = :hoaId', { hoaId });

        queryBuilder.andWhere('property.is_deleted = false');

        const result = await queryBuilder
            .select([
                'COUNT(*) as total_properties',
                'SUM(CASE WHEN property.has_storage_room = true THEN 1 ELSE 0 END) as properties_with_storage_room',
                'SUM(CASE WHEN property.has_parking_space = true THEN 1 ELSE 0 END) as properties_with_parking_space',
                'SUM(CASE WHEN property.current_on_payments = true THEN 1 ELSE 0 END) as properties_current_on_payments',
                'ROUND((SUM(CASE WHEN property.has_storage_room = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as storage_room_percentage',
                'ROUND((SUM(CASE WHEN property.has_parking_space = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as parking_space_percentage',
                'ROUND((SUM(CASE WHEN property.current_on_payments = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as current_payments_percentage',
                'SUM(CASE WHEN property.property_type = \'interior\' THEN 1 ELSE 0 END) as interior_count',
                'SUM(CASE WHEN property.property_type = \'exterior\' THEN 1 ELSE 0 END) as exterior_count',
                'SUM(CASE WHEN property.property_type = \'atico\' THEN 1 ELSE 0 END) as atico_count',
                'SUM(CASE WHEN property.property_type = \'bajo\' THEN 1 ELSE 0 END) as bajo_count',
                'SUM(CASE WHEN property.property_type = \'local\' THEN 1 ELSE 0 END) as local_count',
                'ROUND((SUM(CASE WHEN property.property_type = \'interior\' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as interior_percentage',
                'ROUND((SUM(CASE WHEN property.property_type = \'exterior\' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as exterior_percentage',
                'ROUND((SUM(CASE WHEN property.property_type = \'atico\' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as atico_percentage',
                'ROUND((SUM(CASE WHEN property.property_type = \'bajo\' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as bajo_percentage',
                'ROUND((SUM(CASE WHEN property.property_type = \'local\' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as local_percentage',
            ])
            .getRawOne();

        return {
            total_properties: parseInt(result.total_properties) || 0,

            storage_room: {
                count: parseInt(result.properties_with_storage_room) || 0,
                percentage: parseFloat(result.storage_room_percentage) || 0,
            },
            parking_space: {
                count: parseInt(result.properties_with_parking_space) || 0,
                percentage: parseFloat(result.parking_space_percentage) || 0,
            },
            current_on_payments: {
                count: parseInt(result.properties_current_on_payments) || 0,
                percentage: parseFloat(result.current_payments_percentage) || 0,
            },

            property_types: {
                interior: {
                    count: parseInt(result.interior_count) || 0,
                    percentage: parseFloat(result.interior_percentage) || 0,
                },
                exterior: {
                    count: parseInt(result.exterior_count) || 0,
                    percentage: parseFloat(result.exterior_percentage) || 0,
                },
                atico: {
                    count: parseInt(result.atico_count) || 0,
                    percentage: parseFloat(result.atico_percentage) || 0,
                },
                bajo: {
                    count: parseInt(result.bajo_count) || 0,
                    percentage: parseFloat(result.bajo_percentage) || 0,
                },
                local: {
                    count: parseInt(result.local_count) || 0,
                    percentage: parseFloat(result.local_percentage) || 0,
                },
            },
        };
    }


}
