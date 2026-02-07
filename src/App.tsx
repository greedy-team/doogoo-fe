import { useState, useRef, useEffect } from "react";
import { DashboardNavigation } from "./components/DashboardNavigation";
import { Dashboard } from "./components/Dashboard";
import { EventBrowser } from "./components/EventBrowser";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import {
  FilterConfiguration,
  type FilterConfig,
} from "./components/FilterConfiguration";
import { OutputSection } from "./components/OutputSection";
import { TutorialSection } from "./components/TutorialSection";
import { FeatureSection } from "./components/FeatureSection";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "landing" | "dashboard" | "events"
  >("landing");
  const [generatedConfig, setGeneratedConfig] =
    useState<FilterConfig | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNavigateToDashboard = () => {
      setCurrentView("dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNavigateToEvents = () => {
      setCurrentView("events");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener(
      "navigate-to-dashboard",
      handleNavigateToDashboard,
    );
    window.addEventListener(
      "navigate-to-events",
      handleNavigateToEvents,
    );

    return () => {
      window.removeEventListener(
        "navigate-to-dashboard",
        handleNavigateToDashboard,
      );
      window.removeEventListener(
        "navigate-to-events",
        handleNavigateToEvents,
      );
    };
  }, []);

  const handleCTAClick = () => {
    filterRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleGenerate = (config: FilterConfig) => {
    setGeneratedConfig(config);
    setTimeout(() => {
      outputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleViewChange = (
    view: "landing" | "dashboard" | "events",
  ) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Events Browser View
  if (currentView === "events") {
    return (
      <div className="min-h-screen bg-white">
        <DashboardNavigation
          onViewChange={handleViewChange}
          currentView={currentView}
        />
        <div className="pt-16">
          <EventBrowser />
        </div>
        <Toaster position="bottom-right" />
      </div>
    );
  }

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-white">
        <DashboardNavigation
          onViewChange={handleViewChange}
          currentView={currentView}
        />
        <div className="pt-16">
          <Dashboard />
        </div>
        <Toaster position="bottom-right" />
      </div>
    );
  }

  // Landing Page View
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Hero onCTAClick={handleCTAClick} />

      <FeatureSection />

      <div ref={filterRef}>
        <FilterConfiguration onGenerate={handleGenerate} />
      </div>

      {generatedConfig && (
        <div ref={outputRef}>
          <OutputSection config={generatedConfig} />
        </div>
      )}

      <TutorialSection />

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <FAQItem
              question="How often does the calendar update?"
              answer="Your calendar syncs automatically every hour with the latest events from Sejong Do-Dream system."
            />
            <FAQItem
              question="Do I need to log in or provide personal information?"
              answer="No! This service is completely anonymous. Just configure your filters and use the generated URL."
            />
            <FAQItem
              question="Can I change my filters later?"
              answer="Yes, simply return to this page, reconfigure your settings, and update the calendar URL in your calendar app."
            />
            <FAQItem
              question="Which calendar apps are supported?"
              answer="Any calendar app that supports ICS/iCal subscriptions, including Google Calendar, Apple Calendar, Outlook, and more."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-slate-400 text-sm">
            <p className="mb-2">
              Sejong Calendar Filter Service
            </p>
            <p>
              Helping students stay organized, one event at a
              time.
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="bottom-right" />
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="bg-white p-6 rounded-lg border border-slate-200 group">
      <summary className="cursor-pointer text-slate-900 list-none flex items-center justify-between">
        <span>{question}</span>
        <span className="text-slate-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <p className="mt-4 text-slate-600 text-sm leading-relaxed">
        {answer}
      </p>
    </details>
  );
}