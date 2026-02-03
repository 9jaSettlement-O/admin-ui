import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X, Lock, Unlock } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StatusBadge } from "@/components/shared/status-badge";
import { shouldUseMockService } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { mockDataService } from "@/services/mock";
import { mockBusinessDetails } from "@/_data/mock-data";
import type { MockBusinessDetail } from "@/_data/mock-data";

const mockBusinessTransactions = [
  { id: "TXN001", reference: "TXN-2024-001", date: "2024-01-15", amount: "₦500,000.00", currency: "NGN", status: "Completed" },
  { id: "TXN002", reference: "TXN-2024-002", date: "2024-01-16", amount: "₦750,000.00", currency: "NGN", status: "Completed" },
  { id: "TXN003", reference: "TXN-2024-003", date: "2024-01-17", amount: "₦250,000.00", currency: "NGN", status: "Pending" },
];

export function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();
  const [kybStatus, setKybStatus] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  const { data: businessFromQuery } = useQuery({
    queryKey: ["businessDetail", id],
    queryFn: () => mockDataService.getBusinessDetailById(id ?? ""),
    enabled: useMock && !!id,
  });

  const baseBusiness = businessFromQuery ?? mockBusinessDetails.find((b) => b.id === id);
  const business: MockBusinessDetail | undefined = baseBusiness
    ? {
        ...baseBusiness,
        kybStatus: kybStatus ?? baseBusiness.kybStatus,
        accountStatus: accountStatus ?? baseBusiness.accountStatus ?? "Active",
      }
    : undefined;

  const handleApproveKYB = () => setKybStatus("Verified");
  const handleDeclineKYB = () => setKybStatus("Unverified");
  const handleBlockAccount = () => setAccountStatus("Blocked");
  const handleUnblockAccount = () => setAccountStatus("Active");

  if (!business) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">Business not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard/businesses")} className="mt-4">
          Back to Businesses
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Business Details</h2>
          <p className="text-muted-foreground">ID: BUS{business.id.padStart(6, "0")}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/dashboard/businesses")}>
          Back to Businesses
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                <p className="font-medium">{business.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Country</p>
                <p>{business.country}</p>
              </div>
              {business.registrationNumber && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                  <p>{business.registrationNumber}</p>
                </div>
              )}
              {business.businessType && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Business Type</p>
                  <p>{business.businessType}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">KYB Status</p>
              <div className="mt-2">
                <StatusBadge status={business.kybStatus} variant="kyb" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Status</p>
              <div className="mt-2">
                <StatusBadge status={business.accountStatus ?? "Active"} variant="account" />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {business.kybStatus === "Awaiting KYB Review" && (
                <>
                  <Button onClick={handleApproveKYB} className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Approve KYB
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <X className="mr-2 h-4 w-4" /> Decline KYB
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Decline KYB</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to decline the KYB for this business? The business will remain unverified.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeclineKYB}>Decline KYB</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}

              {(business.accountStatus ?? "Active") === "Active" ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Lock className="mr-2 h-4 w-4" /> Block Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Block Business Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to block this business account? The business will not be able to access their account until it is unblocked.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBlockAccount}>Block Account</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button onClick={handleUnblockAccount} className="w-full">
                  <Unlock className="mr-2 h-4 w-4" /> Unblock Account
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {business.owner && (
        <Card>
          <CardHeader>
            <CardTitle>Business Owner Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">First Name</p>
                    <p>{business.owner.firstName}</p>
                  </div>
                  {business.owner.middleName && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Middle Name</p>
                      <p>{business.owner.middleName}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                    <p>{business.owner.lastName}</p>
                  </div>
                  {business.owner.dob && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p>{business.owner.dob}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{business.owner.email}</p>
                  </div>
                  {business.owner.phone && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p>{business.owner.phone}</p>
                    </div>
                  )}
                </div>
                {business.owner.address && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Residential Address</p>
                    <p>{business.owner.address}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Business Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {mockBusinessTransactions.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No transactions found for this business.</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBusinessTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium">{txn.reference}</TableCell>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.amount}</TableCell>
                      <TableCell>{txn.currency}</TableCell>
                      <TableCell>
                        <StatusBadge status={txn.status} variant="transaction" />
                      </TableCell>
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
