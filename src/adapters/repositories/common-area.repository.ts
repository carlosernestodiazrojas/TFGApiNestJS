import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condominium } from '../entities/condominium.entity';
import { ICommonAreaRepository } from 'src/application/repository-interfaces/icommon-area.repository-interface';
import { CommonArea } from '../entities/common_area.entity';
import { CommonAreaVM } from 'src/adapters/vm/common-area.vm';
import { CreateCommonAreaDto } from '../dtos/common-areas/create-common-area.dto';
import { UpdateCommonAreaDto } from '../dtos/common-areas/update-common-area.dto';

@Injectable()
export class CommonAreaRepository implements ICommonAreaRepository {
    constructor(
        @InjectRepository(CommonArea)
        private readonly repo: Repository<CommonArea>,
        @InjectRepository(Condominium)
        private readonly repoCondominium: Repository<Condominium>
    ) { }

    private toViewModel(common_area: CommonArea): CommonAreaVM {
        return new CommonAreaVM(
            common_area.id,
            common_area.name,
            common_area.description,
            common_area.is_bookable,
            common_area.daily_capacity,
            common_area.is_deleted,
        );
    }

    async findById(id: string): Promise<CommonAreaVM | null> {
        const common_area = await this.repo.findOne({ where: { id } });
        if (!common_area) throw new NotFoundException('Zona comun no encontrada');
        return this.toViewModel(common_area);
    }

    async findAll(condominium_id: string): Promise<CommonAreaVM[]> {

        const condominium = await this.repoCondominium.findOne({ where: { id: condominium_id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');

        const ents = await this.repo.find({
            where: { condominium: { id: condominium.id } },
            relations: ['condominium'],
            order: { created_at: 'ASC' }
        });

        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateCommonAreaDto): Promise<CommonAreaVM> {

        const { condominium_id } = dto

        const condominium = await this.repoCondominium.findOne({ where: { id: condominium_id } });
        if (!condominium) throw new NotFoundException('Edificio no encontrado');

        const ent = this.repo.create({
            is_deleted: false,
            name: dto.name,
            description: dto.description,
            is_bookable: dto.is_bookable,
            daily_capacity: dto.daily_capacity,
            condominium
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateCommonAreaDto): Promise<CommonAreaVM> {

        const common_area = await this.repo.findOne({ where: { id } });
        if (!common_area) throw new NotFoundException('Zona comun no encontrada');

        if (dto.name)
            common_area.name = dto.name

        if (dto.description)
            common_area.description = dto.description

        if (dto.is_bookable !== null)
            common_area.is_bookable = dto.is_bookable

        if (dto.daily_capacity !== null)
            common_area.daily_capacity = dto.daily_capacity

        await this.repo.save(common_area);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as CommonArea);
    }

    async delete(id: string): Promise<void> {

        const common_area = await this.repo.findOne({ where: { id } });
        if (!common_area) throw new NotFoundException('Zona comun no encontrada');

        common_area.is_deleted = true;
        common_area.deleted_at = new Date().toDateString();
        await this.repo.save(common_area);

    }

}
