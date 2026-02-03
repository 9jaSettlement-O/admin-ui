import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const REDIRECT_DELAY_MS = 20000;

interface SignupSuccessStepContentProps {
  email: string;
  onGoToLogin: () => void;
}

export function SignupSuccessStepContent({ email, onGoToLogin }: SignupSuccessStepContentProps) {
  useEffect(() => {
    const timer = setTimeout(onGoToLogin, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [onGoToLogin]);

  return (
    <div className="mx-auto max-w-md space-y-8 text-center">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold">Account Created Successfully</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your admin account has been set up. You can now sign in with your email, new password,
          and 2FA code.
        </p>
        {email && <p className="mt-1 text-sm font-medium text-muted-foreground">{email}</p>}
      </div>

      <div className="space-y-4">
        <Button onClick={onGoToLogin} className="w-full">
          Go to Admin Login
        </Button>
        <p className="text-xs text-muted-foreground">
          Redirecting to login in {REDIRECT_DELAY_MS / 1000} seconds...
        </p>
      </div>
    </div>
  );
}
