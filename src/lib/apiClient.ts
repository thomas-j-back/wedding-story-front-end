interface ApiClientOptions {
    baseUrl: string;
    headers: Record<string, string>;
}
export default class ApiClient<T extends ApiClientOptions>{

    ApiClient(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    async get(url: string) {
        const response = await fetch(`${this.baseUrl}${url}`);
        return response.json();
    }
    async post(url: string, data: any) {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response.json();
    }


}