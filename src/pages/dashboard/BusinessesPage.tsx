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
import { StatusBadge } from "@/components/shared/status-badge";
import { shouldUseMockService } from "@/lib/config";
import { useBusinesses } from "@/hooks/use-mock-data";
import { useDebounce } from "@/hooks/use-debounce";
import { mockBusinesses } from "@/_data/mock-data";

export function BusinessesPage() {
  const useMock = shouldUseMockService();
  const { data: businessesFromQuery, isLoading } = useBusinesses();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [kybFilter, setKybFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const businesses = useMock ? (businessesFromQuery ?? mockBusinesses) : mockBusinesses;
  const businessList = Array.isArray(businesses) ? businesses : [];
  const totalBusinesses = businessList.length;
  const verifiedBusinesses = businessList.filter((b) => b.kybStatus?.includes("Verified")).length;
  const unverifiedBusinesses = businessList.filter((b) => !b.kybStatus?.includes("Verified")).length;

  const businessStats = [
    { name: "Total Businesses", value: String(totalBusinesses) },
    { name: "Verified Businesses", value: String(verifiedBusinesses) },
    { name: "Unverified Businesses", value: String(unverifiedBusinesses) },
  ];

  const filteredBusinesses = businessList.filter((b) => {
    const matchesSearch =
      debouncedSearch === "" ||
      b.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (b.phone ?? "").includes(debouncedSearch);
    const matchesKyb = kybFilter === "all" || b.kybStatus === kybFilter;
    const matchesCountry = countryFilter === "all" || b.country === countryFilter;
    return matchesSearch && matchesKyb && matchesCountry;
  });

  const SUPPORTED_COUNTRIES = [
    "Uganda",
    "South Africa",
    "Democratic Republic of Congo",
  ];
  const businessCountries = [...new Set(businessList.map((b) => b.country).filter(Boolean))];
  const countries = [...new Set([...SUPPORTED_COUNTRIES, ...businessCountries])].sort();
  const kybStatuses = [...new Set(businessList.map((b) => b.kybStatus))];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Businesses</h2>
          <p className="text-muted-foreground">Business accounts for CAD ↔ NGN remittance (Nigerian diaspora)</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {businessStats.map((stat) => (
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
          <CardTitle>Business Management</CardTitle>
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
              <Select value={kybFilter} onValueChange={setKybFilter}>
                <SelectTrigger className="h-9 w-full md:w-[180px]">
                  <SelectValue placeholder="KYB Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {kybStatuses.map((status) => (
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
                    <TableHead>Business Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone Number</TableHead>
                    <TableHead className="hidden md:table-cell">Country</TableHead>
                    <TableHead>KYB Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No businesses found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBusinesses.map((business) => (
                      <TableRow key={business.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{business.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{business.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">{business.country}</TableCell>
                        <TableCell>
                          <StatusBadge status={business.kybStatus} variant="kyb" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/dashboard/businesses/${business.id}`}>Manage</Link>
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
