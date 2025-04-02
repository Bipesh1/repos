"use client";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine, LoaderCircle, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { checkUser } from "@/app/(protected)/actions/user"; // Updated import
import { studentSchema } from "@/formschemas/student";
import { Textarea } from "@/components/ui/textarea";
import { editByStudent } from "../../actions/student";

// Create a new schema specifically for partial updates
const profileSchema = z.object({
  mobile: z.coerce
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must not exceed 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  
  gpa: z.coerce
    .string()
    .optional()
    .refine((val) => !val || (parseFloat(val) >= 0.0 && parseFloat(val) <= 4.0), {
      message: "GPA must be between 0.0 and 4.0",
    }),
  
  link: z
    .string()
    .optional(),
  
  tests: z
    .string()
    .max(500, "Tests information must be under 500 characters")
    .optional(),
  
  maritalStatus: z.string().optional(),
  
  workExp: z
    .string()
    .max(200, "Work experience must be under 200 characters")
    .optional(),
});


export default function StudentProfileEdit({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [student, setStudent] = useState<any>(null);



  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      mobile: "",
      gpa: "",
      link: "",
      maritalStatus:"",
      workExp:"",
      tests:"",
      
    },
  });

  useEffect(() => {
    const fetchStudent = () => {
      startTransition(async () => {
        const response = await checkUser(); // Changed to checkUser
        if (response.data) {
          const studentData = response.data;
          form.reset({
            mobile: studentData.mobile || "",
            gpa: studentData.gpa|| "",
            link: studentData.link || "",
            maritalStatus:studentData.maritalStatus|| "",
            workExp:studentData.workExp || "",
            tests:studentData.tests||"",
            
          });
        }
      });
    };

    if (isOpen) {
      fetchStudent();
    }
  }, [id, isOpen, form]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    startTransition(async () => {
      try {
        const response = await editByStudent(values, id);
        if (response.status==200) {
          form.reset();
          setIsOpen(false);
        }
      } catch (err) {
        console.error("An error occurred", err);
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <FilePenLine size={16} />
          <p>Update Profile</p>
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Update Profile Details</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-10"
          >
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter your GPA (0.0 - 4.0)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : parseFloat(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Drive Link</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Paste your Google Drive sharing link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                          control={form.control}
                          name="tests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tests Information</FormLabel>
                              <FormControl>
                                <Textarea placeholder="IELTS:6.0, TOEFL:100..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Martial Status</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Marital Status"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workExp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Experience</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bank Manager, 2+ years"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              size="sm" 
              disabled={isPending} 
              type="submit" 
              className="w-full mt-4"
            >
              {isPending ? (
                <LoaderCircle size={16} className="animate-spin mr-2" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Update Profile
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}