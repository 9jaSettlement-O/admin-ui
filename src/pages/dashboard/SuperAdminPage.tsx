import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SuperAdminPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Super Admin</h2>
        <p className="text-muted-foreground">System-wide and privileged operations</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Privileged actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Super admin tools and user/account overrides will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
