import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
// import { Footer } from './components/layout/Footer';
// import { Toaster } from './components/ui/sonner';
import LandingPage from './pages/Landing';
// import DashboardPage from './pages/DashboardPage';
// import EventsPage from './pages/EventsPage';
// import LoginPage from './pages/Login';
// import Dashboard from './pages/Dashboard';
import { useEffect, useState} from 'react';
import { Hero } from './components/layout/Hero';
import { useCommonStore } from './stores/useCommonStore';
import { useNoticeStore } from './stores/useNoticeStore';


export default function App() {
  const [selectedServices, setSelectedServices] = useState<
    Set<'academic' | 'doodream'>
  >(new Set());

  const { fetchUIFilterOptions } = useCommonStore();
  const { fetchAcademicNotices, fetchDodreamNotices } = useNoticeStore();

  useEffect(() => {
    fetchUIFilterOptions();
    fetchAcademicNotices();
    fetchDodreamNotices();
  }, [fetchUIFilterOptions, fetchAcademicNotices, fetchDodreamNotices]);


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
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
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
        {/* <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
      {/* <Toaster position="bottom-right" /> */}
    </div>
  );
}
