import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { UsersPage } from "@/pages/dashboard/UsersPage";
import { UserDetailPage } from "@/pages/dashboard/UserDetailPage";
import { BusinessesPage } from "@/pages/dashboard/BusinessesPage";
import { BusinessDetailPage } from "@/pages/dashboard/BusinessDetailPage";
import { AgentsPage } from "@/pages/dashboard/AgentsPage";
import { AgentDetailPage } from "@/pages/dashboard/AgentDetailPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import type { RouteType } from "@/utils/interfaces.util";

function BlankPage() {
  return null;
}

export const privateRoutes: RouteType[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <DashboardPage />, index: true },
      { path: "users", element: <UsersPage /> },
      { path: "users/:id", element: <UserDetailPage /> },
      { path: "businesses", element: <BusinessesPage /> },
      { path: "businesses/:id", element: <BusinessDetailPage /> },
      { path: "agents", element: <AgentsPage /> },
      { path: "agents/:id", element: <AgentDetailPage /> },
      { path: "transactions", element: <BlankPage /> },
      { path: "transactions/:id", element: <BlankPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "virtual-accounts", element: <BlankPage /> },
      { path: "virtual-accounts/:id", element: <BlankPage /> },
      { path: "settlements", element: <BlankPage /> },
      { path: "settlements/:id", element: <BlankPage /> },
      { path: "country-currency-config", element: <BlankPage /> },
      { path: "superadmin", element: <BlankPage /> },
    ],
  },
];
