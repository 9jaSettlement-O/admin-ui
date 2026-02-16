import { type ReactNode, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { ProgressStepper, type Step } from "@/components/ui/progress-stepper";

interface AuthOnboardingLayoutProps {
  steps: Step[];
  children: ReactNode;
  currentStep: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function AuthOnboardingLayout({
  steps,
  children,
  currentStep,
  maxWidth = "2xl",
}: AuthOnboardingLayoutProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  const previousStepIndexRef = useRef<number>(-1);
  const currentStepIndex = steps.findIndex((s) => s.current);
  const direction =
    previousStepIndexRef.current === -1
      ? 1
      : currentStepIndex > previousStepIndexRef.current
        ? 1
        : currentStepIndex < previousStepIndexRef.current
          ? -1
          : 1;

  useEffect(() => {
    if (currentStepIndex >= 0) {
      previousStepIndexRef.current = currentStepIndex;
    }
  }, [currentStepIndex]);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background px-4 pb-8 pt-8">
      <div className={`flex w-full flex-col ${maxWidthClasses[maxWidth]}`}>
        <div className="mb-8 flex flex-shrink-0 flex-col items-center">
          <Logo className="mb-6" />
        </div>

        {steps.length > 0 && (
          <div className="mb-8 flex-shrink-0 px-4">
            <ProgressStepper steps={steps} />
          </div>
        )}

        <div className="relative flex-1 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
