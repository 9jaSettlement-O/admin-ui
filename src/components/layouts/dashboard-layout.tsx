import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
  Shield,
  CreditCard,
  DollarSign,
  Users2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";

const routes = [
  { label: "Dashboard", icon: Home, href: "/dashboard", match: (path: string) => path === "/dashboard" },
  { label: "Users", icon: Users, href: "/dashboard/users", match: (path: string) => path.startsWith("/dashboard/users") },
  { label: "Businesses", icon: Briefcase, href: "/dashboard/businesses", match: (path: string) => path.startsWith("/dashboard/businesses") },
  { label: "Transactions", icon: BarChart3, href: "/dashboard/transactions", match: (path: string) => path.startsWith("/dashboard/transactions") },
  { label: "Virtual Accounts", icon: CreditCard, href: "/dashboard/virtual-accounts", match: (path: string) => path.startsWith("/dashboard/virtual-accounts") },
  { label: "Settlements", icon: DollarSign, href: "/dashboard/settlements", match: (path: string) => path.startsWith("/dashboard/settlements") },
  { label: "Agents", icon: Users2, href: "/dashboard/agents", match: (path: string) => path.startsWith("/dashboard/agents") },
  { label: "Country Currency Config", icon: Globe, href: "/dashboard/country-currency-config", match: (path: string) => path.startsWith("/dashboard/country-currency-config") },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", match: (path: string) => path === "/dashboard/settings" },
  { label: "Super Admin", icon: Shield, href: "/dashboard/superadmin", match: (path: string) => path.startsWith("/dashboard/superadmin") },
];

export function DashboardLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Logo className="text-sm" />
        </div>
        <nav className="flex-1 overflow-auto p-4">
          <ul className="grid gap-2">
            {routes.map((route) => {
              const active = route.match(pathname);
              return (
                <li key={route.href}>
                  <Link
                    to={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                      active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-4 bg-transparent md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 pt-10">
              <div className="flex h-full flex-col">
                <div className="px-4 py-2">
                  <Logo className="text-sm" />
                </div>
                <nav className="flex-1 overflow-auto p-2">
                  <ul className="grid gap-1">
                    {routes.map((route) => {
                      const active = route.match(pathname);
                      return (
                        <li key={route.href}>
                          <Link
                            to={route.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground",
                              active ? "bg-primary text-primary-foreground" : "transparent"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <route.icon className="h-5 w-5" />
                            {route.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="border-t p-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2 md:hidden">
            <Logo className="text-xs" />
          </div>
          <div className="ml-auto flex items-center gap-4 md:hidden">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
