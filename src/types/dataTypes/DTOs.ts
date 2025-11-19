export type CreateUploadDTO = {
    count: number;
    contentType: string
}

export type CreateJobRequestDTO = {
    model: string,
    prompt: string,
    inputKeys: string[],
    options: object
}