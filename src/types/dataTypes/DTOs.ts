/**
 * Hold all data types for interacting with Image Generation Job API

 */

const JobStatus = {
    SUCCEEDED: "SUCCEEDED",
    FAILED: "FAILED",
    QUEUED: "QUEUED",
    RUNNING: "RUNNING"
  } as const;
  
  export type JobStatus = typeof JobStatus[keyof typeof JobStatus];
  
export type CreateUploadDTO = {
    count: number;
    contentType: string
}

type Models = 'stabilityimagemodel' | 'openapiimmagemodel'

export type CreateJobRequestDTO = {
    model: Models,
    prompt: string,
    inputKeys: string[],
    inputContentTypes: string[],
    options: object,
    generationType: string
}

export type PresignedUrlDTO = {
    putUrl: string,
    objectKey: string,
}

export type JobCreateResponse = {
    jobId: string
}
// public record JobStatusDTO(String jobId, String status, List<String> outputKeys, List<String> outputUrls, String error) {}

export type JobStatusResponseDTO = {
    jobId: string,
    status: JobStatus,
    outputKeys: string[],
    outputUrls: string[],
    error?: string
}


