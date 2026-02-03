import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "@/components/shared/table-skeleton";

interface ListPageSkeletonProps {
  /** Number of metric cards in the top row (default: 6 for Users, 3 for Businesses, 5 for Transactions, 4 for Agents) */
  metricCount?: number;
  /** Number of table columns (default: 6) */
  tableColumns?: number;
  /** Number of table rows (default: 5) */
  tableRows?: number;
}

export function ListPageSkeleton({
  metricCount = 6,
  tableColumns = 6,
  tableRows = 5,
}: ListPageSkeletonProps) {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-32" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-[160px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: Math.min(metricCount, 6) }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-9 w-full md:w-2/5" />
            <div className="flex gap-4">
              <Skeleton className="h-9 w-[180px]" />
              <Skeleton className="h-9 w-[180px]" />
            </div>
          </div>
          <div className="mt-6 rounded-md border">
            <TableSkeleton rows={tableRows} columns={tableColumns} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
