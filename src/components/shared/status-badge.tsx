import { cn } from "@/lib/utils";

type KycStatus = "Tier 2 Verified" | "Tier 1 Verified" | "Awaiting KYC Review" | "Unverified";
type UserKycStatus = "Verified" | "Awaiting KYC Review" | "Unverified";
type KybStatus = "Verified" | "Awaiting KYB Review" | "Unverified";
type TxStatus = "Completed" | "Pending" | "Failed" | "Processing";
type AccountStatus = "Active" | "Blocked" | "Pending";

const kycStyles: Record<KycStatus, string> = {
  "Tier 2 Verified": "bg-green-100 text-green-800",
  "Tier 1 Verified": "bg-blue-100 text-blue-800",
  "Awaiting KYC Review": "bg-yellow-100 text-yellow-800",
  Unverified: "bg-gray-100 text-gray-800",
};

const userKycStyles: Record<UserKycStatus, string> = {
  Verified: "bg-green-100 text-green-800",
  "Awaiting KYC Review": "bg-yellow-100 text-yellow-800",
  Unverified: "bg-gray-100 text-gray-800",
};

const kybStyles: Record<KybStatus, string> = {
  Verified: "bg-green-100 text-green-800",
  "Awaiting KYB Review": "bg-yellow-100 text-yellow-800",
  Unverified: "bg-gray-100 text-gray-800",
};

const txStyles: Record<TxStatus, string> = {
  Completed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
  Processing: "bg-blue-100 text-blue-800",
};

const accountStyles: Record<AccountStatus, string> = {
  Active: "bg-green-100 text-green-800",
  Blocked: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

interface StatusBadgeProps {
  status: string;
  variant?: "kyc" | "userKyc" | "kyb" | "transaction" | "account";
  className?: string;
}

export function StatusBadge({ status, variant = "kyc", className }: StatusBadgeProps) {
  const styleMap =
    variant === "kyc"
      ? kycStyles
      : variant === "userKyc"
        ? userKycStyles
        : variant === "kyb"
          ? kybStyles
          : variant === "transaction"
            ? txStyles
            : accountStyles;
  const style = styleMap[status as keyof typeof styleMap] ?? "bg-gray-100 text-gray-800";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
