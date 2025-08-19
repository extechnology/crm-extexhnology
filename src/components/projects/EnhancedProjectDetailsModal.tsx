import { useState, useEffect } from "react";
import type { Project } from "../../types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, Globe, Server, User, Edit3, Save, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";




// EnhancedProjectDetailsModalProps interface
interface EnhancedProjectDetailsModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}




export function EnhancedProjectDetailsModal({ project, isOpen, onClose }: EnhancedProjectDetailsModalProps) {



    // State management
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState("overview");



    // Initialize editedProject when project changes
    useEffect(() => {
        if (project) {
            setEditedProject({ ...project });
        }
    }, [project]);




    // Handlers
    const handleEdit = () => {
        setIsEditing(true);
        if (project) {
            setEditedProject({ ...project });
        }
    };




    // Function to handle saving the edited project
    const handleSave = () => {
        setIsEditing(false);
        toast.success("Project updated successfully", {
            description: "All changes have been saved.",
        });
    };



    // Function to handle canceling the edit
    const handleCancel = () => {
        setIsEditing(false);
        if (project) {
            setEditedProject({ ...project });
        }
    };



    // Function to update a specific field in the edited project
    const updateField = (field: string, value: any) => {
        if (editedProject) {
            setEditedProject({ ...editedProject, [field]: value });
        }
    };



    // Function to get the status badge based on project status
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
            case "active":
                return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
            case "on-hold":
                return <Badge className="bg-warning/10 text-warning border-warning/20">On Hold</Badge>;
            case "cancelled":
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };



    // If no project is provided, return null
    if (!project || !editedProject) return null;




    return (


        <Dialog open={isOpen} onOpenChange={onClose}>



            <DialogContent className="!max-w-6xl !h-[90vh] w-full overflow-hidden dark:bg-[#0b101a] bg-[linear-gradient(135deg,rgba(120,180,240,0.08),rgba(140,200,260,0.04))]">


                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-border/50">


                    <div>

                        <DialogTitle className="text-2xl font-bold dark:text-[#6495f7]">
                            {project.projectName.toUpperCase()} - {project.id}
                        </DialogTitle>

                        <DialogDescription className="!text-[#94a0b8] mt-1">
                            Complete project details and management
                        </DialogDescription>

                    </div>



                    <div className="flex items-center gap-2">

                        {!isEditing ? (

                            <Button onClick={handleEdit} size="sm" className="bg-[#6495f7] hover:bg-[#4169e1] transition-colors hover:cursor-pointer">
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Project
                            </Button>

                        ) : (

                            <div className="flex gap-2">

                                <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600 transition-colors hover:cursor-pointer">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                </Button>

                                <Button onClick={handleCancel} variant="outline" size="sm" className="hover:cursor-pointer">
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>

                            </div>

                        )}

                    </div>


                </DialogHeader>



                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">



                    {/* Tabs Head */}
                    <TabsList className="grid w-full grid-cols-5 mb-6 dark:bg-[#1f2533] ">
                        <TabsTrigger value="overview" className="transition-all duration-300 hover:cursor-pointer dark:text-[#94a0b8] dark:data-[state=active]:bg-[#181e2c] dark:data-[state=active]:text-white">Overview</TabsTrigger>
                        <TabsTrigger value="client" className="transition-all duration-300 hover:cursor-pointer dark:text-[#94a0b8] dark:data-[state=active]:bg-[#181e2c] dark:data-[state=active]:text-white">Client Info</TabsTrigger>
                        <TabsTrigger value="domain-server" className="transition-all hover:cursor-pointer duration-300 dark:text-[#94a0b8] dark:data-[state=active]:bg-[#181e2c] dark:data-[state=active]:text-white">Domain & Server</TabsTrigger>
                        <TabsTrigger value="development" className="transition-all hover:cursor-pointer duration-300 dark:text-[#94a0b8] dark:data-[state=active]:bg-[#181e2c] dark:data-[state=active]:text-white">Development</TabsTrigger>
                        <TabsTrigger value="timeline" className="transition-all hover:cursor-pointer duration-300 dark:text-[#94a0b8] dark:data-[state=active]:bg-[#181e2c] dark:data-[state=active]:text-white">Timeline</TabsTrigger>
                    </TabsList>




                    <div className="overflow-y-auto max-h-[60vh] pr-2">



                        {/* Overview */}
                        <TabsContent value="overview" className="space-y-6 fade-in-up">


                            <div className="grid gap-6 md:grid-cols-2">


                                <Card className="card-elevated dark:bg-[#111928] border-1">


                                    <CardHeader>
                                        <CardTitle className="flex text-2xl items-center gap-2">
                                            <User className="h-5 w-5 text-blue-500" />
                                            Project Overview
                                        </CardTitle>
                                    </CardHeader>


                                    <CardContent className="space-y-4">


                                        <div className="space-y-2">
                                            <Label>Project ID</Label>
                                            <Input value={editedProject.id} disabled className="bg-muted/50" />
                                        </div>



                                        <div className="space-y-2">
                                            <Label>Project Name</Label>
                                            {isEditing ? (
                                                <Input
                                                    value={editedProject.projectName}
                                                    onChange={(e) => updateField("projectName", e.target.value)}
                                                />
                                            ) : (
                                                <p className="text-sm font-medium">{editedProject.projectName}</p>
                                            )}
                                        </div>



                                        <div className="space-y-2">

                                            <Label>Status</Label>

                                            {isEditing ? (

                                                <Select value={editedProject.status} onValueChange={(value) => updateField("status", value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="on-hold">On Hold</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            ) : (

                                                getStatusBadge(editedProject.status)

                                            )}

                                        </div>



                                        <div className="space-y-2">
                                            <Label>Nature of Work</Label>
                                            {isEditing ? (
                                                <Select value={editedProject.workType} onValueChange={(value) => updateField("workType", value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Web - Landing Page">Web - Landing Page</SelectItem>
                                                        <SelectItem value="Web - Standard Web">Web - Standard Web</SelectItem>
                                                        <SelectItem value="Web - E-commerce">Web - E-commerce</SelectItem>
                                                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                                                        <SelectItem value="Software">Software</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="text-sm">{editedProject.workType}</p>
                                            )}
                                        </div>


                                    </CardContent>


                                </Card>



                                <Card className="card-elevated dark:bg-[#111928] border-1">


                                    <CardHeader>
                                        <CardTitle>Scope of Work</CardTitle>
                                    </CardHeader>


                                    <CardContent className="space-y-4">

                                        <div className="space-y-2">


                                            <Label>Description</Label>


                                            {isEditing ? (

                                                <Textarea
                                                    value={editedProject.scopeDescription || ""}
                                                    onChange={(e) => updateField("scopeDescription", e.target.value)}
                                                    placeholder="Describe the project scope..."
                                                    rows={4}
                                                />

                                            ) : (

                                                <p className="text-sm text-muted-foreground">
                                                    {editedProject.scopeDescription || "No description provided"}
                                                </p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>UX/UI Assisted by</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.uxuiAssistant || ""}
                                                    onChange={(e) => updateField("uxuiAssistant", e.target.value)}
                                                    placeholder="Designer name"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.uxuiAssistant || "Not assigned"}</p>

                                            )}

                                        </div>

                                    </CardContent>


                                </Card>

                            </div>


                        </TabsContent>




                        {/* Client Information */}
                        <TabsContent value="client" className="space-y-6 fade-in-up">


                            <Card className="card-elevated dark:bg-[#111928] border-1">


                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-2xl">
                                        <User className="h-5 w-5 text-primary" />
                                        Client Information
                                    </CardTitle>
                                </CardHeader>


                                <CardContent className="space-y-6">


                                    <div className="flex items-center space-x-4">


                                        <Avatar className="h-16 w-16">

                                            <AvatarImage src={editedProject.clientLogo} alt={editedProject.clientName} />

                                            <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                                {editedProject.clientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                            </AvatarFallback>

                                        </Avatar>


                                        <div className="space-y-2">

                                            <Label>Client Name</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.clientName}
                                                    onChange={(e) => updateField("clientName", e.target.value)}
                                                />

                                            ) : (
                                                <p className="text-lg font-semibold">{editedProject.clientName}</p>
                                            )}

                                        </div>


                                    </div>



                                    <div className="grid gap-4 md:grid-cols-2">


                                        <div className="space-y-2">

                                            <Label>Country</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.country || ""}
                                                    onChange={(e) => updateField("country", e.target.value)}
                                                    placeholder="Country"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.country || "Not specified"}</p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Phone Number</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.phoneNumber}
                                                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.phoneNumber}</p>

                                            )}

                                        </div>



                                        <div className="space-y-2">


                                            <Label>Email</Label>


                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.email}
                                                    onChange={(e) => updateField("email", e.target.value)}
                                                    type="email"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.email}</p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Client Approach Date</Label>


                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.clientApproachDate ? new Date(editedProject.clientApproachDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("clientApproachDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.clientApproachDate ? new Date(editedProject.clientApproachDate).toLocaleDateString() : "Not set"}
                                                </p>

                                            )}

                                        </div>

                                    </div>



                                    <div className="space-y-2">

                                        <Label>About the Client</Label>

                                        {isEditing ? (

                                            <Textarea
                                                value={editedProject.aboutClient || ""}
                                                onChange={(e) => updateField("aboutClient", e.target.value)}
                                                placeholder="Information about the client..."
                                                rows={3}
                                            />

                                        ) : (

                                            <p className="text-sm text-muted-foreground">
                                                {editedProject.aboutClient || "No information provided"}
                                            </p>

                                        )}

                                    </div>


                                </CardContent>


                            </Card>


                        </TabsContent>





                        {/* Domain Server */}
                        <TabsContent value="domain-server" className="space-y-6 fade-in-up">


                            <div className="grid gap-6 md:grid-cols-2">


                                <Card className="card-elevated dark:bg-[#111928] border-1">


                                    <CardHeader>

                                        <CardTitle className="flex items-center gap-2 text-2xl">
                                            <Globe className="h-5 w-5 text-primary" />
                                            Domain Information
                                        </CardTitle>

                                    </CardHeader>


                                    <CardContent className="space-y-4">


                                        <div className="space-y-2">

                                            <Label>Domain Status</Label>


                                            {isEditing ? (

                                                <Select value={editedProject.domainStatus} onValueChange={(value) => updateField("domainStatus", value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="expired">Expired</SelectItem>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            ) : (

                                                <Badge className={editedProject.domainStatus === "active" ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                                                    {editedProject.domainStatus}
                                                </Badge>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Domain Name</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.domainName || ""}
                                                    onChange={(e) => updateField("domainName", e.target.value)}
                                                    placeholder="example.com"
                                                />

                                            ) : (

                                                <p className="text-sm font-mono">{editedProject.domainName || "Not set"}</p>

                                            )}

                                        </div>



                                        <div className="space-y-2">

                                            <Label>Domain Purchased From</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.domainPurchasedFrom || ""}
                                                    onChange={(e) => updateField("domainPurchasedFrom", e.target.value)}
                                                    placeholder="Domain registrar"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.domainPurchasedFrom || "Not specified"}</p>

                                            )}

                                        </div>




                                        <div className="grid gap-4 md:grid-cols-2">


                                            <div className="space-y-2">

                                                <Label>Purchase Date</Label>

                                                {isEditing ? (

                                                    <Input
                                                        type="date"
                                                        value={editedProject.domainPurchaseDate ? new Date(editedProject.domainPurchaseDate).toISOString().split('T')[0] : ""}
                                                        onChange={(e) => updateField("domainPurchaseDate", e.target.value)}
                                                    />

                                                ) : (

                                                    <p className="text-sm">
                                                        {editedProject.domainPurchaseDate ? new Date(editedProject.domainPurchaseDate).toLocaleDateString() : "Not set"}
                                                    </p>

                                                )}

                                            </div>


                                            <div className="space-y-2">

                                                <Label>Expiry Date</Label>

                                                {isEditing ? (

                                                    <Input
                                                        type="date"
                                                        value={editedProject.domainExpDate ? new Date(editedProject.domainExpDate).toISOString().split('T')[0] : ""}
                                                        onChange={(e) => updateField("domainExpDate", e.target.value)}
                                                    />

                                                ) : (

                                                    <p className="text-sm">
                                                        {editedProject.domainExpDate ? new Date(editedProject.domainExpDate).toLocaleDateString() : "Not set"}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    </CardContent>


                                </Card>




                                <Card className="card-elevated dark:bg-[#111928] border-1">


                                    <CardHeader>

                                        <CardTitle className="flex items-center gap-2 text-2xl">
                                            <Server className="h-5 w-5 text-primary" />
                                            Server Information
                                        </CardTitle>

                                    </CardHeader>


                                    <CardContent className="space-y-4">

                                        <div className="space-y-2">

                                            <Label>Server Status</Label>

                                            {isEditing ? (

                                                <Select value={editedProject.serverStatus} onValueChange={(value) => updateField("serverStatus", value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="expired">Expired</SelectItem>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            ) : (

                                                <Badge className={editedProject.serverStatus === "active" ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                                                    {editedProject.serverStatus}
                                                </Badge>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Server Type</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.serverType || ""}
                                                    onChange={(e) => updateField("serverType", e.target.value)}
                                                    placeholder="Shared, VPS, Dedicated, etc."
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.serverType || "Not specified"}</p>

                                            )}

                                        </div>



                                        <div className="space-y-2">

                                            <Label>Hosting Server</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.serverName || ""}
                                                    onChange={(e) => updateField("serverName", e.target.value)}
                                                    placeholder="Server provider"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.serverName || "Not specified"}</p>

                                            )}

                                        </div>



                                        <div className="space-y-2">

                                            <Label>Server Acquired By</Label>

                                            {isEditing ? (

                                                <Select value={editedProject.serverOwner} onValueChange={(value) => updateField("serverOwner", value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="extech">Extech</SelectItem>
                                                        <SelectItem value="client">Client</SelectItem>
                                                    </SelectContent>
                                                </Select>

                                            ) : (

                                                <p className="text-sm">{editedProject.serverOwner || "Not specified"}</p>

                                            )}

                                        </div>



                                        <div className="grid gap-4 md:grid-cols-2">

                                            <div className="space-y-2">

                                                <Label>Acquired Date</Label>

                                                {isEditing ? (

                                                    <Input
                                                        type="date"
                                                        value={editedProject.serverAcquiredDate ? new Date(editedProject.serverAcquiredDate).toISOString().split('T')[0] : ""}
                                                        onChange={(e) => updateField("serverAcquiredDate", e.target.value)}
                                                    />

                                                ) : (

                                                    <p className="text-sm">
                                                        {editedProject.serverAcquiredDate ? new Date(editedProject.serverAcquiredDate).toLocaleDateString() : "Not set"}
                                                    </p>
                                                )}

                                            </div>


                                            <div className="space-y-2">

                                                <Label>Expiry Date</Label>

                                                {isEditing ? (

                                                    <Input
                                                        type="date"
                                                        value={editedProject.serverExpDate ? new Date(editedProject.serverExpDate).toISOString().split('T')[0] : ""}
                                                        onChange={(e) => updateField("serverExpDate", e.target.value)}
                                                    />

                                                ) : (

                                                    <p className="text-sm">
                                                        {editedProject.serverExpDate ? new Date(editedProject.serverExpDate).toLocaleDateString() : "Not set"}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            </div>


                        </TabsContent>




                        {/* DEVELOPMENT DETAILS */}
                        <TabsContent value="development" className="space-y-6 fade-in-up">


                            <Card className="card-elevated dark:bg-[#111928] border-1">


                                <CardHeader >
                                    <CardTitle className="text-2xl">Development Details</CardTitle>
                                </CardHeader>


                                <CardContent className="space-y-6">

                                    <div className="grid gap-4 md:grid-cols-2">

                                        <div className="space-y-2">

                                            <Label>Work Assigned Date</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.workAssignedDate ? new Date(editedProject.workAssignedDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("workAssignedDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.workAssignedDate ? new Date(editedProject.workAssignedDate).toLocaleDateString() : "Not set"}
                                                </p>
                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Assigned Delivery Date</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.assignedDeliveryDate ? new Date(editedProject.assignedDeliveryDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("assignedDeliveryDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.assignedDeliveryDate ? new Date(editedProject.assignedDeliveryDate).toLocaleDateString() : "Not set"}
                                                </p>

                                            )}

                                        </div>


                                    </div>



                                    <div className="space-y-2">

                                        <Label>Development Work Assigned By</Label>

                                        {isEditing ? (

                                            <Input
                                                value={editedProject.developmentAssignedBy || ""}
                                                onChange={(e) => updateField("developmentAssignedBy", e.target.value)}
                                                placeholder="Developer name"
                                            />

                                        ) : (

                                            <p className="text-sm">{editedProject.developmentAssignedBy || "Not assigned"}</p>

                                        )}

                                    </div>



                                    <div className="grid gap-4 md:grid-cols-3">


                                        <div className="space-y-2">

                                            <Label>Work Start Date</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.workStartDate ? new Date(editedProject.workStartDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("workStartDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.workStartDate ? new Date(editedProject.workStartDate).toLocaleDateString() : "Not set"}
                                                </p>
                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Delivered Date</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.deliveredDate ? new Date(editedProject.deliveredDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("deliveredDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.deliveredDate ? new Date(editedProject.deliveredDate).toLocaleDateString() : "Not delivered"}
                                                </p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Manpower Cost</Label>

                                            {isEditing ? (

                                                <Input
                                                    value={editedProject.spentManpowerCost?.toString() || ""}
                                                    onChange={(e) => updateField("spentManpowerCost", parseFloat(e.target.value) || 0)}
                                                    placeholder="Cost in currency"
                                                    type="number"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.spentManpowerCost || "Not specified"}</p>

                                            )}

                                        </div>

                                    </div>

                                </CardContent>


                            </Card>


                        </TabsContent>




                        {/* Project Timeline */}
                        <TabsContent value="timeline" className="space-y-6 fade-in-up">


                            <Card className="card-elevated dark:bg-[#111928] border-1">


                                <CardHeader>
                                    <CardTitle className="flex items-center text-2xl gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        Project Timeline
                                    </CardTitle>
                                </CardHeader>


                                <CardContent className="space-y-6">


                                    <div className="space-y-2">

                                        <Label>Work Status Description</Label>

                                        {isEditing ? (

                                            <Textarea
                                                value={editedProject.workStatus || ""}
                                                onChange={(e) => updateField("workStatus", e.target.value)}
                                                placeholder="Current work status..."
                                                rows={3}
                                            />

                                        ) : (

                                            <p className="text-sm text-muted-foreground">
                                                {editedProject.workStatus || "No status update"}
                                            </p>

                                        )}

                                    </div>


                                    <div className="grid gap-4 md:grid-cols-2">

                                        <div className="space-y-2">

                                            <Label>Status Updated On</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.statusUpdatedDate ? new Date(editedProject.statusUpdatedDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("statusUpdatedDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.statusUpdatedDate ? new Date(editedProject.statusUpdatedDate).toLocaleDateString() : "Not updated"}
                                                </p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Raw Delivery Date</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.workRawDeliveryDate ? new Date(editedProject.workRawDeliveryDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("workRawDeliveryDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.workRawDeliveryDate ? new Date(editedProject.workRawDeliveryDate).toLocaleDateString() : "Not set"}
                                                </p>

                                            )}

                                        </div>

                                    </div>



                                    <div className="grid gap-4 md:grid-cols-2">

                                        <div className="space-y-2">

                                            <Label>Hosting & Publishing Date</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.hostingPublishingDate ? new Date(editedProject.hostingPublishingDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("hostingPublishingDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.hostingPublishingDate ? new Date(editedProject.hostingPublishingDate).toLocaleDateString() : "Not published"}
                                                </p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Handed Over to Client</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="date"
                                                    value={editedProject.handedOverDate ? new Date(editedProject.handedOverDate).toISOString().split('T')[0] : ""}
                                                    onChange={(e) => updateField("handedOverDate", e.target.value)}
                                                />

                                            ) : (

                                                <p className="text-sm">
                                                    {editedProject.handedOverDate ? new Date(editedProject.handedOverDate).toLocaleDateString() : "Not handed over"}

                                                </p>

                                            )}

                                        </div>

                                    </div>



                                    <div className="space-y-2">

                                        <Label>Project Review & Windup Date</Label>

                                        {isEditing ? (

                                            <Input
                                                type="date"
                                                value={editedProject.projectReviewDate ? new Date(editedProject.projectReviewDate).toISOString().split('T')[0] : ""}
                                                onChange={(e) => updateField("projectReviewDate", e.target.value)}
                                            />

                                        ) : (

                                            <p className="text-sm">
                                                {editedProject.projectReviewDate ? new Date(editedProject.projectReviewDate).toLocaleDateString() : "Not reviewed"}
                                            </p>

                                        )}

                                    </div>



                                    <div className="grid gap-4 md:grid-cols-3">

                                        <div className="space-y-2">

                                            <Label>Total Days Spent</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="number"
                                                    value={editedProject.totalDaysSpent || ""}
                                                    onChange={(e) => updateField("totalDaysSpent", e.target.value)}
                                                    placeholder="Days"
                                                />

                                            ) : (

                                                <p className="text-sm">{editedProject.totalDaysSpent || "0"} days</p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Saved Days</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="number"
                                                    value={editedProject.savedDays || ""}
                                                    onChange={(e) => updateField("savedDays", e.target.value)}
                                                    placeholder="Days"
                                                />

                                            ) : (

                                                <p className="text-sm text-success">{editedProject.savedDays || "0"} days</p>

                                            )}

                                        </div>


                                        <div className="space-y-2">

                                            <Label>Over Spend Days</Label>

                                            {isEditing ? (

                                                <Input
                                                    type="number"
                                                    value={editedProject.overSpendDays || ""}
                                                    onChange={(e) => updateField("overSpendDays", e.target.value)}
                                                    placeholder="Days"
                                                />

                                            ) : (

                                                <p className="text-sm text-destructive">{editedProject.overSpendDays || "0"} days</p>

                                            )}

                                        </div>

                                    </div>

                                </CardContent>

                            </Card>

                        </TabsContent>


                    </div>


                </Tabs>


            </DialogContent>


        </Dialog>

    );

}