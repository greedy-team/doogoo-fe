import { useState, useRef } from "react";
import {
  FilterConfiguration,
  type FilterConfig,
} from "../features/calendar/components/FilterConfiguration";
import { OutputSection } from "../features/calendar/components/OutputSection";
import { EventBrowser } from "../features/events/components/EventBrowser";

export default function EventsPage() {
  const [generatedConfig, setGeneratedConfig] =
    useState<FilterConfig | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (config: FilterConfig) => {
    setGeneratedConfig(config);
    setTimeout(() => {
      outputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  return (
    <div className="pt-16">
      <div ref={filterRef}>
        <FilterConfiguration onGenerate={handleGenerate} />
      </div>

      {generatedConfig && (
        <div ref={outputRef}>
          <OutputSection config={generatedConfig} />
        </div>
      )}

      <EventBrowser />
    </div>
  );
}
