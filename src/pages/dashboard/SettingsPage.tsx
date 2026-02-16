import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old-password">Old Password</Label>
              <Input id="old-password" type="password" placeholder="Enter your current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter your new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input id="confirm-new-password" type="password" placeholder="Confirm your new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp-2fa">2FA OTP</Label>
              <Input id="otp-2fa" type="text" placeholder="Enter 6-digit OTP" maxLength={6} />
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require OTP for login</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Change Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
