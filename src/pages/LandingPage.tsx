import { Navigation } from '../components/layout/Navigation';
import { Hero } from '../features/landing/components/Hero';
import { FeatureSection } from '../features/landing/components/FeatureSection';
import { Toaster } from '../components/ui/sonner';
import { FAQSection } from '../features/landing/components/FAQSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

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
