import { useParams, useNavigate } from "react-router-dom";
import { CreditCard, Building, Mail, Phone, Wallet } from "lucide-react";
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
import { StatusBadge } from "@/components/shared/status-badge";
import { shouldUseMockService } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { mockDataService } from "@/services/mock";
import { mockVirtualAccountDetails } from "@/_data/mock-data";

const mockTransactionHistory = [
  { id: "1", reference: "VA123456", dateTime: "2023-12-15 14:30:00", currency: "USD", senderSource: "john.customer@email.com", fee: "2.50", status: "Settled" },
  { id: "2", reference: "VA123457", dateTime: "2023-12-15 12:15:00", currency: "USD", senderSource: "jane.buyer@email.com", fee: "5.00", status: "Received" },
  { id: "3", reference: "VA123458", dateTime: "2023-12-15 10:45:00", currency: "USD", senderSource: "mike.client@email.com", fee: "1.75", status: "Pending" },
];

export function VirtualAccountDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();

  const { data: accountFromQuery } = useQuery({
    queryKey: ["virtualAccountDetail", id],
    queryFn: () => mockDataService.getVirtualAccountDetailById(id ?? ""),
    enabled: useMock && !!id,
  });

  const account = accountFromQuery ?? mockVirtualAccountDetails.find((a) => a.id === id);

  if (!account) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">Virtual account not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard/virtual-accounts")} className="mt-4">
          Back to Virtual Accounts
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/virtual-accounts")}>
            Back to Virtual Accounts
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Virtual Account Details</h1>
            <p className="text-muted-foreground">Account ID: {account.id}</p>
          </div>
        </div>
        <StatusBadge status={account.status} variant="account" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Name</p>
              <p className="text-sm font-semibold">{account.accountName}</p>
            </div>
            {account.ownedBy && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Owned by</p>
                <p className="text-sm">{account.ownedBy}</p>
              </div>
            )}
            {account.dateCreated && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date/Time Created</p>
                <p className="text-sm">{account.dateCreated}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <StatusBadge status={account.status} variant="account" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Contact & Banking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {account.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{account.email}</p>
                </div>
              </div>
            )}
            {account.phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p className="text-sm">{account.phoneNumber}</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bank</p>
              <p className="text-sm">{account.bankName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Number</p>
              <p className="text-sm font-mono">{account.accountNumber}</p>
            </div>
            {account.settlementWallet && (
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Settlement Wallet</p>
                  <p className="text-sm font-mono break-all">{account.settlementWallet}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <p className="text-sm text-muted-foreground">All transactions processed through this virtual account</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Sender/Source</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactionHistory.map((t) => (
                  <TableRow key={t.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium font-mono">{t.reference}</TableCell>
                    <TableCell>{t.dateTime}</TableCell>
                    <TableCell>{t.currency}</TableCell>
                    <TableCell>{t.senderSource}</TableCell>
                    <TableCell>${t.fee}</TableCell>
                    <TableCell>
                      <StatusBadge status={t.status} variant="transaction" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
