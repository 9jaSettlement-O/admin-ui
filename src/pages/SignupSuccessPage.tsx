import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

const REDIRECT_DELAY_MS = 20000;

export function SignupSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email ?? "";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="mb-6" />
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 text-center text-2xl font-semibold">
            Account Created Successfully
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Your admin account has been set up. You can now sign in with your
            email, new password, and 2FA code.
          </p>
          {email && (
            <p className="mt-1 text-center text-sm font-medium text-muted-foreground">
              {email}
            </p>
          )}
        </div>

        <div className="space-y-4 text-center">
          <Button asChild className="w-full">
            <Link to="/">Go to Admin Login</Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Redirecting to login in {REDIRECT_DELAY_MS / 1000} seconds...
          </p>
        </div>
      </div>
    </main>
  );
}
