import { LoginForm } from "@/components/shared/login-form";
import { Logo } from "@/components/shared/logo";

export function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="mb-6" />
          <h1 className="mt-6 text-center text-2xl font-semibold">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your credentials to access the admin dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
