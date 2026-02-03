import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { mockDataService } from "@/services/mock";
import { useQuery } from "@tanstack/react-query";
import { mockUserDetails } from "@/_data/mock-data";
import type { MockUserDetail } from "@/_data/mock-data";

const mockActivityLog = [
  { time: "2023-05-22 14:30:45", action: "User registered an account" },
  { time: "2023-05-22 14:35:12", action: "Email verification completed" },
  { time: "2023-05-22 15:10:33", action: "Phone verification completed" },
  { time: "2023-05-23 09:45:21", action: "KYC documents uploaded" },
  { time: "2023-05-23 10:15:08", action: "KYC review requested" },
];

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);
  const [showApproveKycDialog, setShowApproveKycDialog] = useState(false);

  const { data: userFromQuery } = useQuery({
    queryKey: ["userDetail", id],
    queryFn: () => mockDataService.getUserDetailById(id ?? ""),
    enabled: useMock && !!id,
  });

  const baseUser = userFromQuery ?? mockUserDetails.find((u) => u.id === id);
  const user: MockUserDetail | undefined = baseUser
    ? {
        ...baseUser,
        kycStatus: kycStatus ?? baseUser.kycStatus,
        accountStatus: accountStatus ?? baseUser.accountStatus ?? "Active",
      }
    : undefined;

  const handleApproveKYC = () => {
    setKycStatus("Tier 2 Verified");
    setShowApproveKycDialog(false);
  };
  const handleBlockAccount = () => setAccountStatus("Blocked");
  const handleUnblockAccount = () => setAccountStatus("Active");

  if (!user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">User not found.</p>
        <Button variant="outline" onClick={() => navigate("/dashboard/users")} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
          <p className="text-muted-foreground">ID: USR{user.id.padStart(6, "0")}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/dashboard/users")}>
          Back to Users
        </Button>
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
                <p>{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                <p>{user.lastName}</p>
              </div>
              {user.middleName && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Middle Name</p>
                  <p>{user.middleName}</p>
                </div>
              )}
              {user.dob && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <p>{user.dob}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p>{user.phone ?? "—"}</p>
              </div>
            </div>
            {user.address && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Residential Address</p>
                <p>{user.address}</p>
              </div>
            )}
            {user.kycIdUrl && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">KYC ID</p>
                <a
                  href={user.kycIdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  View in Sumsub <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">KYC Status</p>
                <div className="mt-1">
                  <StatusBadge status={user.kycStatus} variant="kyc" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <div className="mt-1">
                  <StatusBadge status={user.accountStatus ?? "Active"} variant="account" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              {(user.kycStatus === "Awaiting KYC Review" || user.kycStatus === "PendingReview") && (
                <>
                  <AlertDialog open={showApproveKycDialog} onOpenChange={setShowApproveKycDialog}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Approve KYC
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Approve Tier 2 KYC</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to approve this user&apos;s Tier 2 KYC? This will grant them full access.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleApproveKYC}>Approve KYC</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}

              {(user.accountStatus ?? "Active") === "Active" ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <X className="mr-2 h-4 w-4" /> Block Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Block User Account</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to block this user account? The user will not be able
                        to access their account until it is unblocked.
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
                  Unblock Account
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="py-8 text-center text-muted-foreground">
                No transactions found for this user.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivityLog.map((entry, i) => (
                  <div
                    key={i}
                    className={i < mockActivityLog.length - 1 ? "border-b pb-4" : ""}
                  >
                    <p className="text-sm text-muted-foreground">{entry.time}</p>
                    <p>{entry.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
