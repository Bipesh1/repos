"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { adminFormSchema } from "@/formschemas/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine, LoaderCircle, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAdmin, editAdmin, fetchAdminById } from "@/app/(protected)/actions/admin";


export default function AdminEdit({id}:{
    id:string
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [admin,setAdmin]= useState<any>(null)


  useEffect(() => {
      const fetchAdmin = () => {
        startTransition(async () => {
          const response = await fetchAdminById(id);
          if (response.data) {
            const admin = response.data.admin;
            setAdmin(admin);
            
            // Set image preview if image exists
           
            
            // Reset form with all the data
            form.reset({
                adminName: response.data.adminName,
                email: response.data.email,
                mobile: response.data.mobile,
                password:response.data.password,
                confirmPassword:response.data.password,
                role: "admin"
            });
          }
        });
      };
      
      if(isOpen){
        fetchAdmin();
      }
    }, [id, isOpen]);

  const form = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      adminName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: "admin" // Adding the missing role field with default value
    },
  });

  const onSubmit = (values: z.infer<typeof adminFormSchema>) => {
   
    try {
      startTransition(async () => {
        const response = await editAdmin(values,id);
        form.reset();
        setIsOpen(false);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger >
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <FilePenLine size={16} />
                  <p>Update</p>
                </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add New Admin</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-10"
          >
            {/* Admin Information Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Admin Information</h3>
              
              <FormField
                control={form.control}
                name="adminName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter admin name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Adding a hidden/disabled field for role since it's required by the schema */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input
                        type="hidden"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
             
            </div>

            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Update Admin
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}