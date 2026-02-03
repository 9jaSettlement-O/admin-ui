import { useParams, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { shouldUseMockService } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { mockDataService } from "@/services/mock";
import { mockAgents, mockAgentDetails } from "@/_data/mock-data";

export function AgentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();

  const { data: agentFromQuery } = useQuery({
    queryKey: ["agentDetail", id],
    queryFn: () => mockDataService.getAgentDetailById(id ?? ""),
    enabled: useMock && !!id,
  });

  const agentDetail = agentFromQuery ?? mockAgentDetails.find((a) => a.id === id);
  const agentBase = agentDetail ?? mockAgents.find((a) => a.id === id);

  if (!agentBase) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">Agent not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard/agents")} className="mt-4">
          Back to Agents
        </Button>
      </div>
    );
  }

  const agent = {
    ...agentBase,
    firstName: agentDetail?.firstName,
    middleName: agentDetail?.middleName,
    lastName: agentDetail?.lastName,
    phone: agentDetail?.phone ?? (agentBase as { phone?: string }).phone,
    dob: agentDetail?.dob,
    joinedAt: agentDetail?.joinedAt ?? (agentBase as { joinedAt?: string }).joinedAt,
    userId: agentDetail?.userId ?? `USR-${agentBase.id.padStart(3, "0")}-9JA`,
    agentTier: agentDetail?.agentTier ?? "—",
    kycStatus: agentDetail?.kycStatus ?? "Verified",
    accountStatus: agentDetail?.accountStatus ?? "Active",
    kycIdUrl: agentDetail?.kycIdUrl,
    address: agentDetail?.address,
    weeklyVolume: agentDetail?.weeklyVolume ?? 0,
    weeklyTransactions: agentDetail?.weeklyTransactions ?? 0,
    totalReferredUsers: agentDetail?.totalReferredUsers ?? 0,
    verifiedUsers: agentDetail?.verifiedUsers ?? 0,
    earningsThisMonth: agentDetail?.earningsThisMonth ?? 0,
    customerDetails: agentDetail?.customerDetails ?? [],
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/agents")} className="mb-4">
        Back to Agents
      </Button>

      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agent Details</h2>
        <p className="text-muted-foreground">{agent.userId}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">First Name</p>
                <p>{agent.firstName ?? "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Middle Name</p>
                <p>{agent.middleName ?? "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                <p>{agent.lastName ?? "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{agent.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p>{agent.phone ?? "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p>{agent.dob ?? "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p>{agent.userId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Agent Tier</p>
                <p>{agent.agentTier}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">KYC Status</p>
                <div className="mt-1">
                  <StatusBadge status={agent.kycStatus} variant="userKyc" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <div className="mt-1">
                  <StatusBadge status={agent.accountStatus} variant="account" />
                </div>
              </div>
              {agent.kycIdUrl && (
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">KYC ID Document</p>
                  <a
                    href={agent.kycIdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    View Document <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Residential Address</p>
              <p className="mt-1">{agent.address ?? "—"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projected Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weekly Volume</p>
                <p className="text-xl font-semibold">₦{(agent.weeklyVolume ?? 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weekly Transactions</p>
                <p className="text-xl font-semibold">{agent.weeklyTransactions ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Referred Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{agent.totalReferredUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{agent.verifiedUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Earnings (₦)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₦{agent.lifetimeEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Earnings This Month (₦)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₦{agent.earningsThisMonth.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {agent.customerDetails.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No customer details found for this agent.</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Identifier</TableHead>
                    <TableHead className="text-right">Transaction Volume (CAD)</TableHead>
                    <TableHead className="text-right">Commission Earned (₦)</TableHead>
                    <TableHead className="hidden text-right md:table-cell">Date / Period</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agent.customerDetails.map((customer: { id: string; customerName: string; transactionVolume: number; commissionEarned: number; date: string }) => (
                    <TableRow key={customer.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{customer.customerName}</TableCell>
                      <TableCell className="text-right">₦{customer.transactionVolume.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₦{customer.commissionEarned.toLocaleString()}</TableCell>
                      <TableCell className="hidden text-right md:table-cell">{customer.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
