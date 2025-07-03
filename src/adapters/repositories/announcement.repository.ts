
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAnnouncementRepository } from 'src/application/repository-interfaces/iannouncement.repository-interface';
import { Announcement } from '../entities/announcement.entity';
import { AnnouncementVM } from 'src/adapters/vm/announcement.vm';
import { CreateAnnouncementDto } from 'src/adapters/dtos/announcements/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/adapters/dtos/announcements/update-announcement.dto';
import { Hoa } from '../entities/hoa.entity';

@Injectable()
export class AnnouncementRepository implements IAnnouncementRepository {
    constructor(
        @InjectRepository(Announcement)
        private readonly repo: Repository<Announcement>,
        @InjectRepository(Hoa)
        private readonly repoHoa: Repository<Hoa>
    ) { }

    private toViewModel(announcement: Announcement): AnnouncementVM {
        return new AnnouncementVM(
            announcement.id,
            announcement.title,
            announcement.description,
            announcement.is_deleted,
            announcement.from,
            announcement.to
        );
    }

    async findById(id: string): Promise<AnnouncementVM | null> {
        const announcement = await this.repo.findOne({ where: { id }, relations: ['files'] });

        if (!announcement) throw new NotFoundException('Anuncio no encontrado');
        return this.toViewModel(announcement);
    }

    async findAll(hoa_id: string, limit: number, offset: number): Promise<AnnouncementVM[]> {

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({
            where: { hoa },
            order: { created_at: 'asc' },
            take: limit,
            skip: offset
        });
        return ents.map(e => this.toViewModel(e));
    }

    async create(dto: CreateAnnouncementDto): Promise<AnnouncementVM> {

        const { hoa_id } = dto

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ent = this.repo.create({
            title: dto.title,
            description: dto.description,
            is_deleted: false,
            from: dto.from,
            to: dto.to,
            hoa
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateAnnouncementDto): Promise<AnnouncementVM> {

        const announcement = await this.repo.findOne({ where: { id } });
        if (!announcement) throw new NotFoundException('Anuncio no encontrado');

        if (dto.title !== null)
            announcement.title = dto.title

        if (dto.description !== null)
            announcement.description = dto.description

        if (dto.from !== null)
            announcement.from = dto.from

        if (dto.to !== null)
            announcement.to = dto.to

        await this.repo.save(announcement);

        const updated = await this.repo.findOne({ where: { id } });
        return this.toViewModel(updated as Announcement);
    }

    async delete(id: string): Promise<void> {

        const announcement = await this.repo.findOne({ where: { id } });
        if (!announcement) throw new NotFoundException('Anuncio no encontrado');

        announcement.is_deleted = true;
        announcement.deleted_at = new Date().toDateString();
        await this.repo.save(announcement);

    }

}
