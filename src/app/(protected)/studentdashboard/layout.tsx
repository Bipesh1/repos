import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import "../../(website)/globals.css"
import { AppSidebarStudents } from "../components/appsidebaradmin";



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider >
      <AppSidebarStudents />
      <SidebarInset className="overflow-x-hidden">
        <div  className="p-4">        
        <SidebarTrigger className="md:hidden" />
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
