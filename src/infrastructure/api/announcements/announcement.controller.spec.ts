/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementController } from './announcement.controller';
import {
    AnnouncementManagementUseCase
} from 'src/application/usecases/announcement/announcement-management.usecase';
import {
    CreateAnnouncementDto
} from 'src/adapters/dtos/announcements/create-announcement.dto';
import {
    UpdateAnnouncementDto
} from 'src/adapters/dtos/announcements/update-announcement.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { FileService } from 'src/application/services/upload/file.service';

const HOA_ID = 'cf35a93a-8753-4803-a24e-5e927a4a9563';

describe('AnnouncementController', () => {
    let controller: AnnouncementController;
    let useCaseMock: AnnouncementManagementUseCase;

    const mockUseCase = {
        create: jest.fn(),
        update: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
    };

    const mockFileService = {
        uploadFile: jest.fn(),
        deleteFile: jest.fn(),
        getFileUrl: jest.fn(),
        validateFile: jest.fn(),
        getPresignedUrlById: jest.fn().mockResolvedValue({ url: 'https://example.com/file.jpg' }),
    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnnouncementController],
            providers: [
                {
                    provide: AnnouncementManagementUseCase,
                    useValue: mockUseCase,
                },
                {
                    provide: FileService,
                    useValue: mockFileService,
                },
            ],
        })

            .overrideGuard(JwtAuthGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .overrideGuard(RolesGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .compile();

        controller = module.get<AnnouncementController>(AnnouncementController);
        useCaseMock = module.get<AnnouncementManagementUseCase>(AnnouncementManagementUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('Debe llamar a useCase.create con el DTO de creacion del anuncio', async () => {
            const dto: CreateAnnouncementDto = {
                title: 'Nuevo Anuncio',
                description: 'Descripción del nuevo anuncio',
                hoa_id: HOA_ID,
                from: '2025-06-23T12:00:00Z',
                to: '2025-06-25T12:00:00Z',
            } as CreateAnnouncementDto;
            await controller.create(dto);
            expect(useCaseMock.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('Debe llamar a useCase.findAll con el id de la comunidad recibido', async () => {
            const hoaId = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            const limit = 10;
            const offset = 0;
            
            const mockAnnouncements = [
                {
                    id: '1',
                    title: 'Test Announcement',
                    images: ['image1', 'image2'],
                    setImagesUrl: jest.fn()
                }
            ];
            mockUseCase.findAll.mockResolvedValue(mockAnnouncements);
            
            await controller.findAll(hoaId, limit, offset);
            expect(useCaseMock.findAll).toHaveBeenCalledWith(hoaId, limit, offset);
        });
    });

    describe('findById', () => {
        it('Debe llamar a useCase.findById con el ID recibido', async () => {
            const announcementId = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            
            const mockAnnouncement = {
                id: announcementId,
                title: 'Test Announcement',
                images: ['image1'],
                setImagesUrl: jest.fn()
            };
            mockUseCase.findById.mockResolvedValue(mockAnnouncement);
            
            await controller.findById(announcementId);
            expect(useCaseMock.findById).toHaveBeenCalledWith(announcementId);
        });
    });

    describe('update', () => {
        it('Debe llamar a useCase.update con el ID y el DTO de actualizacion.', async () => {
            const announcementId = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            const dto: UpdateAnnouncementDto = {
                title: 'Nuevo Anuncio editado',
                description: 'Descripción del nuevo anuncio editado',
                from: '2025-06-23T12:00:00Z',
                to: '2025-06-25T12:00:00Z',
                file_id: ''
            };
            await controller.update(announcementId, dto);
            expect(useCaseMock.update).toHaveBeenCalledWith(announcementId, dto);
        });
    });

    describe('delete', () => {
        it('Debe llamar a useCase.delete con el ID recibido.', async () => {
            const announcementId = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            await controller.delete(announcementId);
            expect(useCaseMock.delete).toHaveBeenCalledWith(announcementId);
        });
    });
});