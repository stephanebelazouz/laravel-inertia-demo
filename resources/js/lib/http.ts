import axios from 'axios';

export interface ApiErrorResponse {
    message: string;
    errors?: Record<string, string[]> | null;
}

const http = axios.create({
    baseURL: '/',
    withCredentials: true,
});

http.interceptors.request.use(async (config) => {
    const method = config.method?.toLowerCase();

    if (['post', 'put', 'patch', 'delete'].includes(method ?? '')) {
        await http.get('/sanctum/csrf-cookie');
    }

    return config;
});

export default http;
