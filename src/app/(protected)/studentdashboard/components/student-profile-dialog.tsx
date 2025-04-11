// components/student-profile-dialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/app/(protected)/components/datepicker";
import { useTransition, useState, useEffect } from "react";
import { editByStudent } from "../../actions/student";
import { checkUser } from "@/app/(protected)/actions/user";

const profileSchema = z.object({
  userName: z.string().min(1, "Full Name is required"),
  dob: z.string().optional(),
  gender: z.string().optional(),
  cityOfBirth: z.string().optional(),
  countryOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  countryOfResidence: z.string().optional(),
  address: z.string().optional(),
  mobile: z.coerce.string().optional(),
  email: z.string().email().optional(),
  whatsapp: z.string().optional(),
  passportNumber: z.string().min(1, "Passport Number is required"),
  passportCountry: z.string().optional(),
  passportExpiry: z.string().optional(),
  emergencyName: z.string().min(1, "Emergency Contact Name is required"),
  emergencyRelation: z.string().optional(),
  emergencyPhone: z.coerce.string().optional(),
  emergencyEmail: z.string().optional(),
  hsInstitution: z.string().optional(),
  hsCountry: z.string().optional(),
  hsBoard: z.string().optional(),
  hsEndDate: z.string().optional(),
  hsGrade: z.string().optional(),
});

type NotificationType = {
  message: string;
  type: "success" | "error";
  visible: boolean;
};

