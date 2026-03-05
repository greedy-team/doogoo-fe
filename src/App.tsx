import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import { useState } from 'react';
import { Hero } from '@/components/layout/Hero';
import Landing from './pages/Landing';
import AcademicNotice from './pages/AcademicNotice';
import DooDreamNotice from './pages/DooDreamNotice';
import DooDreamCategoryDetail from './pages/DooDreamCategoryDetail';
import Result from './pages/Result';
import { StepIndicator } from '@/features/StepIndicator/components/StepIndicator';
import { useStepNavigation } from '@/shared/hooks/useStepNavigation';
import { useGetAllFilterOptions } from '@/shared/hooks/useCommonData';
import {
  useGetAcademicNotices,
  useGetDodreamNotices,
} from '@/features/academicNotice/hooks/useNotices';

export default function App() {
  useGetAllFilterOptions(); // 학과, 키워드, 학년 데이터 캐싱
  useGetAcademicNotices(); // 학사공지 데이터 캐싱
  useGetDodreamNotices(); // 두드림 공지 데이터 캐싱
  //일단 tanstackQuery로 데이터 캐싱하기로 하였음

  const [selectedServices, setSelectedServices] = useState<
    Set<'academic' | 'doodream'>
  >(new Set(['academic', 'doodream']));

  const { currentStep, totalSteps, handleNext, handleBack } =
    useStepNavigation(selectedServices);

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // Academic Notice state
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [yearFilterType, setYearFilterType] = useState<'my-year' | 'all'>(
    'my-year',
  );

  // Doodream state
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set(),
  );

  const handleInterestToggle = (id: string) => {
    setSelectedInterests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleToggleService = (service: 'academic' | 'doodream') => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(service)) {
        newSet.delete(service);
      } else {
        newSet.add(service);
      }
      return newSet;
    });
  };

  const handleServiceContinue = () => {
    if (selectedServices.size > 0) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pb-24 sm:px-6">
        <Hero />
        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={handleBack}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Landing
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
                onContinue={handleServiceContinue}
              />
            }
          />
          <Route
            path="/academicNotice"
            element={
              <AcademicNotice
                selectedYear={selectedYear}
                yearFilterType={yearFilterType}
                onYearChange={setSelectedYear}
                onYearFilterTypeChange={setYearFilterType}
                onNext={handleNext}
                onBack={handleBack}
              />
            }
          />
          <Route
            path="/dooDreamNotice"
            element={
              <DooDreamNotice
                selectedMajor={selectedMajor}
                selectedInterests={selectedInterests}
                onMajorChange={setSelectedMajor}
                onInterestToggle={handleInterestToggle}
                onCategoryClick={(id) => console.log('category:', id)}
                onNext={handleNext}
                onBack={handleBack}
              />
            }
          />
          <Route
            path="/dooDreamNotice/:categoryId"
            element={<DooDreamCategoryDetail selectedMajor={selectedMajor} />}
          />
          <Route
            path="/result"
            element={
              <Result
                isSubscriptionModalOpen={isSubscriptionModalOpen}
                setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
                selectedYear={selectedYear}
                yearFilterType={yearFilterType}
                selectedMajor={selectedMajor}
                selectedInterests={selectedInterests}
                selectedServices={selectedServices}
                onBack={handleBack}
              />
            }
          />
          <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
        </Routes>
      </div>
    </div>
  );
}
