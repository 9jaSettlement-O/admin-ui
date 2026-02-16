import type { FormEvent } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  PasswordRequirements,
  isPasswordValid,
} from "@/components/shared/password-requirements";

interface SetPasswordStepContentProps {
  email: string;
  onSuccess: () => void;
}

export function SetPasswordStepContent({ email, onSuccess }: SetPasswordStepContentProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const canContinue = isPasswordValid(newPassword) && passwordsMatch && !isLoading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isPasswordValid(newPassword) || newPassword !== confirmPassword) {
      setError("Password does not meet requirements or passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Set New Password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a secure password for your admin account
        </p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="new-password" className="text-sm">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          <PasswordRequirements password={newPassword} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm-password" className="text-sm">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>
        )}

        <Button type="submit" className="w-full" disabled={!canContinue}>
          {isLoading ? "Continuing..." : "Continue to 2FA Setup"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
