export interface ICondominiumVM {
    id: string;
    name: string;
    description: string;
    address: string;
    is_deleted: boolean;
    images: string[]
    imagesUrls: string[]
    setImagesUrl: (imagesUrls: string[]) => void

}