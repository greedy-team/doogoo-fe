import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import { useStepNavigation } from '@/shared/hooks/useStepNavigation';
import { useGetAllFilterOptions } from '@/shared/hooks/useCommonData';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
} from '@/shared/hooks/useNotices';

const Landing = lazy(() => import('./pages/Landing'));
const ServiceSubscription = lazy(() => import('./pages/ServiceSubscription'));
const Result = lazy(() => import('./pages/Result'));

export default function App() {
  useGetAllFilterOptions(); // 학과, 키워드, 학년 데이터 캐싱
  useGetAcademicNotices(); // 학사공지 데이터 캐싱
  useGetDodreamNotices(); // 두드림 공지 데이터 캐싱
  //일단 tanstackQuery로 데이터 캐싱하기로 하였음

  const { handleNext, handleBack } = useStepNavigation();

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-2 py-6 sm:px-6">
        <Suspense>
          <Routes>
            <Route path="/" element={<Landing onContinue={handleNext} />} />
            <Route
              path="/subscription"
              element={<ServiceSubscription onBack={handleBack} />}
            />
            <Route path="/result" element={<Result onBack={handleBack} />} />
            <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
