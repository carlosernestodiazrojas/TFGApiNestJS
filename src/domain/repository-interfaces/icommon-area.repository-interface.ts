import { CommonAreaVM } from 'src/common/vm/common-area.vm';
import { CreateCommonAreaDtoInterface } from '../dto-interfaces/common-area/create-common-area.dto-interface';
import { UpdateCommonAreaDtoInterface } from '../dto-interfaces/common-area/update-common-area.dto-interface';

export const ICommonAreaRepositoryToken = 'ICommonAreaRepository';

export interface ICommonAreaRepository {
    findById(id: string): Promise<CommonAreaVM | null>;
    findAll(condominium_id: string): Promise<CommonAreaVM[]>;
    create(dto: CreateCommonAreaDtoInterface): Promise<CommonAreaVM>;
    update(id: string, dto: UpdateCommonAreaDtoInterface): Promise<CommonAreaVM>;
    delete(id: string): Promise<void>;
}