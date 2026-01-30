import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Businesses</h2>
        <p className="text-muted-foreground">Manage business accounts and KYB</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Business list</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Business listing and KYB status will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
