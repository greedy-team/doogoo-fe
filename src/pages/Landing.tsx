import { GraduationCap, Sparkles } from 'lucide-react';
import ServiceCard from '@/features/landing/components/ServiceCard';
import { NextButton } from '@/shared/components/RouteButton';
import { useServiceStore } from '@/shared/stores/useServiceStore';
import { Hero } from '@/components/layout/Hero';

interface LandingProps {
  onContinue: () => void;
}

export default function Landing({ onContinue }: LandingProps) {
  const { selectedServices, toggleServiceSelection, canProceedToNextStep } =
    useServiceStore();

  const services = [
    {
      id: 'academic' as const,
      title: '학사일정',
      description: '수강 신청, 시험기간 등 알림 받고 싶어요',
      icon: GraduationCap,
      color: 'primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      textColor: 'text-primary',
    },
    {
      id: 'doodream' as const,
      title: '두드림',
      description: '교내 대회, 학과 행사 등 소식을 받고 싶어요',
      icon: Sparkles,
      color: 'purple',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-600',
    },
  ];

  const handleContinueIfValid = () => {
    if (canProceedToNextStep()) {
      onContinue();
    }
  };

  return (
    <div>
      <Hero />
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-foreground text-2xl font-bold">
            어느 공를지를 알림 받고 싶으신가요?
          </h2>
          <p className="text-muted-foreground">
            원하는 공지를 선택해서 나만의 캘린더를 만들어보세요. (중복 선택
            가능)
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const isSelected = selectedServices.has(service.id);

            return (
              <ServiceCard
                key={service.id}
                service={{
                  ...service,
                  isSelected,
                  onToggle: toggleServiceSelection,
                }}
              />
            );
          })}
        </div>

        <NextButton
          onClick={handleContinueIfValid}
          disabled={!canProceedToNextStep()}
        />
      </div>
    </div>
  );
}
