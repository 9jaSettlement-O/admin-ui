import { useState, useMemo } from "react";
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
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { PageHeaderContext } from "@/contexts/page-header-context";

const SIDEBAR_COLLAPSED_KEY = "9ja-admin-sidebar-collapsed";

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

function getStoredCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

export function DashboardLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(getStoredCollapsed);
  const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);
  const logout = useAuthStore((s) => s.logout);
  const pageHeaderValue = useMemo(() => ({ setActions: setHeaderActions }), []);

  const toggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
    } catch {
      /* ignore */
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavLink = ({
    route,
    collapsed,
    onNavigate,
  }: {
    route: (typeof routes)[0];
    collapsed: boolean;
    onNavigate?: () => void;
  }) => {
    const active = route.match(pathname);
    return (
      <Link
        to={route.href}
        title={collapsed ? route.label : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
          active ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          collapsed && "justify-center px-2"
        )}
        onClick={onNavigate}
      >
        <route.icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span>{route.label}</span>}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden flex-col border-r bg-background md:flex transition-[width] duration-200 ease-in-out",
          sidebarCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        <div className="flex h-16 items-center border-b px-3">
          <Logo
            width={sidebarCollapsed ? 52 : 72}
            height={sidebarCollapsed ? 39 : 54}
            className="shrink-0"
          />
        </div>
        <nav className="flex-1 overflow-auto p-4">
          <ul className="grid gap-2">
            {routes.map((route) => (
              <li key={route.href}>
                <NavLink route={route} collapsed={sidebarCollapsed} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 border-t p-4">
          <Button
            variant="outline"
            size={sidebarCollapsed ? "icon" : "default"}
            className={cn("w-full", sidebarCollapsed ? "h-9 w-9" : "justify-start bg-transparent")}
            onClick={handleLogout}
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <LogOut className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
            {!sidebarCollapsed && "Logout"}
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-4 md:px-6">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 pt-10">
              <div className="flex h-full flex-col">
                <div className="px-4 py-2">
                  <Logo />
                </div>
                <nav className="flex-1 overflow-auto p-2">
                  <ul className="grid gap-1">
                    {routes.map((route) => (
                      <li key={route.href}>
                        <NavLink
                          route={route}
                          collapsed={false}
                          onNavigate={() => setIsOpen(false)}
                        />
                      </li>
                    ))}
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
            <Logo compact />
          </div>
          <div className="ml-auto flex items-center gap-4 md:hidden">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <PageHeaderContext.Provider value={pageHeaderValue}>
            <div className="flex items-center justify-between gap-4 px-4 pb-2 pt-4 md:px-8 md:pt-6">
              <div className="-ml-2 flex flex-nowrap items-center gap-2 md:-ml-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-8 w-8 shrink-0 rounded-full p-0 hover:bg-transparent hover:text-red-500 md:inline-flex"
                  onClick={toggleSidebar}
                  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {sidebarCollapsed ? (
                    <PanelLeft className="h-5 w-5" />
                  ) : (
                    <PanelLeftClose className="h-5 w-5" />
                  )}
                </Button>
                <Breadcrumbs />
              </div>
              {headerActions}
            </div>
            <Outlet />
          </PageHeaderContext.Provider>
        </main>
      </div>
    </div>
  );
}
