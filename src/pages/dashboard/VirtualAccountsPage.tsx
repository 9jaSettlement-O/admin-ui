import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, CreditCard, CheckCircle, Clock, Store } from "lucide-react";
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
import { shouldUseMockService } from "@/lib/config";
import { useVirtualAccounts } from "@/hooks/use-mock-data";
import { mockVirtualAccounts } from "@/_data/mock-data";

const vaStats = [
  { name: "Total Virtual Accounts", value: "1,523", icon: CreditCard },
  { name: "Active Accounts", value: "1,412", icon: CheckCircle },
  { name: "Expired Accounts", value: "89", icon: Clock },
  { name: "Total Merchants", value: "22", icon: Store },
];

export function VirtualAccountsPage() {
  const useMock = shouldUseMockService();
  const { data: accountsFromQuery, isLoading } = useVirtualAccounts();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const accounts = useMock ? (accountsFromQuery ?? mockVirtualAccounts) : mockVirtualAccounts;
  const filteredAccounts = (Array.isArray(accounts) ? accounts : []).filter((a) => {
    const matchesSearch =
      searchTerm === "" ||
      a.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.accountNumber.includes(searchTerm) ||
      (a.bankName ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = [...new Set((Array.isArray(accounts) ? accounts : []).map((a) => a.status))];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Virtual Accounts</h2>
          <p className="text-muted-foreground">NGN virtual accounts for CAD remittance payouts</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {vaStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Virtual Account List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center space-x-2 md:w-2/5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by account name, number, or bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 rounded-md border">
            {isLoading && useMock ? (
              <div className="flex h-24 items-center justify-center text-muted-foreground">
                Loading...
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account Name</TableHead>
                    <TableHead>Account Number</TableHead>
                    <TableHead>Bank Name</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No virtual accounts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAccounts.map((acc) => (
                      <TableRow key={acc.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{acc.accountName}</TableCell>
                        <TableCell>{acc.accountNumber}</TableCell>
                        <TableCell>{acc.bankName}</TableCell>
                        <TableCell>{acc.currency}</TableCell>
                        <TableCell>
                          <StatusBadge
                            status={acc.status}
                            variant={acc.status === "Active" ? "account" : "transaction"}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/dashboard/virtual-accounts/${acc.id}`}>View</Link>
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
    </div>
  );
}
