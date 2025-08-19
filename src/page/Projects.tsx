import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Eye,
  Trash2,
  Plus,
  FolderOpen,
  Clock,
  CheckCircle,
  Server,
  Globe
} from "lucide-react";
import { mockProjects, mockStats } from "@/lib/mock-data";
import type { Project } from "../types/project";
import { EnhancedProjectDetailsModal } from "../components/projects/EnhancedProjectDetailsModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";
import { AddProjectModal } from "@/components/projects/AddProjectModal";
import { toast } from "sonner";
import StatCard from "@/components/common/StatCard";






// Function to get the status badge based on project status
const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Completed</Badge>;
    case "active":
      return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
    case "on-hold":
      return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">On Hold</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};




export default function ProjectsPage() {


  // State management for projects and modals
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);



  // Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);



  // Filter projects based on search term
  const filteredProjects = mockProjects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.email.toLowerCase().includes(searchTerm.toLowerCase())
  );




  // Handlers for project actions
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };



  // Handler for deleting a project
  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };



  // Confirm delete action
  const confirmDelete = () => {
    // In a real app, this would make an API call
    console.log("Deleting project:", projectToDelete?.id);
    toast.success("Project deleted successfully");
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };



  // Handler for adding a new project
  const handleAddProject = (data: any) => {
    // In a real app, this would make an API call
    console.log("Adding project:", data);
    toast.success("Project added successfully");
  };




  return (


    <div className="space-y-6 w-full">


      {/* Page Header */}
      <div className="flex justify-between items-start">


        <div className="space-y-2">

          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>

          <p className="text-muted-foreground">
            Manage and monitor all your client projects in one place.
          </p>

        </div>


        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-700 hover:cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>

      </div>



      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">


        <StatCard
          title="Total Projects"
          value={mockStats.totalProjects}
          icon={FolderOpen}
          bgColor="bg-blue-500/10"
          description="All Projects In System"
          iconColor="text-blue-500"
        />


        <StatCard
          title="Pending Projects"
          value={mockStats.pendingProjects}
          description="Currently In Progress"
          icon={Clock}
          bgColor="bg-yellow-500/10"
          iconColor="text-yellow-500"
        />


        <StatCard
          title="Completed Projects"
          value={mockStats.completedProjects}
          description="Successfully Delivered"
          icon={CheckCircle}
          bgColor="bg-green-500/10"
          iconColor="text-green-500"
        />


        <StatCard
          title="Expired Domains"
          value={mockStats.expiredDomains}
          description="Renewal Required"
          icon={Globe}
          bgColor="bg-red-500/10"
          iconColor="text-red-500"
        />


        <StatCard
          title="Server Issues"
          value={mockStats.expiredServers}
          description="Attention Needed"
          icon={Server}
          bgColor="bg-gray-500/10"
          iconColor="text-gray-500"
        />


      </div>



      {/* Projects Table */}
      <Card className="card-elevated border border-gray-200 dark:border-blue-500/20 dark:bg-gradient-to-br dark:from-[#0d121e] dark:to-[#101627] shadow-sm">

        <CardHeader>

          <CardTitle>All Projects</CardTitle>


          <CardDescription>
            Complete list of projects with key information and actions
          </CardDescription>


          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, clients, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

        </CardHeader>


        <CardContent>


          <Table>


            <TableHeader>


              <TableRow>
                <TableHead className="w-[60px]">SI No</TableHead>
                <TableHead>Project Details</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Approach Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>

            </TableHeader>


            <TableBody>

              {filteredProjects.map((project, index) => (


                <TableRow key={project.id} className="hover:bg-blue-300/10 transition-colors">


                  {/* SI No */}
                  <TableCell className="font-medium">{index + 1}</TableCell>


                  {/* Project Details */}
                  <TableCell>

                    <div className="flex items-center space-x-3">

                      <Avatar className="h-10 w-10">
                        <AvatarImage src={project.clientLogo} alt={project.clientName} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {project.clientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{project.projectName}</p>
                        <p className="text-sm text-muted-foreground">{project.clientName}</p>
                      </div>

                    </div>

                  </TableCell>



                  {/* Contact */}
                  <TableCell>
                    <div>
                      <p className="font-medium">{project.phoneNumber}</p>
                      <p className="text-sm text-muted-foreground">{project.email}</p>
                    </div>
                  </TableCell>



                  {/* Approach Date */}
                  <TableCell>
                    {new Date(project.clientApproachDate).toLocaleDateString()}
                  </TableCell>


                  {/* Status */}
                  <TableCell>
                    {getStatusBadge(project.status)}
                  </TableCell>



                  {/* Actions */}
                  <TableCell className="text-right">

                    <div className="flex justify-end space-x-2">

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProject(project)}
                        className="h-8 w-8 p-0 hover:cursor-pointer hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/20"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View project</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProject(project)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 hover:cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete project</span>
                      </Button>

                    </div>

                  </TableCell>


                </TableRow>


              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>



      {/* Project Details Modal */}
      <EnhancedProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedProject(null);
        }}
      />


      {/* Delete Project Modal */}
      <DeleteProjectModal
        project={projectToDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDelete}
      />


      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProject}
      />


    </div>
  );
}