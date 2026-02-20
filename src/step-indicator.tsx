import { ArrowLeft, Check } from "lucide-react";
import { Button } from "./ui/button";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onBack?: () => void;
}

export function StepIndicator({ currentStep, totalSteps, stepTitles, onBack }: StepIndicatorProps) {
  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {stepTitles[currentStep]}
          </span>
          <span className="text-muted-foreground">
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        
        <div className="relative h-2 bg-accent rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step circles */}
      <div className="flex items-center justify-between px-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300
                ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-accent text-muted-foreground"
                }
              `}
            >
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`
                  h-0.5 w-8 sm:w-16 transition-all duration-300
                  ${index < currentStep ? "bg-primary" : "bg-accent"}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}