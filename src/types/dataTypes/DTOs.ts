export type CreateUploadDTO = {
    count: number;
    contentType: string
}


export type CreateJobRequestDTO = {
    model: string,
    prompt: string,
    inputKeys: string[],
    inputContentTypes: string[],
    options: object,
    type: string
}

export type PresignedUrlDTO = {
    putUrl: string,
    objectKey: string,
}

