import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { UsersPage } from "@/pages/dashboard/UsersPage";
import { UserDetailPage } from "@/pages/dashboard/UserDetailPage";
import { BusinessesPage } from "@/pages/dashboard/BusinessesPage";
import { AgentsPage } from "@/pages/dashboard/AgentsPage";
import { TransactionsPage } from "@/pages/dashboard/TransactionsPage";
import { VirtualAccountsPage } from "@/pages/dashboard/VirtualAccountsPage";
import { SettlementsPage } from "@/pages/dashboard/SettlementsPage";
import { CountryCurrencyConfigPage } from "@/pages/dashboard/CountryCurrencyConfigPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { SuperAdminPage } from "@/pages/dashboard/SuperAdminPage";
import type { RouteType } from "@/utils/interfaces.util";

export const privateRoutes: RouteType[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <DashboardPage />, index: true },
      { path: "users", element: <UsersPage /> },
      { path: "users/:id", element: <UserDetailPage /> },
      { path: "businesses", element: <BusinessesPage /> },
      { path: "agents", element: <AgentsPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "virtual-accounts", element: <VirtualAccountsPage /> },
      { path: "settlements", element: <SettlementsPage /> },
      { path: "country-currency-config", element: <CountryCurrencyConfigPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "superadmin", element: <SuperAdminPage /> },
    ],
  },
];
