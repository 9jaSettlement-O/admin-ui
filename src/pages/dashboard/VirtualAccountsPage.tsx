import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VirtualAccountsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Virtual Accounts</h2>
        <p className="text-muted-foreground">Manage virtual account allocations</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Virtual accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Virtual account listing will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
