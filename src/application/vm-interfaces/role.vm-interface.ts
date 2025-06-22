
import { RoleName } from "src/common/enums/role-name.enum";

export interface IRoleVM {
    id: string;
    code: number;
    name: RoleName;
}