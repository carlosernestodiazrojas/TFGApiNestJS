import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPropertyRepository } from 'src/domain/repository-interfaces/iproperty.repository-interface';
import { Property } from '../entities/property.entity';
import { PropertyVM } from 'src/common/vm/property.vm';
import { CreateCondominiumPropertyDto } from 'src/application/dtos/condominium-properties/create-condominium-property.dto';
import { UpdateCondominiumPropertyDto } from 'src/application/dtos/condominium-properties/update-condominium-property.dto';
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
            property.is_deleted
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
