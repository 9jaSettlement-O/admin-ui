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
import { Plus, Settings, Eye } from "lucide-react";
import { mockRoutes } from "@/_data/mock-data";

export function RoutesManagement() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Routes Management</CardTitle>
            <CardDescription>
              CAD ↔ NGN primary. Multicurrency routes: send/swap, partners, fees, margins
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Route
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Currency</TableHead>
                <TableHead>Destination Currency</TableHead>
                <TableHead>Send</TableHead>
                <TableHead>Swap</TableHead>
                <TableHead>Payin Partner</TableHead>
                <TableHead>Payout Partner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.sourceCurrency}</TableCell>
                  <TableCell>{route.destinationCurrency}</TableCell>
                  <TableCell>
                    <Badge variant={route.sendEnabled ? "default" : "secondary"}>
                      {route.sendEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={route.swapEnabled ? "default" : "secondary"}>
                      {route.swapEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>{route.payinPartner}</TableCell>
                  <TableCell>{route.payoutPartner}</TableCell>
                  <TableCell>
                    <Badge variant={route.status === "Published" ? "default" : "secondary"}>
                      {route.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
