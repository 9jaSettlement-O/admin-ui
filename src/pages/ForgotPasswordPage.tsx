import { ForgotPasswordForm } from "@/components/shared/forgot-password-form";
import { Logo } from "@/components/shared/logo";

export function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="mb-6" />
          <h1 className="mt-6 text-center text-2xl font-semibold">Forgot password?</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            No worries. Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
