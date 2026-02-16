import { useLocation } from "react-router-dom";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { ListPageSkeleton } from "./list-page-skeleton";
import { DetailPageSkeleton } from "./detail-page-skeleton";
import { SettingsSkeleton } from "./settings-skeleton";

/**
 * Renders the appropriate page skeleton based on the current route.
 * Used as Suspense fallback when lazy-loading route components.
 */
export function RouteSkeletonFallback() {
  const { pathname } = useLocation();

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return <DashboardSkeleton />;
  }
  if (pathname === "/dashboard/settings") {
    return <SettingsSkeleton />;
  }
  if (
    pathname.match(/^\/dashboard\/users\/[^/]+$/) ||
    pathname.match(/^\/dashboard\/businesses\/[^/]+$/) ||
    pathname.match(/^\/dashboard\/agents\/[^/]+$/) ||
    pathname.match(/^\/dashboard\/transactions\/[^/]+$/)
  ) {
    return <DetailPageSkeleton />;
  }
  if (pathname.startsWith("/dashboard/users")) {
    return <ListPageSkeleton metricCount={6} tableColumns={7} />;
  }
  if (pathname.startsWith("/dashboard/businesses")) {
    return <ListPageSkeleton metricCount={3} tableColumns={6} />;
  }
  if (pathname.startsWith("/dashboard/transactions")) {
    return <ListPageSkeleton metricCount={5} tableColumns={8} />;
  }
  if (pathname.startsWith("/dashboard/agents")) {
    return <ListPageSkeleton metricCount={4} tableColumns={6} />;
  }

  return <ListPageSkeleton />;
}
