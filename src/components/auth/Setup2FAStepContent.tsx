import type { FormEvent } from "react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { shouldUseMockService } from "@/lib/config";
import { MOCK_2FA_SETUP_CODE } from "@/services/mock";

const MOCK_TOTP_SECRET = "MOCK2FASECRET123456";

function getTotpUri(email: string): string {
  const issuer = "9jasettlement";
  const label = encodeURIComponent(`${issuer}:${email}`);
  return `otpauth://totp/${label}?secret=${MOCK_TOTP_SECRET}&issuer=${encodeURIComponent(issuer)}`;
}

interface Setup2FAStepContentProps {
  email: string;
  onSuccess: () => void;
}

export function Setup2FAStepContent({ email, onSuccess }: Setup2FAStepContentProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const useMock = shouldUseMockService();
  const totpUri = getTotpUri(email);
  const isValidCode = /^\d{6}$/.test(code);
  const canComplete = isValidCode && !isLoading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidCode) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    if (useMock && code !== MOCK_2FA_SETUP_CODE) {
      setError(`Invalid code. Use ${MOCK_2FA_SETUP_CODE} for mock setup.`);
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
        <h1 className="text-2xl font-bold">Setup Two-Factor Authentication</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Scan the QR code with your authenticator app
        </p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center rounded-lg border bg-muted/30 p-6">
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Use Google Authenticator, Microsoft Authenticator, Authy, or a similar app.
          </p>
          <div className="flex justify-center rounded-lg bg-white p-4">
            <QRCodeSVG value={totpUri} size={180} level="M" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="otp-code" className="text-sm">
            Enter 6-digit code
          </Label>
          <Input
            id="otp-code"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            maxLength={6}
            required
            autoComplete="one-time-code"
            className="text-center text-lg tracking-[0.5em]"
          />
        </div>

        {useMock && (
          <p className="text-xs text-muted-foreground">
            Mock mode: use code <strong>{MOCK_2FA_SETUP_CODE}</strong> to complete setup.
          </p>
        )}

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>
        )}

        <Button type="submit" className="w-full" disabled={!canComplete}>
          {isLoading ? "Completing..." : "Complete Setup"}
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
