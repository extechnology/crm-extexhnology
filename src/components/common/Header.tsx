import { ChevronDown, LogOut, User as UserIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NotificationSystem } from "@/components/notifications/NotificationSystem";




export function DashboardHeader() {

  return (


    <header className="h-20 border-b  border-gray-200 dark:border-white/5 backdrop-blur-md bg-white dark:bg-gradient-to-r dark:from-[#0e131f] dark:to-[#111829] sticky top-0 z-50">


      <div className="h-full px-6 flex items-center justify-between">


        {/* Left Section */}
        <div className="flex items-center gap-6">

          <SidebarTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all duration-300" />

          {/* Logo + Brand */}
          <div className="flex items-center gap-4">

            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500 dark:bg-blue-500 shadow-[0_0_10px_#3B82F6]">
              <Zap className="h-6 w-6 text-white" />
            </div>

            <div className="hidden md:block">

              <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-400 dark:drop-shadow-[0_0_6px_#3B82F6]">
              Ex-Technology Project-Hub
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Futuristic Project Hub
              </p>

            </div>

          </div>

        </div>



        {/* Right Section */}
        <div className="flex items-center gap-4">


          {/* Notifications */}
          <NotificationSystem />


          {/* Theme Toggle */}
          <div className="p-1 rounded-xl bg-gray-100 dark:bg-white/5">
            <ThemeToggle />
          </div>


          {/* User Menu */}
          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Button
                variant="ghost"
                className="flex items-center gap-3 h-12 px-4 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 bg-gray-50 dark:bg-white/5"
              >

                <Avatar className="h-8 w-8 ring-2 ring-gray-200 dark:ring-white/10">
                  <AvatarImage src="" alt="admin-logo" />
                  <AvatarFallback className="text-sm bg-blue-500 text-white font-semibold">
                    UA
                  </AvatarFallback>
                </Avatar>

                <span className="hidden sm:block font-medium text-gray-900 dark:text-white">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />

              </Button>

            </DropdownMenuTrigger>


            <DropdownMenuContent
              align="end"
              className="w-64 border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0E1422] shadow-xl rounded-2xl"
            >

              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    Admin
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @admin
                  </p>
                </div>
              </DropdownMenuLabel>


              <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/10" />


              <DropdownMenuItem className="cursor-pointer mx-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors p-3">
                <UserIcon className="mr-3 h-5 w-5 text-blue-500" />
                <span className="font-medium">Profile Settings</span>
              </DropdownMenuItem>


              <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/10" />


              <DropdownMenuItem
                className="cursor-pointer mx-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors p-3"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </DropdownMenuItem>


            </DropdownMenuContent>


          </DropdownMenu>


        </div>


      </div>


    </header>

  );

}
