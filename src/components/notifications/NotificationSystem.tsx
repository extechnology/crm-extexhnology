import { useState, useEffect } from "react";
import { Bell, Calendar, AlertTriangle} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { mockProjects } from "@/lib/mock-data";
import { differenceInDays, format } from "date-fns";



interface Notification {
    id: string;
    type: "domain-expiry" | "server-expiry" | "deadline";
    title: string;
    message: string;
    projectId: string;
    projectName: string;
    severity: "high" | "medium" | "low";
    date: Date;
    read: boolean;
}

export function NotificationSystem() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Generate notifications based on project data
        const generatedNotifications: Notification[] = [];

        mockProjects.forEach((project) => {
            if (project.domainExpDate) {
                const daysUntilExpiry = differenceInDays(new Date(project.domainExpDate), new Date());

                if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
                    generatedNotifications.push({
                        id: `domain-${project.id}`,
                        type: "domain-expiry",
                        title: "Domain Expiring Soon",
                        message: `Domain ${project.domainName || "Unknown"} expires in ${daysUntilExpiry} days`,
                        projectId: project.id,
                        projectName: project.projectName,
                        severity: daysUntilExpiry <= 7 ? "high" : daysUntilExpiry <= 15 ? "medium" : "low",
                        date: new Date(project.domainExpDate),
                        read: false,
                    });
                }
            }

            if (project.serverExpDate) {
                const daysUntilExpiry = differenceInDays(new Date(project.serverExpDate), new Date());

                if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
                    generatedNotifications.push({
                        id: `server-${project.id}`,
                        type: "server-expiry",
                        title: "Server Expiring Soon",
                        message: `Server for ${project.projectName} expires in ${daysUntilExpiry} days`,
                        projectId: project.id,
                        projectName: project.projectName,
                        severity: daysUntilExpiry <= 7 ? "high" : daysUntilExpiry <= 15 ? "medium" : "low",
                        date: new Date(project.serverExpDate),
                        read: false,
                    });
                }
            }

            if (project.assignedDeliveryDate) {
                const daysUntilDeadline = differenceInDays(new Date(project.assignedDeliveryDate), new Date());

                if (daysUntilDeadline <= 7 && daysUntilDeadline >= 0) {
                    generatedNotifications.push({
                        id: `deadline-${project.id}`,
                        type: "deadline",
                        title: "Project Deadline Approaching",
                        message: `${project.projectName} deadline in ${daysUntilDeadline} days`,
                        projectId: project.id,
                        projectName: project.projectName,
                        severity: daysUntilDeadline <= 2 ? "high" : daysUntilDeadline <= 5 ? "medium" : "low",
                        date: new Date(project.assignedDeliveryDate),
                        read: false,
                    });
                }
            }
        });

        setNotifications(generatedNotifications.sort((a, b) => b.date.getTime() - a.date.getTime()));
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-destructive/10 text-destructive border-destructive/20";
            case "medium":
                return "bg-warning/10 text-warning border-warning/20";
            default:
                return "bg-primary/10 text-primary border-primary/20";
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "domain-expiry":
            case "server-expiry":
                return Calendar;
            case "deadline":
                return AlertTriangle;
            default:
                return Bell;
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-full border border-border/50 hover:border-border transition-all duration-300"
                >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs notification-badge bg-destructive text-destructive-foreground"
                        >
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 glass-effect border-border/50" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <h4 className="font-semibold">Notifications</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-muted-foreground hover:text-foreground"
                        >
                            Mark all read
                        </Button>
                    )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No notifications</p>
                        </div>
                    ) : (
                        <div className="space-y-1 p-2">
                            {notifications.map((notification) => {
                                const Icon = getNotificationIcon(notification.type);
                                return (
                                    <Card
                                        key={notification.id}
                                        className={`p-3 cursor-pointer transition-all duration-200 hover:bg-muted/50 ${!notification.read ? "bg-muted/30 border-primary/20" : "bg-transparent"
                                            }`}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-1.5 rounded-lg ${getSeverityColor(notification.severity)}`}>
                                                <Icon className="h-3 w-3" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">{notification.title}</p>
                                                    {!notification.read && (
                                                        <div className="h-2 w-2 bg-primary rounded-full" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">{notification.message}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {format(notification.date, "MMM d, yyyy")}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}