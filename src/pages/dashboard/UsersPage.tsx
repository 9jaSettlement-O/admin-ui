import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UsersPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage individual user accounts</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User list</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            User listing and filters will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
