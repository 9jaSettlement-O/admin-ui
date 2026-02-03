import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <p className="text-muted-foreground">{agent.email}</p>
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
                  {agent.customerDetails.map((customer) => (
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
