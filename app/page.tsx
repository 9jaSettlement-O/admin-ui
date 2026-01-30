import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-2xl font-semibold">9jaSettlement Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
