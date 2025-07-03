

import { IHoaVM } from "./hoa.vm-interface";
import { IRoleVM } from "./role.vm-interface";

export class IUserVM {
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    role: IRoleVM;
    hoa: IHoaVM | null;
    images: string[];
    imagesUrls: string[]
    setImagesUrl: (imagesUrls: string[]) => void
}