import HowToInfo from './HowToInfo';

export default function Navigation() {
  return (
    <header className="bg-card/95 supports-backdrop-filter:bg-card/80 border-border sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <span className="text-primary-foreground text-sm font-bold">
              두
            </span>
          </div>
          <span className="text-foreground hidden font-semibold sm:inline">
            두구두구
          </span>
        </div>
        <HowToInfo />
      </div>
    </header>
  );
}
