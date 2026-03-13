import axios from 'axios';

export const API_BASE_URL = 'http://sejongdoogoo-api.com:50018';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});
