import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPropertyRepository } from 'src/application/repository-interfaces/iproperty.repository-interface';
import { Property } from '../entities/property.entity';
import { PropertyVM } from 'src/adapters/vm/property.vm';
import { CreateCondominiumPropertyDto } from 'src/adapters/dtos/condominium-properties/create-condominium-property.dto';
import { UpdateCondominiumPropertyDto } from 'src/adapters/dtos/condominium-properties/update-condominium-property.dto';
import { Condominium } from '../entities/condominium.entity';

@Injectable()
export class CondominiumPropertyRepository implements IPropertyRepository {
    constructor(
        @InjectRepository(Property)
        private readonly repo: Repository<Property>,
        @InjectRepository(Condominium)
        private readonly repoCondominium: Repository<Condominium>
    ) { }

    private toViewModel(property: Property): PropertyVM {
        return new PropertyVM(
            property.id,
            property.property_identifier,
            property.is_deleted,
            property.property_type,
            property.has_storage_room,
            property.has_parking_space,
            property.current_on_payments,
            property.created_at,
            property.updated_at
        );
    }

    async findById(id: string): Promise<PropertyVM | null> {
        const property = await this.repo.findOne({ where: { id } });
        if (!property) throw new NotFoundException('Propiedad no encontrada');
        return this.toViewModel(property);
    }

    async findAll(condominium_id: string): Promise<PropertyVM[]> {

        const condominium = await this.repoCondominium.findOne({ where: { id: condominium_id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');

        const ents = await this.repo.find({
            where: { condominium: { id: condominium.id } },
            relations: ['condominium'],
            order: { created_at: 'desc' },
        });

        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateCondominiumPropertyDto): Promise<PropertyVM> {

        const { condominium_id } = dto

        const condominium = await this.repoCondominium.findOne({ where: { id: condominium_id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');

        const ent = this.repo.create({
            property_identifier: dto.property_identifier,
            is_deleted: false,
            current_on_payments: dto.current_on_payments,
            has_parking_space: dto.has_parking_space,
            has_storage_room: dto.has_storage_room,
            property_type: dto.property_type,
            condominium
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateCondominiumPropertyDto): Promise<PropertyVM> {

        const property = await this.repo.findOne({ where: { id } });
        if (!property) throw new NotFoundException('Propiedad no encontrada');

        if (dto.property_identifier)
            property.property_identifier = dto.property_identifier

        if (dto.property_type)
            property.property_type = dto.property_type

        if (dto.has_parking_space !== null)
            property.has_parking_space = dto.has_parking_space

        if (dto.has_storage_room !== null)
            property.has_storage_room = dto.has_storage_room

        if (dto.current_on_payments !== null)
            property.current_on_payments = dto.current_on_payments

        await this.repo.save(property);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as Property);
    }

    async delete(id: string): Promise<void> {

        const property = await this.repo.findOne({ where: { id } });
        if (!property) throw new NotFoundException('Propiedad no encontrada');

        property.is_deleted = true;
        property.deleted_at = new Date().toDateString();
        await this.repo.save(property);

    }

}
