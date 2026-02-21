import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onBack?: () => void;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  stepTitles,
}: StepIndicatorProps) {
  return (
    <div className="space-y-4 pb-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground font-medium">
            {stepTitles[currentStep]}
          </span>
          <span className="text-muted-foreground">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>

        <div className="bg-accent relative h-2 overflow-hidden rounded-full">
          <div
            className="bg-primary absolute top-0 left-0 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step circles */}
      <div className="flex items-center justify-between px-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
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
                className={`h-0.5 w-8 transition-all duration-300 sm:w-16 ${index < currentStep ? 'bg-primary' : 'bg-accent'} `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
