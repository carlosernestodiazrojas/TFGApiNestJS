/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Test, TestingModule } from '@nestjs/testing';
import {
    AnnouncementManagementUseCase
} from './announcement-management.usecase';
import {
    IAnnouncementRepository,
    IAnnouncementRepositoryToken
} from 'src/application/repository-interfaces/iannouncement.repository-interface';
import {
    ICreateAnnouncementDto
} from 'src/application/dto-interfaces/announcement/create-announcement.dto-interface';
import {
    IUpdateAnnouncementDto
} from 'src/application/dto-interfaces/announcement/update-announcement.dto-interface';
import {
    IAnnouncementVM
} from 'src/application/vm-interfaces/announcement.vm-interface';
import {
    IFileRelationRepository,
    IFileRelationRepositoryToken
} from 'src/application/repository-interfaces/ifile-relation.repository-interface';

describe('AnnouncementManagementUseCase', () => {
    let useCase: AnnouncementManagementUseCase;
    let repositoryMock: IAnnouncementRepository;

    const mockAnnouncementRepo = {
        create: jest.fn(),
        update: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
    };

    const mockFileRelationRepo = {
        create: jest.fn(),
        update: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn(),
        findByEntityId: jest.fn(),
        deleteByEntityId: jest.fn(),
        findByRelationIdAndCreateOrReplace: jest.fn(),
        findByRelationId: jest.fn(),
        findByRelationsIds: jest.fn(),
    };

    beforeEach(async () => {

        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnnouncementManagementUseCase,
                {
                    provide: IAnnouncementRepositoryToken,
                    useValue: mockAnnouncementRepo,
                },
                {
                    provide: IFileRelationRepositoryToken,
                    useValue: mockFileRelationRepo,
                },
            ],
        }).compile();

        useCase = module.
            get<AnnouncementManagementUseCase>(AnnouncementManagementUseCase);
        repositoryMock = module.
            get<IAnnouncementRepository>(IAnnouncementRepositoryToken);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('create', () => {
        it('Debe llamar a repository.create con el DTO correcto y devolver el resultado', async () => {
            const dto: ICreateAnnouncementDto = { title: 'Test', file_id: [] } as unknown as ICreateAnnouncementDto;
            const expectedResult: IAnnouncementVM = { id: '123', title: 'Test' } as IAnnouncementVM;
            
            mockAnnouncementRepo.create.mockResolvedValue(expectedResult);
            mockAnnouncementRepo.findById.mockResolvedValue(expectedResult);
            mockFileRelationRepo.findByRelationId.mockResolvedValue([]);
            
            const result = await useCase.create(dto);
            expect(repositoryMock.create).toHaveBeenCalledWith(dto);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('update', () => {
        it('Debe llamar a repository.update con el ID y el DTO correctos y devolver el resultado.', 
            async () => {
            const id = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            const dto: IUpdateAnnouncementDto = { title: 'Updated', file_id: [] } as unknown as IUpdateAnnouncementDto;
            const expectedResult: IAnnouncementVM = { id: id, title: 'Updated' } as IAnnouncementVM;
            
            mockAnnouncementRepo.update.mockResolvedValue(expectedResult);
            mockAnnouncementRepo.findById.mockResolvedValue(expectedResult);
            mockFileRelationRepo.findByRelationId.mockResolvedValue([]);
            
            const result = await useCase.update(id, dto);
            expect(repositoryMock.update).toHaveBeenCalledWith(id, dto);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('findById', () => {
        it('Debe llamar a repository.findById con el ID correcto y devolver el resultado', async () => {
            const id = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            const expectedResult: IAnnouncementVM = { id: id, title: 'Found' } as IAnnouncementVM;
            
            mockAnnouncementRepo.findById.mockResolvedValue(expectedResult);
            mockFileRelationRepo.findByRelationId.mockResolvedValue([]);
            
            const result = await useCase.findById(id);
            expect(repositoryMock.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('findAll', () => {
        it('Debe llamar a `repository.findAll` con el `hoa_id` correcto y devolver el resultado.', async () => {
            const hoaId = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            const limit = 10;
            const offset = 0;
            const expectedResult: IAnnouncementVM[] = [{ id: '1', title: 'First' } as IAnnouncementVM];

            mockAnnouncementRepo.findAll.mockResolvedValue(expectedResult);
            mockFileRelationRepo.findByRelationsIds.mockResolvedValue(new Map());
            
            const result = await useCase.findAll(hoaId, limit, offset);
            expect(repositoryMock.findAll).toHaveBeenCalledWith(hoaId, limit, offset);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('delete', () => {
        it('Debe llamar a repository.delete con el ID correcto.', async () => {
            const id = 'f82a1b94-8857-4b68-b391-4e7a3d2e9c1c';
            mockAnnouncementRepo.delete.mockResolvedValue(undefined);
            await useCase.delete(id);
            expect(repositoryMock.delete).toHaveBeenCalledWith(id);
        });
    });
});