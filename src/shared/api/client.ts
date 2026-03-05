/**
 * Axios API 클라이언트 설정
 *
 * 역할: 모든 API 요청의 기본 설정 (Base URL, 타임아웃, 헤더)
 */
import axios from 'axios';

/**
 * API Base URL 설정
 *
 * MSW 모드에 따라 동적으로 변경:
 *
 * 1. MSW 사용 시 (VITE_USE_MSW=true):
 *    - baseURL = '' (빈 문자열)
 *    - 상대 경로로 요청 → Service Worker가 가로챔
 *    - 예: axios.get('/api/grades') → MSW 핸들러가 Mock 데이터 반환
 *
 * 2. 실제 API 사용 시 (VITE_USE_MSW=false):
 *    - baseURL = 'https://www.sejongdoogoo-api.com'
 *    - 절대 경로로 요청 → 실제 백엔드 서버로 전송
 *    - 예: axios.get('/api/grades') → https://www.sejongdoogoo-api.com/api/grades
 */
export const API_BASE_URL =
  import.meta.env.VITE_USE_MSW === 'true'
    ? '' // MSW가 intercept (상대 경로)
    : 'https://www.sejongdoogoo-api.com'; // 실제 백엔드 (절대 경로)


export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});
