import { NextButton } from '@/shared/components/RouteButton';
import { Hero } from '@/components/layout/Hero';

interface LandingProps {
  onContinue: () => void;
}

export default function Landing({ onContinue }: LandingProps) {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-foreground text-2xl font-bold">
            캘린더 구독 설정을 시작해볼까요?
          </h2>
          <p className="text-muted-foreground">
            다음 화면에서 학사일정과 두드림 구독 항목을 자유롭게 설정할 수
            있습니다.
          </p>
        </div>

        <NextButton onClick={onContinue} />
      </div>
    </>
  );
}
