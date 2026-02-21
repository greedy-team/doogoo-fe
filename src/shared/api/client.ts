import axios from 'axios';

// TODO: 환경변수로 전환 (import.meta.env.VITE_API_BASE_URL)
export const API_BASE_URL = 'https://www.sejongdoogoo-api.com';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
