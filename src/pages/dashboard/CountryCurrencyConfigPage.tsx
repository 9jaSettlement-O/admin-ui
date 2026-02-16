import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { mockCountryCurrencies } from "@/_data/mock-data";

export function CountryCurrencyConfigPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Country & Currency Config</h2>
        <p className="text-muted-foreground">Canada/NGN primary. V2 multicurrency: KES, GHS, etc.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Country Currency Configuration</CardTitle>
              <CardDescription>
                Manage country-currency pairs with payin and payout partners
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Country Currency
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Payin Partner</TableHead>
                  <TableHead>Payout Partner</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCountryCurrencies.map((cc) => (
                  <TableRow key={cc.id}>
                    <TableCell className="font-medium">{cc.country}</TableCell>
                    <TableCell>{cc.currency}</TableCell>
                    <TableCell>{cc.payinPartner}</TableCell>
                    <TableCell>{cc.payoutPartner}</TableCell>
                    <TableCell>
                      <Badge variant={cc.status === "Active" ? "default" : "secondary"}>
                        {cc.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
