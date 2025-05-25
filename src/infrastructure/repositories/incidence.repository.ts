
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IIncidenceRepository } from 'src/domain/repository-interfaces/iincidence.repository-interface';
import { Incidence } from '../entities/incidence.entity';
import { IncidenceVM } from 'src/common/vm/incidence.vm';
import { CreateIncidenceDto } from 'src/application/dtos/incidences/create-incidence.dto';
import { UpdateIncidenceDto } from 'src/application/dtos/incidences/update-incidence.dto';
import { Hoa } from '../entities/hoa.entity';

@Injectable()
export class IncidenceRepository implements IIncidenceRepository {
    constructor(
        @InjectRepository(Incidence)
        private readonly repo: Repository<Incidence>,
        @InjectRepository(Hoa)
        private readonly repoHoa: Repository<Hoa>
    ) { }

    private toViewModel(incidence: Incidence): IncidenceVM {
        return new IncidenceVM(
            incidence.id,
            incidence.name,
            incidence.description,
            incidence.is_votable,
            incidence.is_solved,
            incidence.solved_at,
            incidence.is_deleted
        );
    }

    async findById(id: string): Promise<IncidenceVM | null> {
        const incidence = await this.repo.findOne({ where: { id } });
        if (!incidence) throw new NotFoundException('Incidencia no encontrada');
        return this.toViewModel(incidence);
    }

    async findAll(hoa_id: string): Promise<IncidenceVM[]> {

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({ where: { hoa } });
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateIncidenceDto): Promise<IncidenceVM> {

        const { hoa_id } = dto

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ent = this.repo.create({
            name: dto.name,
            description: dto.description,
            is_deleted: false,
            is_solved: false,
            is_votable: dto.is_votable,
            hoa
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateIncidenceDto): Promise<IncidenceVM> {

        const incidence = await this.repo.findOne({ where: { id } });
        if (!incidence) throw new NotFoundException('Incidencia no encontrada');

        if (dto.name)
            incidence.name = dto.name;

        if (dto.description)
            incidence.description = dto.description;

        if (dto.is_votable)
            incidence.is_votable = dto.is_votable;

        if (dto.is_solved !== null) {
            incidence.is_solved = dto.is_solved;
            if (dto.is_solved === true)
                incidence.solved_at = new Date().toDateString();
        }

        await this.repo.save(incidence);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as Incidence);
    }

    async delete(id: string): Promise<void> {

        const incidence = await this.repo.findOne({ where: { id } });
        if (!incidence) throw new NotFoundException('Incidencia no encontrada');

        incidence.is_deleted = true;
        incidence.deleted_at = new Date().toDateString();
        await this.repo.save(incidence);

    }

}
