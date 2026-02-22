import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="space-y-4 pb-6">
      {/* Step circles */}
      <div className="flex w-full items-center px-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                index < currentStep
                  ? 'bg-primary text-primary-foreground'
                  : index === currentStep
                    ? 'bg-primary text-primary-foreground ring-primary/20 ring-4'
                    : 'bg-accent text-muted-foreground'
              } `}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`bg-accent mx-2 h-0.5 flex-1 transition-all duration-300 ${index < currentStep ? 'bg-primary' : 'bg-accent'} `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
