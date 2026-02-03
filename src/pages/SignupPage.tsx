import { Link } from "react-router-dom";
import { Logo } from "@/components/shared/logo";

export function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <Logo className="mb-6" />
        <div>
          <h1 className="text-2xl font-semibold">Create Admin Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Admin signup flow will be implemented here.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          <Link to="/" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
