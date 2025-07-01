import { IIncidenceVM } from "src/application/vm-interfaces/incidence.vm-interface"

export class IncidenceVM implements IIncidenceVM {
    constructor(
        id: string,
        name: string,
        description: string,
        is_votable: boolean,
        is_solved: boolean,
        solved_at: string,
        is_deleted: boolean
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.is_votable = is_votable
        this.is_solved = is_solved
        this.solved_at = solved_at
        this.is_deleted = is_deleted
        this.images = []
        this.imagesUrls = []
    }

    id: string;
    name: string;
    description: string;
    is_votable: boolean;
    is_solved: boolean;
    solved_at: string;
    is_deleted: boolean;
    images: string[]
    imagesUrls: string[]
    public setImagesUrl(imagesUrls: string[]) {
        this.imagesUrls = imagesUrls
    }
}