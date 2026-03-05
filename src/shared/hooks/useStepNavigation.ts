import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useStepNavigation(
  selectedServices: Set<'academic' | 'doodream'>,
) {
  // selectedServices가 변경될 때마다 동적으로 steps를 다시 계산하도록 하였음
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);

  const getSteps = () => {
    const step: { id: string; title: string; path: string }[] = [
      { id: 'service', title: '서비스 선택', path: '/' },
    ];
    if (selectedServices.has('academic')) {
      step.push({
        id: 'academic',
        title: '학사공지 설정',
        path: '/academicNotice',
      });
    }
    if (selectedServices.has('doodream')) {
      step.push({
        id: 'doodream',
        title: '두드림 설정',
        path: '/dooDreamNotice',
      });
    }
    step.push({
      id: 'preview',
      title: '미리보기',
      path: '/result',
    });
    return step;
  };
  //이후 만약 서비스 추가 시 여기에 추가하면 동적으로 추가가능

  const steps = getSteps();

  const totalSteps = steps.length;

  useEffect(() => {
    const stepIndex = steps.findIndex((s) => s.path === location.pathname);
    if (stepIndex !== -1 && stepIndex !== currentStep) {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      //지금 페이지 이동 시 자동으로 상단 스크롤하도록 되어있는데 필요시 변경
    }
  }, [location.pathname, steps, currentStep]);

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
