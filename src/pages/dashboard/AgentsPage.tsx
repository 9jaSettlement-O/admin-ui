import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/status-badge";
import { shouldUseMockService } from "@/lib/config";
import { useAgents } from "@/hooks/use-mock-data";
import { mockAgents, mockAgentTiers } from "@/_data/mock-data";

const agentStats = [
  { name: "Total Agents", value: "342" },
  { name: "Total Transactions", value: "12.4K" },
  { name: "Total Volume (CAD)", value: "₦2.4M" },
  { name: "Total Payouts (₦)", value: "₦184.5K" },
];

type TabType = "overview" | "tiers";

export function AgentsPage() {
  const useMock = shouldUseMockService();
  const { data: agentsFromQuery, isLoading } = useAgents();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateTierModal, setShowCreateTierModal] = useState(false);
  const [tiers, setTiers] = useState(mockAgentTiers);

  const agents = useMock ? (agentsFromQuery ?? mockAgents) : mockAgents;
  const tiersData = tiers;
  const filteredAgents = (Array.isArray(agents) ? agents : []).filter((agent) =>
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
          <p className="text-muted-foreground">Manage agent commission tiers and monitor performance</p>
        </div>
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
              <div className="mb-6 flex w-full items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by agent email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="rounded-md border">
                {isLoading && useMock ? (
                  <div className="flex h-24 items-center justify-center text-muted-foreground">
                    Loading...
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent Email</TableHead>
                        <TableHead className="text-right">Total Transactions</TableHead>
                        <TableHead className="text-right">Total Volume (CAD)</TableHead>
                        <TableHead className="text-right">Lifetime Earnings (₦)</TableHead>
                        <TableHead className="hidden text-right md:table-cell">Earnings This Week (₦)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAgents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No agents found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAgents.map((agent) => (
                          <TableRow key={agent.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{agent.email}</TableCell>
                            <TableCell className="text-right">{agent.totalTransactions}</TableCell>
                            <TableCell className="text-right">₦{agent.totalVolumeCAD.toLocaleString()}</TableCell>
                            <TableCell className="text-right">₦{agent.lifetimeEarnings.toLocaleString()}</TableCell>
                            <TableCell className="hidden text-right md:table-cell">
                              ₦{agent.earningsThisWeek.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">
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
