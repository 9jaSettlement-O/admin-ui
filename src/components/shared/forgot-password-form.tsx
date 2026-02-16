import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shouldUseMockService } from "@/lib/config";
import { mockForgotPassword, MOCK_RESET_TOKEN } from "@/services/mock";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const useMock = shouldUseMockService();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await mockForgotPassword({ email });

      if (!res.error) {
        setSubmitted(true);
        toast.success("Check your email for a reset link.");
        if (useMock) {
          toast.info(`Mock: Use this link to reset: /auth/reset-password?token=${MOCK_RESET_TOKEN}`);
        }
      } else {
        setError((res as { message?: string }).message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-md bg-muted p-4 text-center text-sm">
          <p className="font-medium">Check your email</p>
          <p className="mt-2 text-muted-foreground">
            If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
          </p>
          {useMock && (
            <Link
              to={`/auth/reset-password?token=${MOCK_RESET_TOKEN}`}
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Mock: Go to reset password →
            </Link>
          )}
        </div>
        <Link to="/" className="block text-center text-sm font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@9jasettlement.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <p className="text-xs text-muted-foreground">
          Enter the email associated with your account and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send reset link"}
      </Button>

      <Link
        to="/"
        className="block text-center text-sm font-medium text-primary hover:underline"
      >
        Back to sign in
      </Link>
    </form>
  );
}
