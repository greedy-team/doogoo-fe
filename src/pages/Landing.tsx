import { NextButton } from '@/shared/components/RouteButton';
import { Hero } from '@/components/layout/Hero';

interface LandingProps {
  onContinue: () => void;
}

export default function Landing({ onContinue }: LandingProps) {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-sky-300 via-sky-200 to-stone-400" />
      <img
        src="/School.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className="fixed inset-0 -z-10 h-full w-full object-cover"
      />
      <Hero />
      <div className="mx-auto max-w-2xl space-y-6 pt-12">
        <div className="space-y-2 text-center">
          <h2 className="text-white text-2xl font-bold drop-shadow-md">
            흩어진 공지, 이제 한 번에 모아볼까요?
          </h2>
          <p className="text-gray-100 drop-shadow">
            여기저기 찾지 않아도 중요한 학교 일정을 내 캘린더에서 바로 확인해요.
          </p>
        </div>

        <NextButton onClick={onContinue} text={'일정 한 번에 모아보기'} />
      </div>
    </>
  );
}
