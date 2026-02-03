import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

const DEFAULT_REQUIREMENTS = [
  { key: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { key: "uppercase", label: "At least one uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { key: "lowercase", label: "At least one lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { key: "number", label: "At least one number", test: (p: string) => /\d/.test(p) },
  { key: "special", label: "At least one special character (!@#$%^&*)", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return DEFAULT_REQUIREMENTS.map(({ label, test }) => ({
    label,
    met: test(password),
  }));
}

export function isPasswordValid(password: string): boolean {
  return DEFAULT_REQUIREMENTS.every(({ test }) => test(password));
}

interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export function PasswordRequirements({ password, className }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  return (
    <ul className={cn("space-y-2 text-sm", className)}>
      {requirements.map((req) => (
        <li
          key={req.label}
          className={cn(
            "flex items-center gap-2",
            req.met ? "text-green-600" : "text-muted-foreground"
          )}
        >
          {req.met ? (
            <Check className="h-4 w-4 shrink-0" />
          ) : (
            <X className="h-4 w-4 shrink-0" />
          )}
          <span>{req.label}</span>
        </li>
      ))}
    </ul>
  );
}
