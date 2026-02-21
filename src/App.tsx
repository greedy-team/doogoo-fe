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
import { useStepNavigation } from '@/shared/hooks/useStepNavigation';

export default function App() {

  const { fetchUIFilterOptions } = useCommonStore();
  const { fetchAcademicNotices, fetchDodreamNotices } = useNoticeStore();

  useEffect(() => {
    fetchUIFilterOptions();
    fetchAcademicNotices();
    fetchDodreamNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                getMajorLabel={getMajorLabel}
                onBack={handleBack}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