export function StudentProfileDialog({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    type: "success",
    visible: false,
  });

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: "",
      dob: "",
      gender: "",
      cityOfBirth: "",
      countryOfBirth: "",
      nationality: "",
      countryOfResidence: "",
      address: "",
      mobile: "",
      email: "",
      whatsapp: "",
      passportNumber: "",
      passportCountry: "",
      passportExpiry: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
      emergencyEmail: "",
      hsInstitution: "",
      hsCountry: "",
      hsBoard: "",
      hsEndDate: "",
      hsGrade: "",
    },
    mode: "onChange", // Validate on change to provide immediate feedback
  });

  // Show notification function
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type, visible: true });
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Fetch user data when dialog opens
  useEffect(() => {
    if (open && id) {
      const fetchStudentData = async () => {
        setIsLoading(true);
        try {
          const response = await checkUser();
          console.log(response.data);
          if (response.data) {
            const studentData = response.data;
            form.reset({
              userName: studentData.userName || "",
              dob: studentData.dob || "",
              gender: studentData.gender || "",
              cityOfBirth: studentData.cityOfBirth || "",
              countryOfBirth: studentData.countryOfBirth || "",
              nationality: studentData.nationality || "",
              countryOfResidence: studentData.countryOfResidence || "",
              address: studentData.address || "",
              mobile: studentData.mobile || "",
              email: studentData.email || "",
              whatsapp: studentData.whatsapp || "",
              passportNumber: studentData.passportNumber || "",
              passportCountry: studentData.passportCountry || "",
              passportExpiry: studentData.passportExpiry || "",
              emergencyName: studentData.emergencyName || "",
              emergencyRelation: studentData.emergencyRelation || "",
              emergencyPhone: studentData.emergencyPhone || "",
              emergencyEmail: studentData.emergencyEmail || "",
              hsInstitution: studentData.hsInstitution || "",
              hsCountry: studentData.hsCountry || "",
              hsBoard: studentData.hsBoard || "",
              hsEndDate: studentData.hsEndDate || "",
              hsGrade: studentData.hsGrade || "",
            });
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
          showNotification("Failed to load your profile data", "error");
        } finally {
          setIsLoading(false);
        }
      };

      fetchStudentData();
    }
  }, [id, form, open]);

  // Handle form errors to prevent unwanted scrolling
  useEffect(() => {
    const hasErrors = Object.keys(form.formState.errors).length > 0;
    if (hasErrors && form.formState.isSubmitted) {
      // Find the first field with an error
      const firstErrorField = Object.keys(form.formState.errors)[0];
      const element = document.getElementById(firstErrorField);
      
      // If the element exists, scroll to it smoothly within the ScrollArea
      if (element) {
        const scrollArea = document.querySelector('.scroll-area');
        if (scrollArea) {
          scrollArea.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [form.formState.errors, form.formState.isSubmitted]);

  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        const response = await editByStudent(data, id);
        if (response.status === 200) {
          showNotification("Your profile has been updated successfully", "success");
          // Keep the form open with the data
        }
      } catch (err) {
        console.error("An error occurred", err);
        showNotification("Failed to update your profile", "error");
      }
    });
  };

  const Label = ({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const FormField = ({ 
    id, 
    label, 
    required = false, 
    children 
  }: { 
    id: string; 
    label: string; 
    required?: boolean; 
    children: React.ReactNode 
  }) => {
    const error = form.formState.errors[id as keyof typeof form.formState.errors];
    
    return (
      <div>
        <Label htmlFor={id} required={required}>{label}</Label>
        {children}
        {error && (
          <p className="text-red-500 text-xs mt-1">
            {error.message as string}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Simple notification */}
      {notification.visible && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-md transition-opacity duration-300 ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary border-primary hover:bg-primary/10"
          >
            Fill Your Application
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-primary text-2xl font-bold">
              Student Profile Form
            </DialogTitle>
            <DialogDescription className="text-secondary">
              Please fill in the required personal and academic information.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ScrollArea className="flex-grow pr-4 scroll-area">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 text-sm"
              >
                <div>
                  <h4 className="text-primary font-semibold text-lg mb-2">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="userName" label="Full Name" required>
                      <Input 
                        id="userName"
                        placeholder="Full Name" 
                        {...form.register("userName")} 
                        className={form.formState.errors.userName ? "border-red-500" : ""}
                      />
                    </FormField>
                    
                    <FormField id="dob" label="Date of Birth (as per passport)">
                      <DatePicker
                    
                        value={form.watch("dob")}
                        onChange={(value) => form.setValue("dob", value)}
                      />
                    </FormField>
                    
                    <FormField id="gender" label="Gender">
                      <Input 
                        id="gender"
                        placeholder="Gender" 
                        {...form.register("gender")} 
                      />
                    </FormField>
                    
                    <FormField id="cityOfBirth" label="City of Birth">
                      <Input 
                        id="cityOfBirth"
                        placeholder="City of Birth" 
                        {...form.register("cityOfBirth")} 
                      />
                    </FormField>
                    
                    <FormField id="countryOfBirth" label="Country of Birth">
                      <Input 
                        id="countryOfBirth"
                        placeholder="Country of Birth" 
                        {...form.register("countryOfBirth")} 
                      />
                    </FormField>
                    
                    <FormField id="nationality" label="Nationality">
                      <Input 
                        id="nationality"
                        placeholder="Nationality" 
                        {...form.register("nationality")} 
                      />
                    </FormField>
                    
                    <FormField id="countryOfResidence" label="Country of Residence">
                      <Input 
                        id="countryOfResidence"
                        placeholder="Country of Residence" 
                        {...form.register("countryOfResidence")} 
                      />
                    </FormField>
                    
                    <FormField id="address" label="Permanent Address">
                      <Input 
                        id="address"
                        placeholder="Permanent Address" 
                        {...form.register("address")} 
                      />
                    </FormField>
                    
                    <FormField id="mobile" label="Phone Number">
                      <Input 
                        id="mobile"
                        placeholder="Phone Number" 
                        {...form.register("mobile")} 
                      />
                    </FormField>
                    
                    <FormField id="email" label="Email Address">
                      <Input 
                        id="email"
                        placeholder="Email Address" 
                        {...form.register("email")} 
                        className={form.formState.errors.email ? "border-red-500" : ""}
                      />
                    </FormField>
                    
                    <FormField id="whatsapp" label="WhatsApp Number">
                      <Input 
                        id="whatsapp"
                        placeholder="WhatsApp Number" 
                        {...form.register("whatsapp")} 
                      />
                    </FormField>
                    
                    <FormField id="passportNumber" label="Passport Number" required>
                      <Input 
                        id="passportNumber"
                        placeholder="Passport Number" 
                        {...form.register("passportNumber")} 
                        className={form.formState.errors.passportNumber ? "border-red-500" : ""}
                      />
                    </FormField>
                    
                    <FormField id="passportCountry" label="Passport Issue Country">
                      <Input 
                        id="passportCountry"
                        placeholder="Passport Issue Country" 
                        {...form.register("passportCountry")} 
                      />
                    </FormField>
                    
                    <FormField id="passportExpiry" label="Passport Expiry Date">
                      <DatePicker
                
                        value={form.watch("passportExpiry")}
                        onChange={(value) => form.setValue("passportExpiry", value)}
                      />
                    </FormField>
                  </div>
                </div>

                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="emergencyName" label="Name" required>
                      <Input 
                        id="emergencyName"
                        placeholder="Name" 
                        {...form.register("emergencyName")} 
                        className={form.formState.errors.emergencyName ? "border-red-500" : ""}
                      />
                    </FormField>
                    
                    <FormField id="emergencyRelation" label="Relation">
                      <Input 
                        id="emergencyRelation"
                        placeholder="Relation" 
                        {...form.register("emergencyRelation")} 
                      />
                    </FormField>
                    
                    <FormField id="emergencyPhone" label="Mobile Number">
                      <Input 
                        id="emergencyPhone"
                        placeholder="Mobile Number" 
                        {...form.register("emergencyPhone")} 
                      />
                    </FormField>
                    
                    <FormField id="emergencyEmail" label="Email Address">
                      <Input 
                        id="emergencyEmail"
                        placeholder="Email Address" 
                        {...form.register("emergencyEmail")} 
                      />
                    </FormField>
                  </div>
                </div>

                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    High School / 10th Education
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="hsInstitution" label="Institution Name">
                      <Input 
                        id="hsInstitution"
                        placeholder="Institution Name" 
                        {...form.register("hsInstitution")} 
                      />
                    </FormField>
                    
                    <FormField id="hsCountry" label="Country">
                      <Input 
                        id="hsCountry"
                        placeholder="Country" 
                        {...form.register("hsCountry")} 
                      />
                    </FormField>
                    
                    <FormField id="hsBoard" label="Board/University">
                      <Input 
                        id="hsBoard"
                        placeholder="Board/University" 
                        {...form.register("hsBoard")} 
                      />
                    </FormField>
                    
                    <FormField id="hsEndDate" label="High School Completion Date">
                      <DatePicker
                      
                        value={form.watch("hsEndDate")}
                        onChange={(value) => form.setValue("hsEndDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="hsGrade" label="Grade / CGPA">
                      <Input 
                        id="hsGrade"
                        placeholder="Grade / CGPA" 
                        {...form.register("hsGrade")} 
                      />
                    </FormField>
                  </div>
                </div>

                <div className="flex justify-end pt-4 pb-6">
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}