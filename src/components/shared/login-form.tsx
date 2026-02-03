import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shouldUseMockService } from "@/lib/config";
import { mockLogin } from "@/services/mock";
import { api } from "@/api";
import storage from "@/utils/storage.util";

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const useMock = shouldUseMockService();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = useMock
        ? await mockLogin({ email, password })
        : await api.auth.login({ email, password });

      const token =
        res.token ?? (res.data as { token?: string } | null)?.token;
      const user = (res.data as { user?: { id?: string; email?: string; type?: string } } | null)?.user;

      if (!res.error && token && (user || res.data)) {
        const uid = user?.id ?? (res.data as { id?: string })?.id ?? "admin";
        const role = user?.type ?? (res.data as { type?: string })?.type ?? "admin";
        const userEmail = user?.email ?? (res.data as { email?: string })?.email ?? email;
        storage.storeAuth(token, String(uid), role, userEmail);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      if (useMock) {
        setError("Login failed. Please try again.");
      } else {
        const msg = err instanceof Error ? err.message : "Invalid credentials";
        setError(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@9jasettlement.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>
        {useMock && (
          <p className="text-xs text-muted-foreground">
            Mock mode: any email and password will work.
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="text-center text-sm">
        <p>
          Need to create an account?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Create Admin Account
          </Link>
        </p>
      </div>
    </form>
  );
}
