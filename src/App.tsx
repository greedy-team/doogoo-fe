import { Routes, Route } from 'react-router-dom';
import Navigation from '@/shared/layout/Navigation';
import { useState } from 'react';
import { Hero } from '@/shared/layout/Hero';
import LandingPage from '@/features/serviceSelect/LandingPage';
import AcademicPage from '@/features/academicSelect/AcademicPage';
import DodreamPage from '@/features/dodreamSelect/DodreamPage';
import DodreamCategoryDetailPage from '@/features/dodreamSelect/detail/DodreamCategoryDetailPage';
import ResultPage from '@/features/calendarSubscribe/ResultPage';
import { StepIndicator } from '@/features/step-indicator/StepIndicator';
import { useStepNavigation } from '@/shared/hooks/useStepNavigation';
import { useGetAllFilterOptions } from '@/shared/hooks/useCommonData';
import { useGetAcademicNotices, useGetDodreamNotices } from '@/features/academicSelect/hooks/useNotices';

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
  const [selectedMajor, setSelectedMajor] = useState<string>('all');
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set()
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
              <LandingPage
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
                onContinue={handleServiceContinue}
              />
            }
          />
          <Route
            path="/academicSelect"
            element={
              <AcademicPage
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
            path="/dodreamSelect"
            element={
              <DodreamPage
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
            path="/dodreamSelect/:categoryId"
            element={<DodreamCategoryDetailPage />}
          />
          <Route
            path="/calendarSubscribe"
            element={
              <ResultPage
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
        </Routes>
      </div>
    </div>
  );
}
