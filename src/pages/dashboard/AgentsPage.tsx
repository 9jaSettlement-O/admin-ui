import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { shouldUseMockService } from "@/lib/config";
import { useAgents } from "@/hooks/use-mock-data";
import { mockAgents, mockAgentTiers } from "@/_data/mock-data";

type AgentPeriod = "all" | "today" | "week" | "month" | "year" | "custom";

const PERIOD_LABELS: Record<AgentPeriod, string> = {
  all: "All time",
  today: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
  custom: "Custom range",
};

function isDateInAgentPeriod(
  dateStr: string,
  period: AgentPeriod,
  customStart?: string,
  customEnd?: string,
  refDate?: Date
): boolean {
  const date = new Date(dateStr);
  const now = refDate ?? new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  switch (period) {
    case "all":
      return true;
    case "today":
      return dateStr === todayStr;
    case "week": {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date >= weekAgo && date <= new Date(today.getTime() + 86400000);
    }
    case "month": {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return date >= monthAgo && date <= new Date(today.getTime() + 86400000);
    }
    case "year": {
      const yearAgo = new Date(today);
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      return date >= yearAgo && date <= new Date(today.getTime() + 86400000);
    }
    case "custom":
      if (!customStart || !customEnd) return true;
      return dateStr >= customStart && dateStr <= customEnd;
    default:
      return true;
  }
}

type TabType = "overview" | "tiers";

