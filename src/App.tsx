import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import { useState } from 'react';
import { Hero } from './components/layout/Hero';
import LandingPage from './pages/Landing';
import AcademicNotice from './pages/AcademicNotice';
import DooDreamNotice from './pages/DooDreamNotice';
import DooDreamCategoryDetail from './pages/DooDreamCategoryDetail';
import Result from './pages/Result';
import majorsData from './mock/data/majors.json';
import { StepIndicator } from './components/layout/StepIndicator';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<
    Set<'academic' | 'doodream'>
  >(new Set(['academic', 'doodream'])); // Default to both services for easier testing
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
  const [viewingCategoryId, setViewingCategoryId] = useState<string | null>(
    null,
  );

  // Major/Minor label lookup
  const majorsByCollege = majorsData;

  const allMajors = majorsByCollege.flatMap((college) => college.majors);

  const getMajorLabel = (value: string) => {
    return allMajors.find((m) => m.value === value)?.label || value;
  };

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
      // Scroll to top on mobile
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
            path="/academicNotice"
            element={
              <AcademicNotice
                selectedYear={selectedYear}
                yearFilterType={yearFilterType}
                onYearChange={setSelectedYear}
                onYearFilterTypeChange={setYearFilterType}
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
                onCategoryClick={(id) => setViewingCategoryId(id)}
              />
            }
          />
          <Route
            path="/dooDreamNotice/:categoryId"
            element={<DooDreamCategoryDetail />}
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
                getMajorLabel={getMajorLabel}
              />
            }
          />
        </Routes>
        {/* <Toaster position="bottom-right" /> */}
      </div>
    </div>
  );
}
