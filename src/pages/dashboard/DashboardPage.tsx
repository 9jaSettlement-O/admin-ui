import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NotificationsModal } from "@/components/shared/notifications-modal";
import { XAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart, Line, LineChart } from "recharts";
import { TrendingUp, Users, DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { usePageHeaderActions } from "@/contexts/page-header-context";

export type AnalyticsPeriod = "today" | "week" | "month" | "year" | "custom";

const PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
  today: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
  custom: "Custom range",
};

function getMainMetrics(period: AnalyticsPeriod) {
  const base = {
    totalUsers: { value: "12.3K", change: "+15%" },
    verifiedUsers: { value: "9.8K", change: "+8.2%" },
    volume: { value: "₦2.4B", change: "+11.1%" },
  };
  switch (period) {
    case "today":
      return [
        { ...base.totalUsers, name: "Total Users", change: "+2% today", icon: Users, color: "text-orange-600", iconBg: "bg-orange-500" },
        { ...base.verifiedUsers, name: "Verified Users", change: "+1% today", icon: CheckCircle, color: "text-pink-600", iconBg: "bg-pink-500" },
        { ...base.volume, name: "CAD ↔ NGN Volume", change: "+3% today", icon: DollarSign, color: "text-green-600", iconBg: "bg-green-500" },
      ];
    case "week":
      return [
        { ...base.totalUsers, name: "Total Users", change: "+5% this week", icon: Users, color: "text-orange-600", iconBg: "bg-orange-500" },
        { ...base.verifiedUsers, name: "Verified Users", change: "+4% this week", icon: CheckCircle, color: "text-pink-600", iconBg: "bg-pink-500" },
        { ...base.volume, name: "CAD ↔ NGN Volume", change: "+6% this week", icon: DollarSign, color: "text-green-600", iconBg: "bg-green-500" },
      ];
    case "month":
      return [
        { ...base.totalUsers, name: "Total Users", change: "+15% this month", icon: Users, color: "text-orange-600", iconBg: "bg-orange-500" },
        { ...base.verifiedUsers, name: "Verified Users", change: "+8.2% this month", icon: CheckCircle, color: "text-pink-600", iconBg: "bg-pink-500" },
        { ...base.volume, name: "CAD ↔ NGN Volume", change: "+11.1% this month", icon: DollarSign, color: "text-green-600", iconBg: "bg-green-500" },
      ];
    case "year":
      return [
        { ...base.totalUsers, name: "Total Users", change: "+42% this year", icon: Users, color: "text-orange-600", iconBg: "bg-orange-500" },
        { ...base.verifiedUsers, name: "Verified Users", change: "+38% this year", icon: CheckCircle, color: "text-pink-600", iconBg: "bg-pink-500" },
        { ...base.volume, name: "CAD ↔ NGN Volume", change: "+55% this year", icon: DollarSign, color: "text-green-600", iconBg: "bg-green-500" },
      ];
    default:
      return [
        { ...base.totalUsers, name: "Total Users", change: "+12% in range", icon: Users, color: "text-orange-600", iconBg: "bg-orange-500" },
        { ...base.verifiedUsers, name: "Verified Users", change: "+7% in range", icon: CheckCircle, color: "text-pink-600", iconBg: "bg-pink-500" },
        { ...base.volume, name: "CAD ↔ NGN Volume", change: "+9% in range", icon: DollarSign, color: "text-green-600", iconBg: "bg-green-500" },
      ];
  }
}

function getPerformanceData(period: AnalyticsPeriod): { label: string; value: number }[] {
  switch (period) {
    case "today":
      return [
        { label: "6am", value: 45 },
        { label: "9am", value: 62 },
        { label: "12pm", value: 78 },
        { label: "3pm", value: 85 },
        { label: "6pm", value: 92 },
        { label: "9pm", value: 88 },
      ];
    case "week":
      return [
        { label: "Mon", value: 65 },
        { label: "Tue", value: 72 },
        { label: "Wed", value: 68 },
        { label: "Thu", value: 80 },
        { label: "Fri", value: 88 },
        { label: "Sat", value: 82 },
        { label: "Sun", value: 95 },
      ];
    case "month":
      return [
        { label: "W1", value: 65 },
        { label: "W2", value: 72 },
        { label: "W3", value: 78 },
        { label: "W4", value: 85 },
        { label: "W5", value: 95 },
      ];
    case "year":
      return [
        { label: "Jan", value: 65 },
        { label: "Feb", value: 68 },
        { label: "Mar", value: 72 },
        { label: "Apr", value: 70 },
        { label: "May", value: 75 },
        { label: "Jun", value: 78 },
        { label: "Jul", value: 82 },
        { label: "Aug", value: 85 },
        { label: "Sep", value: 83 },
        { label: "Oct", value: 88 },
        { label: "Nov", value: 92 },
        { label: "Dec", value: 95 },
      ];
    default:
      return [
        { label: "W1", value: 70 },
        { label: "W2", value: 75 },
        { label: "W3", value: 82 },
        { label: "W4", value: 90 },
      ];
  }
}

