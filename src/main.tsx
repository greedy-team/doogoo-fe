import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Providers } from './providers';
import './styles/index.css';

/**
 * MSW (Mock Service Worker) 초기화 함수
 */
async function enableMocking() {
  // 환경변수에서 MSW 사용 여부 확인
  const shouldUseMSW = import.meta.env.VITE_USE_MSW === 'true';

  // MSW 비활성화 시: 실제 백엔드 API 사용
  if (!shouldUseMSW) {
    console.log('📡 Using real backend API');
    return;
  }

  // MSW 활성화 시: Service Worker 시작
  // 동적 import로 프로덕션 빌드에서 제외 (번들 사이즈 최적화)
  const { worker } = await import('./mocks/browser');

  console.log('🔧 MSW enabled - Using mock data');

  // Service Worker 시작
  // onUnhandledRequest: 'bypass' → 모킹하지 않은 요청은 그대로 통과
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

// MSW 초기화 완료 후 앱 렌더링
// 이렇게 하면 MSW가 준비된 상태에서 API 요청이 시작된다고 함
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Providers>
          <App />
        </Providers>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
