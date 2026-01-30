import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TransactionsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">View and manage platform transactions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction list</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Transaction table and filters will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
