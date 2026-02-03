import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoutesManagement } from "@/components/shared/routes-management";
import { RatesManagement } from "@/components/shared/rates-management";

export function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="country-config">Country Config</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="kyc-notifications">KYC Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new KYC submissions</p>
                  </div>
                  <Switch id="kyc-notifications" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transaction-notifications">Transaction Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for large transactions</p>
                  </div>
                  <Switch id="transaction-notifications" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-notifications">User Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new user registrations</p>
                  </div>
                  <Switch id="user-notifications" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <RoutesManagement />
        </TabsContent>

        <TabsContent value="country-config" className="space-y-4">
          <RatesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
