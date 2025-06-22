export interface IHoaVM {
    id: string;
    name: string;
    address: string;
    images: string[]
    imagesUrls: string[]
    setImagesUrl: (imagesUrls: string[]) => void
}