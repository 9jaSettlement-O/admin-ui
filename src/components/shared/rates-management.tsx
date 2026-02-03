import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export function RatesManagement() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Country Currency Configuration</CardTitle>
              <CardDescription>
                Canada/NGN primary. Multicurrency pairs with payin/payout partners
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
