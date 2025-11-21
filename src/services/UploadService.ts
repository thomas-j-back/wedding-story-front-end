import type { CreateJobRequestDTO, CreateUploadDTO, PresignedUrlDTO } from "../types/dataTypes/DTOs";
export default class UploadService {
    private baseUrl: string;
    //have some vars for the auth key
    //have some env vars for the endpoint
    // private endpoint = env.get('SERVICE_PATH')
    constructor() {
        this.baseUrl = import.meta.env.VITE_GENERATION_API_URL || 'http://localhost:8080';
    }

   public async createUpload(uploadDTO: CreateUploadDTO) {
        const response = await fetch(`${this.baseUrl}/api/upload-urls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': import.meta.env.VITE_GENERATION_API_KEY || ''
            },
            body: JSON.stringify(uploadDTO),
        });
       
        return response.json() as Promise<PresignedUrlDTO[]>;
    }

    public async putFile(putUrl: string, file: File) {
        const response = await fetch(putUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });
        return response.status;
    }

    public async createJobRequest(jobRequestDTO: CreateJobRequestDTO) {
        const response = await fetch(`${this.baseUrl}/api/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': import.meta.env.VITE_GENERATION_API_KEY || ''
            },
            body: JSON.stringify(jobRequestDTO),
        });
        return response.json();
    }

    public async getJobStatus(jobId: string) {
        const response = await fetch(`${this.baseUrl}/api/jobs/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': import.meta.env.VITE_GENERATION_API_KEY || ''
            }
        });
        return response.json();
    }
}