import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shouldUseMockService } from "@/lib/config";
import { mockDataService } from "@/services/mock";
import { useQuery } from "@tanstack/react-query";
import { mockUsers } from "@/_data/mock-data";

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const useMock = shouldUseMockService();

  const { data: userFromQuery } = useQuery({
    queryKey: ["user", id],
    queryFn: () => mockDataService.getUserById(id ?? ""),
    enabled: useMock && !!id,
  });

  const user = useMock
    ? (userFromQuery ?? mockUsers.find((u) => u.id === id))
    : mockUsers.find((u) => u.id === id);

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
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p>{user.phone ?? "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Country</p>
                <p>{user.country ?? "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">KYC Status</p>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
