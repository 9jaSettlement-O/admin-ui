import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  /** Compact mode for collapsed sidebar */
  compact?: boolean;
}

export function Logo({ className, width, height, compact }: LogoProps) {
  const w = width ?? (compact ? 36 : 107);
  const h = height ?? (compact ? 27 : 80);

  return (
    <img
      src="/assets/images/logo.png"
      alt="9JA Settlement"
      className={cn("h-auto object-contain", className)}
      width={w}
      height={h}
    />
  );
}
