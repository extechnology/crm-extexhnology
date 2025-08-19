export interface Project {
    id: string;
    clientName: string;
    projectName: string;
    country: string;
    phoneNumber: string;
    email: string;
    clientLogo?: string;
    aboutClient: string;
    clientApproachDate: string;

    // Work Assignment
    natureOfProject: "web" | "mobile" | "software";
    workType?: string; // Landing Page, Standard Web, e-commerce, etc.
    workAssignedDate: string;
    assignedDeliveryDate: string;

    // Domain & Server
    domainStatus: "active" | "expired" | "pending";
    domainName: string;
    domainOwner: "extech" | "client";
    domainPurchasedFrom: string;
    domainPurchaseDate: string;
    domainExpDate: string;

    serverStatus: "active" | "expired" | "pending";
    serverType: string;
    serverName: string;
    serverOwner: "extech" | "client";
    serverAcquiredDate: string;
    serverExpDate: string;

    // Scope of Work
    scopeDescription: string;
    uxuiAssistant: string;
    workStartDate: string;
    assignedDeliveryDate2: string;
    deliveredDate?: string;

    // Development
    developmentAssignedBy: string;
    devWorkStartDate: string;
    devAssignedDeliveryDate: string;
    devDeliveredDate?: string;

    // Status
    workStatus: string;
    statusUpdatedDate: string;
    workRawDeliveryDate?: string;
    hostingPublishingDate?: string;
    lastUpdated?: string;
    handedOverDate?: string;
    projectReviewDate?: string;

    // Metrics
    totalDaysSpent: number;
    savedDays: number;
    overSpendDays: number;
    spentManpowerCost: number;

    // System fields
    status: "active" | "completed" | "on-hold" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

export interface ProjectStats {
    totalProjects: number;
    pendingProjects: number;
    completedProjects: number;
    expiredDomains: number;
    expiredServers: number;
    onHoldProjects: number;
}