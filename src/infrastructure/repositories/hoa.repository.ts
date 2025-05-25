
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IHoaRepository } from 'src/domain/repository-interfaces/ihoa.repository-interface';
import { Hoa } from '../entities/hoa.entity';
import { HoaVM } from 'src/common/vm/hoa.vm';
import { CreateHoaDto } from 'src/application/dtos/hoas/create-hoa.dto';
import { UpdateHoaDto } from 'src/application/dtos/hoas/update-hoa.dto';

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
            hoa.address
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

        if (dto.name || dto.address)
            await this.repo.update(id, dto);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as Hoa);
    }

    async delete(id: string): Promise<void> {

        const hoa = await this.repo.findOne({ where: { id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        await this.repo.remove(hoa);
    }

}
