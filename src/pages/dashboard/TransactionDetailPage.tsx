import { useParams, useNavigate } from "react-router-dom";
import { User, CreditCard, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { shouldUseMockService } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { mockDataService } from "@/services/mock";
import { mockTransactions } from "@/_data/mock-data";

export function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();

  const { data: txFromQuery } = useQuery({
    queryKey: ["transactionDetail", id],
    queryFn: () => mockDataService.getTransactionById(id ?? ""),
    enabled: useMock && !!id,
  });

  const tx = txFromQuery ?? mockTransactions.find((t) => t.id === id);

  if (!tx) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">Transaction not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard/transactions")} className="mt-4">
          Back to Transactions
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/transactions")}>
            Back to Transactions
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction Details</h1>
            <p className="text-muted-foreground">Reference: TX{tx.id}</p>
          </div>
        </div>
        <StatusBadge status={tx.status} variant="transaction" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-sm">{tx.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">User Email</p>
              <p className="text-sm">{tx.userEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Source (CAD)</p>
              <p className="text-sm font-semibold">{tx.sourceAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Destination (NGN)</p>
              <p className="text-sm font-semibold">{tx.destinationAmount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Sender Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{tx.userEmail}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Transaction Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">{tx.type}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Transaction Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Source (CAD)</p>
              <p className="text-sm font-semibold">{tx.sourceAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Destination (NGN)</p>
              <p className="text-sm font-semibold">{tx.destinationAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <StatusBadge status={tx.status} variant="transaction" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
