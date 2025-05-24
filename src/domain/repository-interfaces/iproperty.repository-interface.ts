import { PropertyVM } from 'src/common/vm/property.vm';
import { CreatePropertyDtoInterface } from '../dto-interfaces/property/create-property.dto-interface';
import { UpdatePropertyDtoInterface } from '../dto-interfaces/property/update-property.dto-interface';

export const IPropertyRepositoryToken = 'IPropertyRepository';

export interface IPropertyRepository {
    findByEmail(email: string): Promise<PropertyVM | null>;
    findById(id: string): Promise<PropertyVM | null>;
    findAll(): Promise<PropertyVM[]>;
    create(dto: CreatePropertyDtoInterface): Promise<PropertyVM>;
    update(id: string, dto: UpdatePropertyDtoInterface): Promise<PropertyVM>;
    delete(id: string): Promise<void>;
}