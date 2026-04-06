import { Link } from 'react-router-dom';
import { Headset } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import HowToInfo from './HowToInfo';
import DoogooLogo from './DoogooLogo';
export default function Navigation() {
  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 border-border sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <DoogooLogo className="h-8 w-auto" />
        </Link>
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <a
            href="https://forms.gle/AaJTwG1GsDShJopz8"
            target="_blank"
            rel="noreferrer"
          >
            <Headset className="size-4" aria-hidden="true" />
            <span className="sr-only">버그 제보</span>
          </a>
        </Button>
      </div>
    </header>
  );
}
