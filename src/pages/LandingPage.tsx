import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { Toaster } from '../components/ui/sonner';

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

      <footer className="bg-foreground text-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="text-background/70 text-sm">
            <p className="mb-2">Sejong Calendar Filter Service</p>
            <p>Helping students stay organized, one event at a time.</p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

// Sub-components kept internal for organization
function FAQSection() {
  return (
    <section id="faq" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-foreground mb-8 text-center text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <FAQItem
            question="How often does the calendar update?"
            answer="Your calendar syncs automatically every hour..."
          />
          <FAQItem
            question="Do I need to log in?"
            answer="No! This service is completely anonymous."
          />
          {/* Add other FAQItems here */}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-border bg-card rounded-lg border p-6">
      <summary className="text-foreground flex cursor-pointer list-none items-center justify-between">
        <span>{question}</span>
        <span className="text-muted-foreground transition-transform group-open:rotate-180">
          ▼
        </span>
      </summary>
      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
        {answer}
      </p>
    </details>
  );
}
