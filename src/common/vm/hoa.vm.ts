export class HoaVM {
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