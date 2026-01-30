import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AgentsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
        <p className="text-muted-foreground">Manage agency partners and commissions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Agent list</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Agent listing and agency metrics will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
