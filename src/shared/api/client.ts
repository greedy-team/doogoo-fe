import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://sejongdoogoo-api.com:50018',
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});
