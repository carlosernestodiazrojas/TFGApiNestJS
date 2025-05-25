
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IHoaMeetingRepository } from 'src/domain/repository-interfaces/ihoa-meeting.repository-interface';
import { HoaMeeting } from '../entities/hoa_meeting.entity';
import { HoaMeetingVM } from 'src/common/vm/hoa-meeting.vm';
import { CreateHoaMeetingDto } from 'src/application/dtos/hoa-meetings/create-hoa-meeting.dto';
import { UpdateHoaMeetingDto } from 'src/application/dtos/hoa-meetings/update-hoa-meeting.dto';
import { Hoa } from '../entities/hoa.entity';

@Injectable()
export class HoaMeetingRepository implements IHoaMeetingRepository {
    constructor(
        @InjectRepository(HoaMeeting)
        private readonly repo: Repository<HoaMeeting>,
        @InjectRepository(Hoa)
        private readonly repoHoa: Repository<Hoa>
    ) { }

    private toViewModel(hoa_meeting: HoaMeeting): HoaMeetingVM {
        return new HoaMeetingVM(
            hoa_meeting.id,
            hoa_meeting.name,
            hoa_meeting.description,
            hoa_meeting.is_ordinary,
            hoa_meeting.is_deleted
        );
    }

    async findById(id: string): Promise<HoaMeetingVM | null> {
        const hoa_meeting = await this.repo.findOne({ where: { id } });
        if (!hoa_meeting) throw new NotFoundException('Junta no encontrada');
        return this.toViewModel(hoa_meeting);
    }

    async findAll(hoa_id: string): Promise<HoaMeetingVM[]> {

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({ where: { hoa } });
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateHoaMeetingDto): Promise<HoaMeetingVM> {

        const { hoa_id } = dto

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ent = this.repo.create({
            name: dto.name,
            description: dto.description,
            is_deleted: false,
            is_ordinary: dto.is_ordinary,
            hoa
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateHoaMeetingDto): Promise<HoaMeetingVM> {

        const hoa_meeting = await this.repo.findOne({ where: { id } });
        if (!hoa_meeting) throw new NotFoundException('Junta no encontrado');

        if (dto.name)
            hoa_meeting.name = dto.name;

        if (dto.description)
            hoa_meeting.description = dto.description;

        if (dto.is_ordinary)
            hoa_meeting.is_ordinary = dto.is_ordinary;

        await this.repo.save(hoa_meeting)

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as HoaMeeting);
    }

    async delete(id: string): Promise<void> {

        const hoa_meeting = await this.repo.findOne({ where: { id } });
        if (!hoa_meeting) throw new NotFoundException('Junta no encontrado');

        hoa_meeting.is_deleted = true;
        hoa_meeting.deleted_at = new Date().toDateString();
        await this.repo.save(hoa_meeting);

    }

}
