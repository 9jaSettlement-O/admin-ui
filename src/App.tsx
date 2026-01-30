import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { UsersPage } from "@/pages/dashboard/UsersPage";
import { BusinessesPage } from "@/pages/dashboard/BusinessesPage";
import { AgentsPage } from "@/pages/dashboard/AgentsPage";
import { TransactionsPage } from "@/pages/dashboard/TransactionsPage";
import { VirtualAccountsPage } from "@/pages/dashboard/VirtualAccountsPage";
import { SettlementsPage } from "@/pages/dashboard/SettlementsPage";
import { CountryCurrencyConfigPage } from "@/pages/dashboard/CountryCurrencyConfigPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { SuperAdminPage } from "@/pages/dashboard/SuperAdminPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="businesses" element={<BusinessesPage />} />
        <Route path="agents" element={<AgentsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="virtual-accounts" element={<VirtualAccountsPage />} />
        <Route path="settlements" element={<SettlementsPage />} />
        <Route path="country-currency-config" element={<CountryCurrencyConfigPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="superadmin" element={<SuperAdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
