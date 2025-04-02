import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/appsidebar";
import "../../(website)/globals.css"



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <div  className=" p-4">        
        <SidebarTrigger className="md:hidden" />
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
