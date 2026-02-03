import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Route segment to human-readable label */
const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Users",
  businesses: "Businesses",
  transactions: "Transactions",
  "virtual-accounts": "Virtual Accounts",
  settlements: "Settlements",
  agents: "Agents",
  "country-currency-config": "Country Currency Config",
  settings: "Settings",
  superadmin: "Super Admin",
};

/** Detail page labels (when segment is an ID param) */
const DETAIL_LABELS: Record<string, string> = {
  users: "User Details",
  businesses: "Business Details",
  transactions: "Transaction Details",
  "virtual-accounts": "Virtual Account Details",
  settlements: "Settlement Details",
  agents: "Agent Details",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  if (!pathname.startsWith("/dashboard")) return null;

  const segments = pathname.replace(/^\/dashboard\/?/, "").split("/").filter(Boolean);
  const isDashboardRoot = segments.length === 0;
  const crumbs: { label: string; href: string | null }[] = [
    { label: "Dashboard", href: isDashboardRoot ? null : "/dashboard" },
  ];

  let href = "/dashboard";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isId = /^[a-zA-Z0-9-]+$/.test(seg) && (i > 0 || seg.length > 2);
    const parentSeg = segments[i - 1];

    if (i === 0) {
      const label = SEGMENT_LABELS[seg] ?? seg;
      href = `/dashboard/${seg}`;
      crumbs.push({ label, href: segments.length === 1 ? null : href });
    } else if (isId && parentSeg && DETAIL_LABELS[parentSeg]) {
      crumbs.push({ label: DETAIL_LABELS[parentSeg], href: null });
      break;
    } else {
      const label = SEGMENT_LABELS[seg] ?? seg;
      href = `${href}/${seg}`;
      crumbs.push({ label, href: i < segments.length - 1 ? href : null });
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm leading-none text-muted-foreground">
      {crumbs.map((crumb, idx) => (
        <span key={idx} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight className="h-4 w-4 shrink-0" />}
          {crumb.href ? (
            <Link
              to={crumb.href}
              className="hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className={cn("font-medium text-foreground")}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