function getSmallMetrics(period: AnalyticsPeriod) {
  const periodLabel =
    period === "today"
      ? "today"
      : period === "week"
        ? "this week"
        : period === "month"
          ? "this month"
          : period === "year"
            ? "this year"
            : "in range";
  return [
    {
      title: "KYC Approvals",
      value: period === "today" ? "42" : period === "week" ? "312" : period === "year" ? "2.2K" : "2.2K",
      subtitle: periodLabel,
      data: [
        { x: 1, y: 20 },
        { x: 2, y: 25 },
        { x: 3, y: 22 },
        { x: 4, y: 28 },
        { x: 5, y: 32 },
        { x: 6, y: 30 },
        { x: 7, y: 35 },
      ],
      color: "#10b981",
      bgColor: "border-green-200",
    },
    {
      title: "CAD/NGN Txns",
      value: period === "today" ? "1.2K" : period === "week" ? "8.4K" : period === "year" ? "45.6K" : "45.6K",
      subtitle: "completed",
      data: [
        { x: 1, y: 15 },
        { x: 2, y: 18 },
        { x: 3, y: 22 },
        { x: 4, y: 19 },
        { x: 5, y: 25 },
        { x: 6, y: 28 },
        { x: 7, y: 30 },
      ],
      color: "#3b82f6",
      bgColor: "border-blue-200",
    },
    {
      title: "Pending Reviews",
      value: period === "today" ? "23" : period === "week" ? "156" : "543",
      subtitle: "awaiting",
      data: [
        { x: 1, y: 10 },
        { x: 2, y: 12 },
        { x: 3, y: 8 },
        { x: 4, y: 15 },
        { x: 5, y: 18 },
        { x: 6, y: 14 },
        { x: 7, y: 20 },
      ],
      color: "#f59e0b",
      bgColor: "border-orange-200",
    },
    {
      title: "Failed Txns",
      value: period === "today" ? "8" : period === "week" ? "47" : "321",
      subtitle: periodLabel,
      data: [
        { x: 1, y: 5 },
        { x: 2, y: 8 },
        { x: 3, y: 6 },
        { x: 4, y: 4 },
        { x: 5, y: 7 },
        { x: 6, y: 9 },
        { x: 7, y: 6 },
      ],
      color: "#ef4444",
      bgColor: "border-red-200",
    },
  ];
}

const recentActivity = [
  { type: "KYC Approval", user: "chidi.okafo@example.com", time: "2 minutes ago", status: "completed" as const, icon: CheckCircle, color: "text-green-600" },
  { type: "Transaction Review", user: "amara.nwosu@example.com", time: "5 minutes ago", status: "pending" as const, icon: Clock, color: "text-yellow-600" },
  { type: "Account Verification", user: "seun.adeyemi@example.com", time: "10 minutes ago", status: "completed" as const, icon: CheckCircle, color: "text-green-600" },
  { type: "Failed Transaction", user: "ngozi.eze@example.com", time: "15 minutes ago", status: "failed" as const, icon: AlertCircle, color: "text-red-600" },
  { type: "KYC Submission", user: "emeka.okoli@example.com", time: "20 minutes ago", status: "review" as const, icon: Clock, color: "text-blue-600" },
];

export function DashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [period, setPeriod] = useState<AnalyticsPeriod>("month");
  const [showCustomRangeDialog, setShowCustomRangeDialog] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const setHeaderActions = usePageHeaderActions();

  const handlePeriodChange = (value: string) => {
    if (value === "custom") {
      setShowCustomRangeDialog(true);
    } else {
      setPeriod(value as AnalyticsPeriod);
    }
  };

  useEffect(() => {
    setHeaderActions(
      <div className="flex items-center gap-2">
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">{PERIOD_LABELS.today}</SelectItem>
            <SelectItem value="week">{PERIOD_LABELS.week}</SelectItem>
            <SelectItem value="month">{PERIOD_LABELS.month}</SelectItem>
            <SelectItem value="year">{PERIOD_LABELS.year}</SelectItem>
            <SelectItem value="custom">{PERIOD_LABELS.custom}</SelectItem>
          </SelectContent>
        </Select>
        <NotificationsModal open={showNotifications} onOpenChange={setShowNotifications} />
        <Button>View Complete Report</Button>
      </div>
    );
    return () => setHeaderActions(null);
  }, [period, showNotifications, setHeaderActions]);

  const handleApplyCustomRange = () => {
    if (customStart && customEnd) {
      setPeriod("custom");
      setShowCustomRangeDialog(false);
    }
  };

  const mainMetrics = getMainMetrics(period);
  const performanceData = getPerformanceData(period);
  const smallMetrics = getSmallMetrics(period);

  const chartSubtitle =
    period === "today"
      ? "HOURLY VOLUME"
      : period === "week"
        ? "DAILY VOLUME"
        : period === "month"
          ? "WEEKLY VOLUME"
          : period === "year"
            ? "MONTHLY VOLUME"
            : "CUSTOM RANGE VOLUME";

  return (
    <div className="flex-1 p-4 pt-6 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Manage users onboarded via 9JA Settlement — Nigerians in Canada sending CAD ↔ Naira (NGN). V2 supports multicurrency.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {mainMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
          <Card key={metric.name} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${metric.iconBg}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <p className={`text-sm font-medium ${metric.color}`}>{metric.change}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>CAD ↔ NGN Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">{chartSubtitle}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold">95%</span>
                    <span className="text-sm text-green-600">+14</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#colorGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const ActivityIcon = activity.icon;
                  return (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-1 ${activity.color}`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {smallMetrics.map((metric, index) => (
          <Card key={index} className={`border-l-4 ${metric.bgColor}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </div>
                <div className="h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.data}>
                      <Line type="monotone" dataKey="y" stroke={metric.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showCustomRangeDialog} onOpenChange={setShowCustomRangeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Date Range</DialogTitle>
            <DialogDescription>Select a start and end date for analytics</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomRangeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyCustomRange} disabled={!customStart || !customEnd}>
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
