import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Sparkles, Check } from 'lucide-react';

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
          const Icon = service.icon;
          const isSelected = selectedServices.has(service.id);

          return (
            <Card
              key={service.id}
              className={`relative cursor-pointer p-6 transition-all duration-200 hover:shadow-lg ${isSelected ? `${service.borderColor} border-2 shadow-md` : 'hover:border-primary/30 border'} `}
              onClick={() => onToggleService(service.id)}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div
                    className={`${service.bgColor} ${service.textColor} rounded-full p-1`}
                  >
                    <Check className="h-5 w-5" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div
                  className={`${service.bgColor} ${service.textColor} flex h-14 w-14 items-center justify-center rounded-xl`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-foreground mb-1 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        size="lg"
        className="h-14 w-full rounded-2xl text-base font-semibold shadow-md"
        onClick={onContinue}
        disabled={selectedServices.size === 0}
      >
        다음 단계로
      </Button>
    </div>
  );
}
