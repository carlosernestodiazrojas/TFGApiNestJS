
export interface ResponseInterfaceDto<T> {
    success: boolean;
    data: T;
    error: any[];
}