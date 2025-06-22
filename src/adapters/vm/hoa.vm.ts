import { IHoaVM } from "src/application/vm-interfaces/hoa.vm-interface"

export class HoaVM implements IHoaVM {
    constructor(id: string, name: string, address: string) {
        this.id = id
        this.name = name
        this.address = address
        this.images = []
        this.imagesUrls = []
    }
    id: string;
    name: string;
    address: string;
    images: string[]
    imagesUrls: string[]

    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }

}