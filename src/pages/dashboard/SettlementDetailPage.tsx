import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DollarSign, Clock, CheckCircle, Building } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/shared/status-badge";
import { shouldUseMockService } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { mockDataService } from "@/services/mock";
import { mockSettlements } from "@/_data/mock-data";

const mockCollectionBreakdown = [
  { id: "1", reference: "COL123456", dateTime: "2023-12-15 14:30:00", collectedAmount: "5,000.00", settlementAmount: "3.03", fee: "25.00", status: "Collected" },
  { id: "2", reference: "COL123457", dateTime: "2023-12-15 12:15:00", collectedAmount: "8,500.00", settlementAmount: "5.15", fee: "42.50", status: "Collected" },
];

export function SettlementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: settlementFromQuery } = useQuery({
    queryKey: ["settlementDetail", id],
    queryFn: () => mockDataService.getSettlementById(id ?? ""),
    enabled: useMock && !!id,
  });

  const baseSettlement = settlementFromQuery ?? mockSettlements.find((s) => s.id === id);
  const status = currentStatus ?? baseSettlement?.status ?? "Pending";

  const handleCompleteSettlement = () => setShowConfirmDialog(true);
  const confirmCompleteSettlement = () => {
    setCurrentStatus("Completed");
    setShowConfirmDialog(false);
  };

  const canComplete = status === "Pending" || status === "Processing";

  if (!baseSettlement) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">Settlement not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard/settlements")} className="mt-4">
          Back to Settlements
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settlements")}>
            Back to Settlements
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settlement Details</h1>
            <p className="text-muted-foreground">Reference: {baseSettlement.reference}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={status} variant="transaction" />
          {canComplete && (
            <Button onClick={handleCompleteSettlement}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Settlement Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reference</p>
              <p className="text-sm font-mono font-semibold">{baseSettlement.reference}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-sm">{baseSettlement.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Beneficiary</p>
              <p className="text-sm">{baseSettlement.beneficiary}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <StatusBadge status={status} variant="transaction" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Amount</p>
              <p className="text-lg font-bold">{baseSettlement.amount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Collection Breakdown
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            All collections made during the settlement window ({mockCollectionBreakdown.length} transactions)
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Collected Amount</TableHead>
                  <TableHead>Settlement Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCollectionBreakdown.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium font-mono">{c.reference}</TableCell>
                    <TableCell>{c.dateTime}</TableCell>
                    <TableCell className="font-semibold">₦{c.collectedAmount}</TableCell>
                    <TableCell className="font-semibold">{c.settlementAmount}</TableCell>
                    <TableCell>₦{c.fee}</TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} variant="transaction" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Settlement</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this settlement as completed? This action will update the status.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Reference:</span> {baseSettlement.reference}
            </p>
            <p className="text-sm">
              <span className="font-medium">Beneficiary:</span> {baseSettlement.beneficiary}
            </p>
            <p className="text-sm">
              <span className="font-medium">Amount:</span> {baseSettlement.amount}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCompleteSettlement}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
