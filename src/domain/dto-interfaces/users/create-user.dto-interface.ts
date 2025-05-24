import { RoleName } from 'src/common/enums/role-name.enum';

export interface CreateUserDtoInterface {
    email: string;
    password: string;
    role: RoleName;
}