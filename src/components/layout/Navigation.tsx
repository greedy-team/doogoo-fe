import { Link } from 'react-router-dom';
import HowToInfo from './HowToInfo';
import DoogooLogo from './DoogooLogo';

export default function Navigation() {
  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 border-border sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <DoogooLogo className="h-8 w-auto" />
        </Link>
        <HowToInfo />
      </div>
    </header>
  );
}
