import { useState } from "react";
import { Search, Plus, Eye, Trash2, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockAdmins, mockAdminActions, mockLoginSessions } from "@/_data/mock-data";

export function SuperAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPermission, setNewAdminPermission] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAdmins = mockAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = () => {
    setIsAddDialogOpen(false);
    setNewAdminName("");
    setNewAdminEmail("");
    setNewAdminPermission("");
  };

  const getPermissionLevelColor = (level: number) => {
    if (level >= 8) return "bg-red-100 text-red-800";
    if (level >= 6) return "bg-orange-100 text-orange-800";
    if (level >= 4) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getPermissionLevelText = (level: number) => {
    if (level >= 8) return "High Access";
    if (level >= 6) return "Medium Access";
    if (level >= 4) return "Limited Access";
    return "Basic Access";
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Super Admin</h2>
          <p className="text-muted-foreground">Manage admin users and monitor their activities</p>
        </div>
      </div>

      <Tabs defaultValue="admins" className="space-y-4">
        <TabsList>
          <TabsTrigger value="admins">Admin Management</TabsTrigger>
          <TabsTrigger value="actions">Admin Actions</TabsTrigger>
          <TabsTrigger value="sessions">Login Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Admin Users</CardTitle>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Admin</DialogTitle>
                      <DialogDescription>
                        Create a new admin user with specified permission level
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-name">Full Name</Label>
                        <Input
                          id="admin-name"
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          placeholder="Enter admin's full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="Enter admin's email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="permission-level">Permission Level</Label>
                        <Select value={newAdminPermission} onValueChange={setNewAdminPermission}>
                          <SelectTrigger id="permission-level">
                            <SelectValue placeholder="Select permission level" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                              <SelectItem key={level} value={level.toString()}>
                                Level {level} - {level >= 8 ? "High" : level >= 6 ? "Medium" : level >= 4 ? "Limited" : "Basic"} Access
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddAdmin}>Add Admin</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Permission Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <Badge className={getPermissionLevelColor(admin.permissionLevel)}>
                            Level {admin.permissionLevel} - {getPermissionLevelText(admin.permissionLevel)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={admin.status === "Active" ? "default" : "secondary"}>
                            {admin.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{admin.lastLogin}</TableCell>
                        <TableCell>{admin.actionsCount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this admin? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Admin Actions Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAdminActions.map((action) => (
                      <TableRow key={action.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{action.adminName}</p>
                            <p className="text-sm text-muted-foreground">{action.adminEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{action.action}</TableCell>
                        <TableCell className="font-mono text-sm">{action.target}</TableCell>
                        <TableCell>{action.timestamp}</TableCell>
                        <TableCell className="font-mono text-sm">{action.ipAddress}</TableCell>
                        <TableCell>
                          <Badge variant={action.result === "Success" ? "default" : "destructive"}>
                            {action.result}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Login Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Login Time</TableHead>
                      <TableHead>Logout Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLoginSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{session.adminName}</p>
                            <p className="text-sm text-muted-foreground">{session.adminEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{session.loginTime}</TableCell>
                        <TableCell>
                          {session.logoutTime === "Active" ? (
                            <Badge variant="default">Active</Badge>
                          ) : (
                            session.logoutTime
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{session.ipAddress}</TableCell>
                        <TableCell>{session.userAgent}</TableCell>
                        <TableCell>{session.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
