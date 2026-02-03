import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { shouldUseMockService } from "@/lib/config";
import { useUsers } from "@/hooks/use-mock-data";
import { useDebounce } from "@/hooks/use-debounce";
import { mockUsers } from "@/_data/mock-data";

type UserPeriod = "today" | "week" | "month" | "year" | "custom";

const PERIOD_LABELS: Record<UserPeriod, string> = {
  today: "Today",
  week: "This week",
  month: "This month",
  year: "This year",
  custom: "Custom range",
};

export function UsersPage() {
  const useMock = shouldUseMockService();
  const { data: usersFromQuery, isLoading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [kycFilter, setKycFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [period, setPeriod] = useState<UserPeriod>("month");
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const users = useMock ? (usersFromQuery ?? mockUsers) : mockUsers;
  const userList = Array.isArray(users) ? users : [];

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      debouncedSearch === "" ||
      user.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.lastName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (user.phone ?? "").includes(debouncedSearch);
    const matchesKyc = kycFilter === "all" || user.kycStatus === kycFilter;
    const matchesCountry = countryFilter === "all" || user.country === countryFilter;
    return matchesSearch && matchesKyc && matchesCountry;
  });

  const totalUsers = userList.length;
  const businessUsers = userList.filter((u) => (u as { userType?: string }).userType === "business").length;
  const individualUsers = userList.filter((u) => (u as { userType?: string }).userType === "individual").length;
  const agentUsers = userList.filter((u) => (u as { userType?: string }).userType === "agent").length;
  const verifiedUsers = userList.filter((u) => u.kycStatus === "Tier 1 Verified" || u.kycStatus === "Tier 2 Verified").length;
  const unverifiedUsers = userList.filter((u) => u.kycStatus === "Unverified" || u.kycStatus === "Awaiting KYC Review").length;

  const userStats = [
    { name: "Total Users", value: String(totalUsers) },
    { name: "Business Users", value: String(businessUsers) },
    { name: "Individual Users", value: String(individualUsers) },
    { name: "Agent Users", value: String(agentUsers) },
    { name: "Verified Users", value: String(verifiedUsers) },
    { name: "Unverified Users", value: String(unverifiedUsers) },
  ];

  const SUPPORTED_COUNTRIES = [
    "Canada",
    "United States",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
  ];
  const userCountries = [...new Set(userList.map((u) => u.country).filter(Boolean))];
  const countries = [...new Set([...SUPPORTED_COUNTRIES, ...userCountries])].sort();
  const kycStatuses = [...new Set(userList.map((u) => u.kycStatus))];

  const handlePeriodChange = (value: string) => {
    if (value === "custom") setShowCustomRange(true);
    else setPeriod(value as UserPeriod);
  };

  const handleApplyCustomRange = () => {
    if (customStart && customEnd) {
      setPeriod("custom");
      setShowCustomRange(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage users onboarded via 9JA Settlement — Nigerians in Canada</p>
        </div>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">{PERIOD_LABELS.today}</SelectItem>
            <SelectItem value="week">{PERIOD_LABELS.week}</SelectItem>
            <SelectItem value="month">{PERIOD_LABELS.month}</SelectItem>
            <SelectItem value="year">{PERIOD_LABELS.year}</SelectItem>
            <SelectItem value="custom">{PERIOD_LABELS.custom}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {userStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center space-x-2 md:w-2/5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <Select value={kycFilter} onValueChange={setKycFilter}>
                <SelectTrigger className="h-9 w-full md:w-[180px]">
                  <SelectValue placeholder="KYC Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {kycStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="h-9 w-full md:w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone Number</TableHead>
                    <TableHead className="hidden md:table-cell">Country</TableHead>
                    <TableHead>KYC Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.country}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.kycStatus === "Tier 2 Verified"
                                ? "bg-green-100 text-green-800"
                                : user.kycStatus === "Tier 1 Verified"
                                  ? "bg-blue-100 text-blue-800"
                                  : user.kycStatus === "Awaiting KYC Review"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.kycStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/dashboard/users/${user.id}`}>Manage</Link>
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

      <Dialog open={showCustomRange} onOpenChange={setShowCustomRange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Date Range</DialogTitle>
            <DialogDescription>Select start and end date for summary data</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user-start">Start Date</Label>
              <Input id="user-start" type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-end">End Date</Label>
              <Input id="user-end" type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomRange(false)}>Cancel</Button>
            <Button onClick={handleApplyCustomRange} disabled={!customStart || !customEnd}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
