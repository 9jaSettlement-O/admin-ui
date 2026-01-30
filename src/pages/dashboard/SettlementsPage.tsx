import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SettlementsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settlements</h2>
        <p className="text-muted-foreground">Settlement runs and status</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Settlement list</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Settlement history and actions will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
