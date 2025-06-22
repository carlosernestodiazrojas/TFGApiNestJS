import { ICondominiumVM } from "src/application/vm-interfaces/condominium.vm-interface"

export class CondominiumVM implements ICondominiumVM {
    constructor(
        id: string,
        name: string,
        description: string,
        address: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.address = address
        this.is_deleted = is_deleted
        this.images = []
        this.imagesUrls = []
    }
    id: string;
    name: string;
    description: string;
    address: string;
    is_deleted: boolean;

    images: string[]
    imagesUrls: string[]

    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }


}