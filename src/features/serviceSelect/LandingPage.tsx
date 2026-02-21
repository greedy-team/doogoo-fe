import { GraduationCap, Sparkles } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import { NextButton } from '@/features/step-indicator/RouteButton';

interface ServiceSelectorProps {
  selectedServices: Set<'academic' | 'doodream'>;
  onToggleService: (service: 'academic' | 'doodream') => void;
  onContinue: () => void;
}

export default function LandingPage({
  selectedServices,
  onToggleService,
  onContinue,
}: ServiceSelectorProps) {
  const services = [
    {
      id: 'academic' as const,
      title: '학사공지',
      description: '학사 일정 및 공지사항',
      icon: GraduationCap,
      color: 'primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      textColor: 'text-primary',
    },
    {
      id: 'doodream' as const,
      title: '두드림',
      description: '교내 활동 및 프로그램',
      icon: Sparkles,
      color: 'purple',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-foreground text-2xl font-bold">
          무엇을 구독하시겠습니까?
        </h2>
        <p className="text-muted-foreground">
          원하는 캘린더를 선택하세요 (중복 선택 가능)
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
                onToggle: onToggleService,
              }}
            />
          );
        })}
      </div>

      <NextButton onClick={onContinue} disabled={selectedServices.size === 0} />
    </div>
  );
}