export function AgentsPage() {
  const useMock = shouldUseMockService();
  const { data: agentsFromQuery, isLoading, isError } = useAgents();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateTierModal, setShowCreateTierModal] = useState(false);
  const [period, setPeriod] = useState<AgentPeriod>("all");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [tiers, setTiers] = useState(mockAgentTiers);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Use query data when available; otherwise fall back to mock agents (e.g. loading, error, or mock disabled)
  const agents =
    useMock && !isError && Array.isArray(agentsFromQuery) && agentsFromQuery.length > 0
      ? agentsFromQuery
      : mockAgents;
  const tiersData = tiers;
  const agentList = Array.isArray(agents) ? agents : [];

  const filteredAgents = agentList.filter((agent) => {
    const joinedAt = (agent as { joinedAt?: string }).joinedAt;
    const matchesSearch = agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = !joinedAt || isDateInAgentPeriod(joinedAt, period, customStart, customEnd);
    return matchesSearch && matchesPeriod;
  });

  const totalPages = Math.max(1, Math.ceil(filteredAgents.length / pageSize));
  const paginatedAgents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAgents.slice(start, start + pageSize);
  }, [filteredAgents, page, pageSize]);

  const agentStats = [
    { name: "Total Agents", value: String(agentList.length) },
    { name: "Total Transactions", value: String(agentList.reduce((s, a) => s + a.totalTransactions, 0)) },
    { name: "Total Volume (CAD)", value: `${agentList.reduce((s, a) => s + a.totalVolumeCAD, 0).toLocaleString()} CAD` },
    { name: "Total Payouts (₦)", value: `₦${agentList.reduce((s, a) => s + a.lifetimeEarnings, 0).toLocaleString()}` },
  ];

  const handleCreateTier = (tierData: {
    tierName: string;
    minVolume: number;
    maxVolume: number;
    commissionPerCAD: number;
    duration: string;
  }) => {
    const newTier = {
      id: (tiersData.length + 1).toString(),
      ...tierData,
      status: "Active" as const,
    };
    setTiers([...tiersData, newTier]);
    setShowCreateTierModal(false);
  };

  const handlePeriodChange = (value: string) => {
    setPage(1);
    if (value === "custom") setShowCustomRange(true);
    else setPeriod(value as AgentPeriod);
  };

  const handleApplyCustomRange = () => {
    if (customStart && customEnd) {
      setPage(1);
      setPeriod("custom");
      setShowCustomRange(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
          <p className="text-muted-foreground">Manage agent commission tiers and monitor performance.</p>
        </div>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
            <SelectContent>
            <SelectItem value="all">{PERIOD_LABELS.all}</SelectItem>
            <SelectItem value="today">{PERIOD_LABELS.today}</SelectItem>
            <SelectItem value="week">{PERIOD_LABELS.week}</SelectItem>
            <SelectItem value="month">{PERIOD_LABELS.month}</SelectItem>
            <SelectItem value="year">{PERIOD_LABELS.year}</SelectItem>
            <SelectItem value="custom">{PERIOD_LABELS.custom}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="tiers">Commission Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {agentStats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agents List & Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center space-x-2 sm:w-80">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <Input
                    placeholder="Search by agent email..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                    className="h-9"
                  />
                </div>
                {filteredAgents.length > pageSize && (
                  <p className="text-sm text-muted-foreground">
                    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredAgents.length)} of {filteredAgents.length}
                  </p>
                )}
              </div>

              <div className="rounded-md border">
                {isLoading && useMock ? (
                  <TableSkeleton rows={8} columns={6} />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent Email</TableHead>
                        <TableHead className="text-center">Total Transactions</TableHead>
                        <TableHead className="text-center">Total Volume (CAD)</TableHead>
                        <TableHead className="text-center">Lifetime Earnings (₦)</TableHead>
                        <TableHead className="hidden text-center md:table-cell">Earnings This Week (₦)</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAgents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No agents found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedAgents.map((agent) => (
                          <TableRow key={agent.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{agent.email}</TableCell>
                            <TableCell className="text-center">{agent.totalTransactions}</TableCell>
                            <TableCell className="text-center">₦{agent.totalVolumeCAD.toLocaleString()}</TableCell>
                            <TableCell className="text-center">₦{agent.lifetimeEarnings.toLocaleString()}</TableCell>
                            <TableCell className="hidden text-center md:table-cell">
                              ₦{agent.earningsThisWeek.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/dashboard/agents/${agent.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>

              {filteredAgents.length > pageSize && totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowCreateTierModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Tier
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Agent Commission Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tier Name</TableHead>
                        <TableHead className="text-right">Min Volume (CAD)</TableHead>
                        <TableHead className="text-right">Max Volume (CAD)</TableHead>
                        <TableHead className="text-right">Commission per CAD (₦)</TableHead>
                        <TableHead className="hidden text-right md:table-cell">Duration</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tiersData.map((tier) => (
                        <TableRow key={tier.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{tier.tierName}</TableCell>
                          <TableCell className="text-right">₦{tier.minVolume.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₦{tier.maxVolume.toLocaleString()}</TableCell>
                          <TableCell className="text-right">₦{tier.commissionPerCAD}</TableCell>
                          <TableCell className="hidden text-right md:table-cell">{tier.duration}</TableCell>
                          <TableCell className="text-right">
                            <StatusBadge
                              status={tier.status}
                              variant={tier.status === "Active" ? "account" : "transaction"}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </div>
            </CardContent>
          </Card>

          <CreateTierModal
            open={showCreateTierModal}
            onOpenChange={setShowCreateTierModal}
            onCreateTier={handleCreateTier}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={showCustomRange} onOpenChange={setShowCustomRange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Date Range</DialogTitle>
            <DialogDescription>Select start and end date for agent summary data</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="agent-start">Start Date</Label>
              <Input id="agent-start" type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agent-end">End Date</Label>
              <Input id="agent-end" type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomRange(false)}>
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

function CreateTierModal({
  open,
  onOpenChange,
  onCreateTier,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTier: (data: {
    tierName: string;
    minVolume: number;
    maxVolume: number;
    commissionPerCAD: number;
    duration: string;
  }) => void;
}) {
  const [formData, setFormData] = useState({
    tierName: "",
    minVolume: 0,
    maxVolume: 0,
    commissionPerCAD: 0,
    duration: "1 year",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTier(formData);
    setFormData({
      tierName: "",
      minVolume: 0,
      maxVolume: 0,
      commissionPerCAD: 0,
      duration: "1 year",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Commission Tier</DialogTitle>
          <DialogDescription>Add a new commission tier for agents</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tierName">Tier Name</Label>
            <Input
              id="tierName"
              value={formData.tierName}
              onChange={(e) => setFormData({ ...formData, tierName: e.target.value })}
              placeholder="e.g., Gold Tier"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minVolume">Min Volume (CAD)</Label>
              <Input
                id="minVolume"
                type="number"
                value={formData.minVolume}
                onChange={(e) => setFormData({ ...formData, minVolume: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxVolume">Max Volume (CAD)</Label>
              <Input
                id="maxVolume"
                type="number"
                value={formData.maxVolume}
                onChange={(e) => setFormData({ ...formData, maxVolume: Number(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Commission per CAD (₦)</Label>
            <Input
              id="commission"
              type="number"
              step="0.01"
              value={formData.commissionPerCAD}
              onChange={(e) => setFormData({ ...formData, commissionPerCAD: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger id="duration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 year">1 Year</SelectItem>
                <SelectItem value="6 months">6 Months</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Tier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
