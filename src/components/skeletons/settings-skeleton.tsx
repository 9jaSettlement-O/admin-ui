import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SettingsSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-56" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <div className="flex items-center justify-between py-4">
              <div>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-1 h-3 w-36" />
              </div>
              <Skeleton className="h-6 w-11" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
