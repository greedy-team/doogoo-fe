import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Landing from './pages/Landing';
import AcademicNotice from './pages/AcademicNotice';
import DooDreamNotice from './pages/DooDreamNotice';
import DooDreamCategoryDetail from './pages/DooDreamCategoryDetail';
import Result from './pages/Result';
// import { StepIndicator } from '@/features/StepIndicator/components/StepIndicator';
import { useStepNavigation } from '@/shared/hooks/useStepNavigation';
import { useGetAllFilterOptions } from '@/shared/hooks/useCommonData';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
} from '@/shared/hooks/useNotices';

export default function App() {
  useGetAllFilterOptions(); // 학과, 키워드, 학년 데이터 캐싱
  useGetAcademicNotices(); // 학사공지 데이터 캐싱
  useGetDodreamNotices(); // 두드림 공지 데이터 캐싱
  //일단 tanstackQuery로 데이터 캐싱하기로 하였음

  const { currentStep, totalSteps, handleNext, handleBack } =
    useStepNavigation();

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<Landing onContinue={handleNext} />} />
          <Route
            path="/academicNotice"
            element={<AcademicNotice onNext={handleNext} onBack={handleBack} />}
          />
          <Route
            path="/dooDreamNotice"
            element={<DooDreamNotice onNext={handleNext} onBack={handleBack} />}
          />
          <Route
            path="/dooDreamNotice/:categoryId"
            element={<DooDreamCategoryDetail />}
          />
          <Route path="/result" element={<Result onBack={handleBack} />} />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Routes>
      </div>
    </div>
  );
}
