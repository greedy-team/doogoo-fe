/**
 * MSW Service Worker 설정
 * 
 * 역할: 브라우저에서 네트워크 요청을 가로채는 워커 생성
 */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Service Worker 인스턴스 생성
// ...handlers: 배열의 모든 핸들러를 개별 인자로 전달 (스프레드 연산자)
export const worker = setupWorker(...handlers);