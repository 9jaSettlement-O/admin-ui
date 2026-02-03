import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthOnboardingLayout } from "@/components/layouts/auth-onboarding-layout";
import { SignupForm } from "@/components/shared/signup-form";
import { SetPasswordStepContent } from "@/components/auth/SetPasswordStepContent";
import { Setup2FAStepContent } from "@/components/auth/Setup2FAStepContent";
import { SignupSuccessStepContent } from "@/components/auth/SignupSuccessStepContent";

type AdminOnboardingStep = "signup" | "set-password" | "setup-2fa" | "success";

/**
 * Admin onboarding flow with stepper and animated transitions.
 * Matches settlement-beta-ui AccountCreationFlow pattern.
 */
export function AdminOnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<AdminOnboardingStep>("signup");
  const [email, setEmail] = useState("");

  const steps = [
    { id: "signup", label: "Create Account", completed: step !== "signup", current: step === "signup" },
    { id: "set-password", label: "Set Password", completed: !["signup", "set-password"].includes(step), current: step === "set-password" },
    { id: "setup-2fa", label: "Setup 2FA", completed: step === "success", current: step === "setup-2fa" },
    { id: "success", label: "Complete", completed: false, current: step === "success" },
  ];

  let content: React.ReactNode = null;

  if (step === "signup") {
    content = (
      <div className="mx-auto max-w-md space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and temporary password to create an admin account
          </p>
        </div>
        <SignupForm
          embedded
          onSuccess={(e) => {
            setEmail(e);
            setStep("set-password");
          }}
        />
      </div>
    );
  } else if (step === "set-password") {
    content = (
      <SetPasswordStepContent
        email={email}
        onSuccess={() => setStep("setup-2fa")}
      />
    );
  } else if (step === "setup-2fa") {
    content = (
      <Setup2FAStepContent
        email={email}
        onSuccess={() => setStep("success")}
      />
    );
  } else if (step === "success") {
    content = (
      <SignupSuccessStepContent
        email={email}
        onGoToLogin={() => navigate("/", { replace: true })}
      />
    );
  }

  if (content == null) return null;

  return (
    <AuthOnboardingLayout steps={steps} currentStep={step} maxWidth="2xl">
      {content}
    </AuthOnboardingLayout>
  );
}
