
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAnnouncementRepository } from 'src/domain/repository-interfaces/iannouncement.repository-interface';
import { Announcement } from '../entities/announcement.entity';
import { AnnouncementVM } from 'src/common/vm/announcement.vm';
import { CreateAnnouncementDto } from 'src/application/dtos/announcements/create-announcement.dto';
import { UpdateAnnouncementDto } from 'src/application/dtos/announcements/update-announcement.dto';
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
            announcement.is_deleted
        );
    }

    async findById(id: string): Promise<AnnouncementVM | null> {
        const announcement = await this.repo.findOne({ where: { id } });
        if (!announcement) throw new NotFoundException('Anuncio no encontrado');
        return this.toViewModel(announcement);
    }

    async findAll(hoa_id: string): Promise<AnnouncementVM[]> {

        const hoa = await this.repoHoa.findOne({ where: { id: hoa_id } });
        if (!hoa) throw new NotFoundException('Comunidad no encontrada');

        const ents = await this.repo.find({ where: { hoa } });
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
            hoa
        });

        const saved = await this.repo.save(ent);
        return this.toViewModel(saved);
    }

    async update(id: string, dto: UpdateAnnouncementDto): Promise<AnnouncementVM> {

        const announcement = await this.repo.findOne({ where: { id } });
        if (!announcement) throw new NotFoundException('Anuncio no encontrado');

        if (dto.title || dto.description)
            await this.repo.update(id, dto);

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
