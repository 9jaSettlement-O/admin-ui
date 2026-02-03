import { lazy, Suspense } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { RouteSkeletonFallback } from "@/components/skeletons";
import type { RouteType } from "@/utils/interfaces.util";

const DashboardPage = lazy(() =>
  import("@/pages/dashboard/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const UsersPage = lazy(() =>
  import("@/pages/dashboard/UsersPage").then((m) => ({ default: m.UsersPage }))
);
const UserDetailPage = lazy(() =>
  import("@/pages/dashboard/UserDetailPage").then((m) => ({ default: m.UserDetailPage }))
);
const BusinessesPage = lazy(() =>
  import("@/pages/dashboard/BusinessesPage").then((m) => ({ default: m.BusinessesPage }))
);
const BusinessDetailPage = lazy(() =>
  import("@/pages/dashboard/BusinessDetailPage").then((m) => ({ default: m.BusinessDetailPage }))
);
const AgentsPage = lazy(() =>
  import("@/pages/dashboard/AgentsPage").then((m) => ({ default: m.AgentsPage }))
);
const AgentDetailPage = lazy(() =>
  import("@/pages/dashboard/AgentDetailPage").then((m) => ({ default: m.AgentDetailPage }))
);
const TransactionsPage = lazy(() =>
  import("@/pages/dashboard/TransactionsPage").then((m) => ({ default: m.TransactionsPage }))
);
const TransactionDetailPage = lazy(() =>
  import("@/pages/dashboard/TransactionDetailPage").then((m) => ({ default: m.TransactionDetailPage }))
);
const SettingsPage = lazy(() =>
  import("@/pages/dashboard/SettingsPage").then((m) => ({ default: m.SettingsPage }))
);

function BlankPage() {
  return null;
}

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType<unknown>>) {
  return (
    <Suspense fallback={<RouteSkeletonFallback />}>
      <Component />
    </Suspense>
  );
}

export const privateRoutes: RouteType[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: withSuspense(DashboardPage), index: true },
      { path: "users", element: withSuspense(UsersPage) },
      { path: "users/:id", element: withSuspense(UserDetailPage) },
      { path: "businesses", element: withSuspense(BusinessesPage) },
      { path: "businesses/:id", element: withSuspense(BusinessDetailPage) },
      { path: "agents", element: withSuspense(AgentsPage) },
      { path: "agents/:id", element: withSuspense(AgentDetailPage) },
      { path: "transactions", element: withSuspense(TransactionsPage) },
      { path: "transactions/:id", element: withSuspense(TransactionDetailPage) },
      { path: "settings", element: withSuspense(SettingsPage) },
      { path: "virtual-accounts", element: <BlankPage /> },
      { path: "virtual-accounts/:id", element: <BlankPage /> },
      { path: "settlements", element: <BlankPage /> },
      { path: "settlements/:id", element: <BlankPage /> },
      { path: "country-currency-config", element: <BlankPage /> },
      { path: "superadmin", element: <BlankPage /> },
    ],
  },
];
