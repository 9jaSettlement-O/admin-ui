import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { UsersPage } from "@/pages/dashboard/UsersPage";
import { UserDetailPage } from "@/pages/dashboard/UserDetailPage";
import { BusinessesPage } from "@/pages/dashboard/BusinessesPage";
import { BusinessDetailPage } from "@/pages/dashboard/BusinessDetailPage";
import { AgentsPage } from "@/pages/dashboard/AgentsPage";
import { AgentDetailPage } from "@/pages/dashboard/AgentDetailPage";
import { TransactionsPage } from "@/pages/dashboard/TransactionsPage";
import { TransactionDetailPage } from "@/pages/dashboard/TransactionDetailPage";
import { VirtualAccountsPage } from "@/pages/dashboard/VirtualAccountsPage";
import { VirtualAccountDetailPage } from "@/pages/dashboard/VirtualAccountDetailPage";
import { SettlementsPage } from "@/pages/dashboard/SettlementsPage";
import { SettlementDetailPage } from "@/pages/dashboard/SettlementDetailPage";
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
      { path: "businesses/:id", element: <BusinessDetailPage /> },
      { path: "agents", element: <AgentsPage /> },
      { path: "agents/:id", element: <AgentDetailPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "transactions/:id", element: <TransactionDetailPage /> },
      { path: "virtual-accounts", element: <VirtualAccountsPage /> },
      { path: "virtual-accounts/:id", element: <VirtualAccountDetailPage /> },
      { path: "settlements", element: <SettlementsPage /> },
      { path: "settlements/:id", element: <SettlementDetailPage /> },
      { path: "country-currency-config", element: <CountryCurrencyConfigPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "superadmin", element: <SuperAdminPage /> },
    ],
  },
];
