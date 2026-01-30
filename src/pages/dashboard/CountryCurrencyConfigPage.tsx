import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CountryCurrencyConfigPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Country & Currency Config</h2>
        <p className="text-muted-foreground">Configure supported countries and currencies</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Country and currency settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
