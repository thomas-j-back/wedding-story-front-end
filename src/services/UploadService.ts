import type { CreateUploadDTO } from "../types/dataTypes/DTOs";
export default class UploadService {
    //have some vars for the auth key
    //have some env vars for the endpoint
    // private endpoint = env.get('SERVICE_PATH')
    constructor() {}

   public async createUpload(uploadDTO: CreateUploadDTO) {
        const response = await fetch(`http://localhost:8080/api/upload-urls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': import.meta.env.VITE_GENERATION_API_KEY || ''
            },
            body: JSON.stringify(uploadDTO),
        });
       
        return response.json();
    }

    public async putFile(putUrl: string, file: File) {
        const response = await fetch(putUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });
        return response.json();
    }
}