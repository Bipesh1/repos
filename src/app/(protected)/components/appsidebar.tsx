"use client"
import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Logout } from "../actions/superadmin"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

 
// Menu items.
const items = [
  {
    title: "Countries",
    url: "/dashboard/countries",
    icon: Home,
  },
  {
    title: "Universities",
    url: "/dashboard/universities",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: Inbox,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: Inbox,
  },
  {
    title: "FAQ",
    url: "/dashboard/faq",
    icon: Calendar,
  },
  {
    title: "Students",
    url: "/dashboard/students",
    icon: Calendar,
  },
  {
    title: "Admins",
    url: "/dashboard/admin",
    icon: Calendar,
  },
  
]
 
export function AppSidebar() {
const router=useRouter();
const [isPending,startTransition]= useTransition()
  const handleLogout=()=>{
    startTransition(async()=>{

      const response= await Logout()
      if(response.status==200){
        router.replace('/superadmin')
      }
    })
    
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to logout? You'll need to sign in again to access your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
               
                <Button 
                  variant="destructive"
                  onClick={handleLogout}
                >
                 {isPending?"Logging out...":"Logout"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}