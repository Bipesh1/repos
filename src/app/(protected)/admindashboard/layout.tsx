import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/appsidebar";
import "../../(website)/globals.css"
import { AppSidebarAdmin } from "../components/appsidebarstudent";



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <SidebarProvider >
      <AppSidebarAdmin/>
      <SidebarInset className="overflow-x-hidden">
        <div  className=" p-4">        
        <SidebarTrigger className="md:hidden" />
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
