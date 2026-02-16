import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { StatusBadge } from "@/components/shared/status-badge";
import { usePageHeaderActions } from "@/contexts/page-header-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { shouldUseMockService } from "@/lib/config";
import { useTransactions } from "@/hooks/use-mock-data";
import { mockTransactions } from "@/_data/mock-data";

type TxStat = { name: string; value: string } | { name: string; value: string; change: string; direction: "up" | "down" };

export type TransactionPeriod = "today" | "week" | "month" | "year" | "custom";

const PERIOD_LABELS: Record<TransactionPeriod, string> = {
  today: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
  custom: "Custom range",
};

function isDateInPeriod(
  dateStr: string,
  period: TransactionPeriod,
  customStart?: string,
  customEnd?: string,
  refDate?: Date
): boolean {
  const date = new Date(dateStr);
  const now = refDate ?? new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  switch (period) {
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

const txStats: TxStat[] = [
  { name: "Total Transactions", value: "45,678" },
  { name: "Completed Transactions", value: "42,345" },
  { name: "Pending Transactions", value: "2,890" },
  { name: "Failed Transactions", value: "443" },
  { name: "Total Profit", value: "$28,542.50", change: "+12.5% from last period", direction: "up" },
];

export function TransactionsPage() {
  const useMock = shouldUseMockService();
  const { data: transactionsFromQuery, isLoading } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [period, setPeriod] = useState<TransactionPeriod>("month");
  const [showCustomRangeDialog, setShowCustomRangeDialog] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const setHeaderActions = usePageHeaderActions();

  const handlePeriodChange = (value: string) => {
    if (value === "custom") {
      setShowCustomRangeDialog(true);
    } else {
      setPeriod(value as TransactionPeriod);
    }
  };

  useEffect(() => {
    setHeaderActions(
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
    );
    return () => setHeaderActions(null);
  }, [period, setHeaderActions]);

  const handleApplyCustomRange = () => {
    if (customStart && customEnd) {
      setPeriod("custom");
      setShowCustomRangeDialog(false);
    }
  };

  const transactions = useMock ? (transactionsFromQuery ?? mockTransactions) : mockTransactions;
  const txList = Array.isArray(transactions) ? transactions : [];
  const refDate = txList.length
    ? new Date(Math.max(...txList.map((t) => new Date(t.date).getTime())))
    : undefined;
  const filteredTransactions = txList.filter((t) => {
    const matchesSearch =
      searchTerm === "" ||
      t.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.includes(searchTerm);
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPeriod = isDateInPeriod(t.date, period, customStart, customEnd, refDate);
    return matchesSearch && matchesType && matchesStatus && matchesPeriod;
  });

  const TRANSACTION_TYPES = ["Deposit", "Withdrawal", "Transfer"];
  const statuses = [...new Set(txList.map((t) => t.status))];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">CAD ↔ NGN transactions (primary). V2 multicurrency support.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {txStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              {"change" in stat && stat.change && (
                stat.direction === "down" ? (
                  <TrendingDown className="h-4 w-4 shrink-0 text-red-600" />
                ) : (
                  <TrendingUp className="h-4 w-4 shrink-0 text-green-600" />
                )
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {"change" in stat && stat.change && (
                <p className={`mt-1 text-sm font-medium ${stat.direction === "down" ? "text-red-600" : "text-green-600"}`}>
                  {stat.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center space-x-2 md:w-2/5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-9 w-full md:w-[180px]">
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {TRANSACTION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 rounded-md border">
            {isLoading && useMock ? (
              <TableSkeleton rows={8} columns={8} />
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>User Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Source (CAD)</TableHead>
                  <TableHead>Destination (NGN)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">TX{tx.id}</TableCell>
                      <TableCell>{tx.userEmail}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.sourceAmount}</TableCell>
                      <TableCell>{tx.destinationAmount}</TableCell>
                      <TableCell>
                        <StatusBadge status={tx.status} variant="transaction" />
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/transactions/${tx.id}`}>View</Link>
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

      <Dialog open={showCustomRangeDialog} onOpenChange={setShowCustomRangeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Date Range</DialogTitle>
            <DialogDescription>Select a start and end date to filter transactions</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tx-start-date">Start Date</Label>
              <Input
                id="tx-start-date"
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tx-end-date">End Date</Label>
              <Input
                id="tx-end-date"
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
