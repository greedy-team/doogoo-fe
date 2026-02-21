import { Routes, Route } from 'react-router-dom';
import Navigation from '@/shared/layout/Navigation';
import { useState, useEffect } from 'react';
import { Hero } from '@/shared/layout/Hero';
import LandingPage from '@/features/serviceSelect/LandingPage';
import AcademicPage from '@/features/academicSelect/AcademicPage';
import DodreamPage from '@/features/dodreamSelect/DodreamPage';
import DodreamCategoryDetailPage from '@/features/dodreamSelect/detail/DodreamCategoryDetailPage';
import ResultPage from '@/features/calendarSubscribe/ResultPage';
import majorsData from '@/mock/data/majors.json';
import { StepIndicator } from '@/features/step-indicator/StepIndicator';
import { useCommonStore } from '@/shared/stores/useCommonStore';
import { useNoticeStore } from '@/features/academicSelect/stores/useNoticeStore';

export default function App() {

  const { fetchUIFilterOptions } = useCommonStore();
  const { fetchAcademicNotices, fetchDodreamNotices } = useNoticeStore();

  useEffect(() => {
    fetchUIFilterOptions();
    fetchAcademicNotices();
    fetchDodreamNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<
    Set<'academic' | 'doodream'>
  >(new Set(['academic', 'doodream']));
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  // Academic Notice state
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [yearFilterType, setYearFilterType] = useState<'my-year' | 'all'>(
    'my-year',
  );

  // Doodream state
  const [selectedMajor, setSelectedMajor] = useState<string>('computer');
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    new Set(['competition', 'career']),
  );

  // Major/Minor label lookup
  const allMajors = majorsData.flatMap((college) => college.majors);
  const getMajorLabel = (value: string) =>
    allMajors.find((m) => m.value === value)?.label || value;

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

  // Calculate steps based on selected services
  const getSteps = () => {
    const steps: { id: string; title: string }[] = [
      { id: 'service', title: '서비스 선택' },
    ];
    if (selectedServices.has('academic')) {
      steps.push({ id: 'academic', title: '학사공지 설정' });
    }
    if (selectedServices.has('doodream')) {
      steps.push({ id: 'doodream', title: '두드림 설정' });
    }
    steps.push({ id: 'preview', title: '미리보기' });
    return steps;
  };

  const steps = getSteps();
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
          stepTitles={steps.map((step) => step.title)}
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
              />
            }
          />
          <Route
            path="/dodreamSelect/:categoryId"
            element={<DodreamCategoryDetailPage />}
          />
          <Route
            path="/result"
            element={
              <ResultPage
                isSubscriptionModalOpen={isSubscriptionModalOpen}
                setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
                selectedYear={selectedYear}
                yearFilterType={yearFilterType}
                selectedMajor={selectedMajor}
                selectedInterests={selectedInterests}
                selectedServices={selectedServices}
                getMajorLabel={getMajorLabel}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
