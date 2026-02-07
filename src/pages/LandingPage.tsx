import { Navigation } from '../components/Navigation';
import { Hero } from '../components/LandingPage/Hero';
import { FeatureSection } from '../components/LandingPage/FeatureSection';
import { Toaster } from '../components/ui/sonner';
import { FAQSection } from '../components/LandingPage/FAQSection';

interface LandingPageProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default function LandingPage({
  isAuthenticated,
  onLogout,
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation isAuthenticated={isAuthenticated} onLogout={onLogout} />

      <Hero />

      <FeatureSection />

      <FAQSection />

      {/* <footer className="bg-foreground text-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="text-background/70 text-sm">
            <p className="mb-2">두구두구</p>
            <p>Helping students stay organized, one event at a time.</p>
          </div>
        </div>
      </footer> */}

      <Toaster position="bottom-right" />
    </div>
  );
}
