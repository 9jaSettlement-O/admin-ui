import { cn } from "@/lib/utils";
import { PASSWORD, PASSWORD_SPECIAL_CHAR_REGEX } from "@/lib/constants/app-constants";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

const DEFAULT_REQUIREMENTS = [
  { key: "length", label: `At least ${PASSWORD.MIN_LENGTH} characters`, test: (p: string) => p.length >= PASSWORD.MIN_LENGTH },
  { key: "uppercase", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { key: "lowercase", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { key: "number", label: "One number", test: (p: string) => /\d/.test(p) },
  { key: "special", label: "One special character", test: (p: string) => PASSWORD_SPECIAL_CHAR_REGEX.test(p) },
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

/** Renders password requirements in settlement-beta-ui style: ✓/○ with green when met */
interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export function PasswordRequirements({ password, className }: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  return (
    <ul className={cn("mt-0.5 space-y-0.5 text-xs text-muted-foreground", className)}>
      {requirements.map((req) => (
        <li key={req.label} className={req.met ? "text-green-600" : ""}>
          {req.met ? "✓" : "○"} {req.label}
        </li>
      ))}
    </ul>
  );
}
