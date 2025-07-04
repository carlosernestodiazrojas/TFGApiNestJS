import { RoleName } from 'src/common/enums/role-name.enum';

export interface ICreateUserDto {
    email: string;
    password: string;
    hoa_id: string;
    role: RoleName;
    file_id?: string
}