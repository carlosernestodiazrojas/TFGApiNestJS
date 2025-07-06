

import { IUserVM } from "src/application/vm-interfaces/user.vm-interface";
import { HoaVM } from "./hoa.vm";
import { RoleVM } from "./role.vm";
import { PropertyVM } from "./property.vm";

export class UserVM implements IUserVM {
    constructor(
        id: string,
        email: string,
        password: string,
        name: string,
        last_name: string,
        role: RoleVM,
        hoa: HoaVM | null,
        property: PropertyVM | null
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.hoa = hoa
        this.name = name;
        this.last_name = last_name
        this.images = []
        this.imagesUrls = []
        this.property = property
    }
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    role: RoleVM;
    hoa: HoaVM | null;
    property: PropertyVM | null;

    images: string[]
    imagesUrls: string[]
    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }
}