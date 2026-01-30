import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  LineChart,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Bell,
} from "lucide-react";

const mainMetrics = [
  {
    name: "Total Users",
    value: "12.3K",
    change: "+15% this month",
    icon: Users,
    color: "text-orange-600",
    iconBg: "bg-orange-500",
  },
  {
    name: "Verified Users",
    value: "9.8K",
    change: "+8.2% this month",
    icon: CheckCircle,
    color: "text-pink-600",
    iconBg: "bg-pink-500",
  },
  {
    name: "Revenue",
    value: "$150K",
    change: "+11.1% this month",
    icon: DollarSign,
    color: "text-green-600",
    iconBg: "bg-green-500",
  },
];

const performanceData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 68 },
  { month: "Mar", value: 72 },
  { month: "Apr", value: 70 },
  { month: "May", value: 75 },
  { month: "Jun", value: 78 },
  { month: "Jul", value: 82 },
  { month: "Aug", value: 85 },
  { month: "Sep", value: 83 },
  { month: "Oct", value: 88 },
  { month: "Nov", value: 92 },
  { month: "Dec", value: 95 },
];

const smallMetrics = [
  {
    title: "KYC Approvals",
    value: "$2.2K",
    subtitle: "this month",
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
    title: "Transactions",
    value: "$45.6K",
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
    value: "$543",
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
    title: "Failed Transactions",
    value: "$321",
    subtitle: "this month",
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

const recentActivity = [
  {
    type: "KYC Approval",
    user: "john.doe@example.com",
    time: "2 minutes ago",
    status: "completed" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    type: "Transaction Review",
    user: "jane.smith@example.com",
    time: "5 minutes ago",
    status: "pending" as const,
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    type: "Account Verification",
    user: "mike.johnson@example.com",
    time: "10 minutes ago",
    status: "completed" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    type: "Failed Transaction",
    user: "sarah.wilson@example.com",
    time: "15 minutes ago",
    status: "failed" as const,
    icon: AlertCircle,
    color: "text-red-600",
  },
  {
    type: "KYC Submission",
    user: "david.brown@example.com",
    time: "20 minutes ago",
    status: "review" as const,
    icon: Clock,
    color: "text-blue-600",
  },
];

export function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Track performance across key business metrics and operations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </Button>
          <Button>View Complete Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {mainMetrics.map((metric) => (
          <Card key={metric.name} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${metric.iconBg}`}
                  >
                    <metric.icon className="h-6 w-6 text-white" />
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
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">MTD ACCOUNTS SINCE 2018</p>
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
                      dataKey="month"
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
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-1 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
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
                ))}
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
                      <Line
                        type="monotone"
                        dataKey="y"
                        stroke={metric.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
