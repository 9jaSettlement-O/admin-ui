import type { MouseEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bell, Clock, AlertTriangle, CreditCard, CheckCircle, X } from "lucide-react";

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional custom trigger; defaults to Bell button with badge */
  trigger?: React.ReactNode;
}

interface Notification {
  id: string;
  type: "quote_expiry" | "expired_rate_transaction" | "payment_received";
  timestamp: string;
  read: boolean;
  data: Record<string, string>;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "quote_expiry",
    timestamp: "2 minutes ago",
    read: false,
    data: {
      sourceCurrency: "NGN",
      destinationCurrency: "USDT",
      expiryTime: "10 minutes",
    },
  },
  {
    id: "2",
    type: "expired_rate_transaction",
    timestamp: "5 minutes ago",
    read: false,
    data: {
      userEmail: "john.doe@example.com",
      amount: "13,467,900",
      sourceCurrency: "NGN",
      destinationCurrency: "USDT",
      expiredRate: "1,600",
    },
  },
  {
    id: "3",
    type: "payment_received",
    timestamp: "10 minutes ago",
    read: false,
    data: {
      userEmail: "jane.smith@example.com",
      amount: "20,000,000",
      sourceCurrency: "NGN",
      destinationCurrency: "USDT",
      transactionId: "TX123456",
    },
  },
  {
    id: "4",
    type: "quote_expiry",
    timestamp: "1 hour ago",
    read: true,
    data: {
      sourceCurrency: "USDC",
      destinationCurrency: "KES",
      expiryTime: "5 minutes",
    },
  },
  {
    id: "5",
    type: "payment_received",
    timestamp: "2 hours ago",
    read: true,
    data: {
      userEmail: "mike.johnson@example.com",
      amount: "5,000,000",
      sourceCurrency: "NGN",
      destinationCurrency: "USDT",
      transactionId: "TX123457",
    },
  },
];

export function NotificationsModal({
  open,
  onOpenChange,
  trigger,
}: NotificationsModalProps) {
  const defaultTrigger = (
    <Button variant="outline" size="icon" className="relative">
      <Bell className="h-4 w-4" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        3
      </span>
    </Button>
  );
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
  };

  const handleUpdateQuote = () => {
    onOpenChange(false);
    navigate("/dashboard/settings");
  };

  const handleReuseQuote = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowConfirmDialog(true);
  };

  const confirmReuseQuote = () => {
    if (selectedNotification) {
      setNotifications((prev) => prev.filter((n) => n.id !== selectedNotification.id));
    }
    setShowConfirmDialog(false);
    setSelectedNotification(null);
  };

  const handleUpdateTransactionStatus = (transactionId: string) => {
    onOpenChange(false);
    navigate(`/dashboard/transactions/${transactionId.replace("TX", "")}`);
  };

  const handleDismissNotification = (notificationId: string, e: MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "quote_expiry":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "expired_rate_transaction":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "payment_received":
        return <CreditCard className="h-4 w-4 text-green-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const renderNotificationContent = (notification: Notification) => {
    const { data } = notification;
    switch (notification.type) {
      case "quote_expiry":
        return (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 space-y-2">
                <p className="text-sm">
                  The Quote you set for{" "}
                  <span className="font-semibold">
                    {data.sourceCurrency} to {data.destinationCurrency}
                  </span>{" "}
                  will expire in{" "}
                  <span className="font-semibold text-orange-600">{data.expiryTime}</span>.
                </p>
                <Button size="sm" onClick={handleUpdateQuote} className="w-full">
                  Update Quote
                </Button>
              </div>
            </div>
          </div>
        );

      case "expired_rate_transaction":
        return (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">{data.userEmail}</span> has submitted a transfer
                  request of{" "}
                  <span className="font-semibold">
                    {data.amount} {data.sourceCurrency}
                  </span>{" "}
                  to <span className="font-semibold">{data.destinationCurrency}</span> with an
                  expired rate of{" "}
                  <span className="font-semibold text-red-600">{data.expiredRate}</span>. Reuse
                  this quote?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleReuseQuote(notification)} className="flex-1">
                    Yes, Reuse Quote
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleUpdateQuote} className="flex-1">
                    No, Update Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "payment_received":
        return (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">{data.userEmail}</span> has made payment for{" "}
                  <span className="font-semibold">
                    {data.amount} {data.sourceCurrency}
                  </span>{" "}
                  to <span className="font-semibold">{data.destinationCurrency}</span>.
                </p>
                <Button
                  size="sm"
                  onClick={() => handleUpdateTransactionStatus(data.transactionId ?? "")}
                  className="w-full"
                >
                  Update Transaction Status
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>{trigger ?? defaultTrigger}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96 p-0" sideOffset={8}>
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                  Clear all
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <Card
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        !notification.read ? "border-blue-200 bg-blue-50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <CardContent className="p-3">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-red-100"
                            onClick={(e) => handleDismissNotification(notification.id, e)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {renderNotificationContent(notification)}
                      </CardContent>
                    </Card>
                    {index < notifications.length - 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t p-3">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View All Notifications
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Quote Reuse</DialogTitle>
            <DialogDescription>
              Are you sure you want to reuse the existing quote for this transaction?
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-2 rounded-lg bg-muted p-4">
              <p className="text-sm">
                <span className="font-medium">User:</span> {selectedNotification.data.userEmail}
              </p>
              <p className="text-sm">
                <span className="font-medium">Amount:</span>{" "}
                {selectedNotification.data.amount} {selectedNotification.data.sourceCurrency} →{" "}
                {selectedNotification.data.destinationCurrency}
              </p>
              <p className="text-sm">
                <span className="font-medium">Rate:</span> {selectedNotification.data.expiredRate}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmReuseQuote}>Yes, Reuse Quote</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
