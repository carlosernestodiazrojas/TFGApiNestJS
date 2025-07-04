import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AnnouncementRepository } from './announcement.repository';
import { Announcement } from '../entities/announcement.entity';
import { Hoa } from '../entities/hoa.entity';
import {
    CreateAnnouncementDto
} from 'src/adapters/dtos/announcements/create-announcement.dto';
import { AnnouncementVM } from 'src/adapters/vm/announcement.vm';

const HOA_ID = 'cf35a93a-8753-4803-a24e-5e927a4a9563';
const ANNOUNCEMENT_ID = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';

const mockHoa: Hoa = { id: HOA_ID, name: 'Comunidad Test' } as Hoa;

const mockAnnouncement: Announcement = {
    id: ANNOUNCEMENT_ID,
    title: 'Anuncio de Prueba',
    description: 'Esta es una descripción.',
    from: '2025-06-23T12:00:00Z',
    to: '2025-06-30T12:00:00Z',
    hoa: mockHoa,
    is_deleted: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: new Date().toISOString(),
    files: []
};

const mockAnnouncementVM: AnnouncementVM = new AnnouncementVM(
    mockAnnouncement.id,
    mockAnnouncement.title,
    mockAnnouncement.description,
    mockAnnouncement.is_deleted,
    mockAnnouncement.from,
    mockAnnouncement.to
);

describe('AnnouncementRepository', () => {
    let repository: AnnouncementRepository;
    let announcementRepoMock: Repository<Announcement>;
    let hoaRepoMock: Repository<Hoa>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnnouncementRepository,
                {
                    provide: getRepositoryToken(Announcement),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Hoa),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<AnnouncementRepository>(AnnouncementRepository);
        announcementRepoMock = module.get<Repository<Announcement>>(getRepositoryToken(Announcement));
        hoaRepoMock = module.get<Repository<Hoa>>(getRepositoryToken(Hoa));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('Debe crear y devolver una VM de anuncio cuando la comunidad exista', async () => {
            const createDto: CreateAnnouncementDto = {
                title: 'Nuevo Anuncio',
                description: 'Descripción del nuevo anuncio',
                hoa_id: HOA_ID,
                from: '2025-06-23T12:00:00Z',
                to: '2025-06-25T12:00:00Z',
                file_id: ''
            };

            const createdEntity = { ...createDto, id: ANNOUNCEMENT_ID, is_deleted: false, hoa: mockHoa };

            jest.spyOn(hoaRepoMock, 'findOne').mockResolvedValue(mockHoa);
            jest.spyOn(announcementRepoMock, 'create').mockReturnValue(createdEntity as any);
            jest.spyOn(announcementRepoMock, 'save').mockResolvedValue(createdEntity as any);
            const result = await repository.create(createDto);
            expect(hoaRepoMock.findOne).toHaveBeenCalledWith({ where: { id: HOA_ID } });
            expect(announcementRepoMock.create)
                .toHaveBeenCalledWith(expect.objectContaining({ title: createDto.title, hoa: mockHoa }));
            expect(announcementRepoMock.save).toHaveBeenCalledWith(createdEntity);
            expect(result).toBeInstanceOf(AnnouncementVM);
            expect(result.title).toEqual(createDto.title);
        });

        it('Debe lanzar NotFoundException si la comunidad no existe.', async () => {
            const createDto: CreateAnnouncementDto = { hoa_id: HOA_ID } as CreateAnnouncementDto;
            jest.spyOn(hoaRepoMock, 'findOne').mockResolvedValue(null);
            await expect(repository.create(createDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findById', () => {
        it('Debe encontrar y devolver un anuncio si existe.', async () => {

            jest.spyOn(announcementRepoMock, 'findOne').mockResolvedValue(mockAnnouncement);
            const result = await repository.findById(ANNOUNCEMENT_ID);
            expect(result).toEqual(mockAnnouncementVM);
            expect(announcementRepoMock.findOne).toHaveBeenCalledWith({ where: { id: ANNOUNCEMENT_ID } });
        });

        it('Debe lanzar NotFoundException si el anuncio no existe', async () => {
            jest.spyOn(announcementRepoMock, 'findOne').mockResolvedValue(null);
            await expect(repository.findById(ANNOUNCEMENT_ID)).rejects.toThrow(NotFoundException);
        });
    });

    describe('delete', () => {
        it('Debe eliminar lógicamente un anuncio si existe', async () => {
            const announcementToUpdate = { ...mockAnnouncement, save: jest.fn().mockResolvedValue(true) };
            jest.spyOn(announcementRepoMock, 'findOne').mockResolvedValue(announcementToUpdate as any);
            await repository.delete(ANNOUNCEMENT_ID);
            expect(announcementRepoMock.findOne).toHaveBeenCalledWith({ where: { id: ANNOUNCEMENT_ID } });
            expect(announcementToUpdate.is_deleted).toBe(true);
            expect(announcementToUpdate.deleted_at).toBeDefined();
            expect(announcementRepoMock.save).toHaveBeenCalledWith(expect.objectContaining({ is_deleted: true }));
        });

        it('Debe lanzar NotFoundException si el anuncio a eliminar no existe.', async () => {
            jest.spyOn(announcementRepoMock, 'findOne').mockResolvedValue(null);
            await expect(repository.delete(ANNOUNCEMENT_ID)).rejects.toThrow(NotFoundException);
        });
    });
});