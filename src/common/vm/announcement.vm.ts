export class AnnouncementVM {
    constructor(id: string, name: string, code: string) {
        this.id = id
        this.title = name
        this.description = code
    }
    id: string;
    title: string;
    description: string;
}