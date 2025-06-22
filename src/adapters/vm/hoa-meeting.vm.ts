import { IHoaMeetingVM } from "src/application/vm-interfaces/hoa-meeting.vm-interface"

export class HoaMeetingVM implements IHoaMeetingVM {
    constructor(
        id: string,
        name: string,
        description: string,
        is_ordinary: boolean,
        is_deleted: boolean
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.is_ordinary = is_ordinary
        this.is_deleted = is_deleted
    }
    id: string;
    name: string;
    description: string;
    is_ordinary: boolean;
    is_deleted: boolean;
}