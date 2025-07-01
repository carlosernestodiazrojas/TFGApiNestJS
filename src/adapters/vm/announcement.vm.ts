import { IAnnouncementVM } from "src/application/vm-interfaces/announcement.vm-interface"

export class AnnouncementVM implements IAnnouncementVM {
    constructor(id: string, title: string, description: string, is_deleted: boolean, from: string, to: string) {
        this.id = id
        this.title = title
        this.description = description
        this.is_deleted = is_deleted
        this.from = from
        this.to = to
        this.images = []
    }
    images: string[]
    id: string;
    title: string;
    description: string;
    is_deleted: boolean;
    from: string;
    to: string;

    imagesUrls: string[]

    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }
}