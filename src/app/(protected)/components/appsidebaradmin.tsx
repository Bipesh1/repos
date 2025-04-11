"use client";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Logout } from "../actions/student";
import { useTransition } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image"; // ✅ Make sure to import this

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/studentdashboard",
    icon: Home,
  },
  {
    title: "EduPilot",
    url: "/studentdashboard/counselor",
    icon: Home,
  },
  {
    title: "Favourite Universities",
    url: "/studentdashboard/universities",
    icon: Home,
  },
  {
    title: "Applied Universities",
    url: "/studentdashboard/applied",
    icon: Home,
  },
];

export function AppSidebarStudents() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const response = await Logout();
      if (response.status == 200) {
        router.replace("/login");
      }
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* ✅ Logo at the top */}
        <div className="flex items-center justify-center py-6 px-4 border-b border-gray-200">
          <Image src={logo} alt="Logo" width={100} height={40} priority />
        </div>

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

        {/* Logout Button with Confirmation Dialog */}
        <div className="mt-auto p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to logout? You'll need to sign in again
                  to access your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={handleLogout}>
                  {isPending ? "Logging out..." : "Logout"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
