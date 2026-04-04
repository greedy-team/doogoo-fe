import { NextButton } from '@/shared/components/RouteButton';
import { Hero } from '@/components/layout/Hero';

interface LandingProps {
  onContinue: () => void;
}

export default function Landing({ onContinue }: LandingProps) {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-2xl space-y-6 pt-12">
        <div className="space-y-2 text-center">
          <h2 className="text-foreground text-2xl font-bold">
            흩어진 공지, 이제 한 번에 모아볼까요?
          </h2>
          <p className="text-muted-foreground">
            여기저기 찾지 않아도 중요한 학교 일정을 내 캘린더에서 바로 확인해요.
          </p>
        </div>

        <NextButton onClick={onContinue} text={'일정 한 번에 모아보기'} />
      </div>
    </>
  );
}
