import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface Step {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
  className?: string;
}

export function ProgressStepper({ steps, className }: ProgressStepperProps) {
  const completedCount = steps.filter((s) => s.completed).length;
  const currentIndex = steps.findIndex((s) => s.current);
  const totalSteps = steps.length;
  const totalSegments = totalSteps - 1;

  let progressSegments = 0;
  if (completedCount === totalSteps) {
    progressSegments = totalSegments;
  } else if (currentIndex >= 0) {
    progressSegments = currentIndex;
  } else if (completedCount > 0) {
    progressSegments = completedCount;
  }

  const progressWidth =
    totalSegments > 0 ? (progressSegments / totalSegments) * 100 : 0;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <div
          className="absolute top-4 left-0 right-0 h-0.5 bg-muted"
          style={{
            left: "1rem",
            right: "1rem",
            transform: "translateY(-50%)",
          }}
        />
        {progressWidth > 0 && (
          <div
            className="absolute top-4 h-0.5 transition-all duration-300"
            style={{
              left: "1rem",
              width: `calc(${progressWidth}% * (100% - 2rem) / 100)`,
              transform: "translateY(-50%)",
              backgroundColor: "#4A5568",
            }}
          />
        )}
        <div
          className="relative z-10 grid gap-0"
          style={{ gridTemplateColumns: `repeat(${totalSteps}, 1fr)` }}
        >
          {steps.map((step, index) => {
            const isCompleted = step.completed;
            const isCurrent = step.current;
            const isActive = isCompleted || isCurrent;

            return (
              <div
                key={step.id}
                className="relative flex flex-col items-center justify-start"
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2 bg-background transition-colors duration-200",
                    isCompleted
                      ? "border-[#4A5568] bg-[#4A5568] text-white"
                      : isCurrent
                        ? "border-[#4A5568] bg-[#4A5568]/10 text-[#4A5568]"
                        : "border-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 whitespace-nowrap text-center text-xs font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
