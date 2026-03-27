import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useStepNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps: { id: string; title: string; path: string }[] = [
    { id: 'service', title: '시작', path: '/' },
    { id: 'subscription', title: '구독 설정', path: '/subscription' },
    { id: 'preview', title: '미리보기', path: '/result' },
  ];

  const totalSteps = steps.length;
  const currentStep = Math.max(
    0,
    steps.findIndex((s) => s.path === location.pathname),
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    //지금 페이지 이동 시 자동으로 상단 스크롤하도록 되어있는데 필요시 변경
  }, [location.pathname]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      navigate(steps[currentStep + 1].path);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      navigate(steps[currentStep - 1].path);
    }
  };

  return {
    currentStep,
    steps,
    totalSteps,
    handleNext,
    handleBack,
  };
}
