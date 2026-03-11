import { Link } from 'react-router-dom';
import HowToInfo from './HowToInfo';

export default function Navigation() {
  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 border-border sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/serviceLogo.svg" alt="두구두구 로고" className="h-10" />
          {/* 아이콘을 더 크게 할 지, 옆에 로고를 넣을 지 고민해봐야 합니다. */}
          {/* <span className="text-foreground inline font-semibold">두구두구</span> */}
        </Link>
        <HowToInfo />
      </div>
    </header>
  );
}
