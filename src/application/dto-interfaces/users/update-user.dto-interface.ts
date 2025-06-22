import { RoleName } from 'src/common/enums/role-name.enum';

export interface IUpdateUserDto {
    email?: string;
    password?: string;
    role?: RoleName;
    name?: string
    last_name?: string
    hoa_id?: string
}