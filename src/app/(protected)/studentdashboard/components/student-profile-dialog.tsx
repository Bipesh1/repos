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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  // Personal Information
  userName: z.string().min(1, "Full Name is required"),
  gender: z.string().optional(),
  cityOfBirth: z.string().optional(),
  countryOfBirth: z.string().optional(),
  dob: z.string().optional(),
  nationality: z.string().optional(),
  countryOfResidence: z.string().optional(),
  address: z.string().optional(),
  mobile: z.coerce.string().optional(),
  email: z.string().email().optional(),
  maritalStatus: z.string().optional(),
  
  // Contact & Passport Information
  whatsapp: z.string().optional(),
  passportNumber: z.string().min(1, "Passport Number is required"),
  passportCountry: z.string().optional(),
  passportExpiry: z.string().optional(),
  
  // Emergency Contact
  emergencyName: z.string().min(1, "Emergency Contact Name is required"),
  emergencyRelation: z.string().optional(),
  emergencyPhone: z.coerce.string().optional(),
  emergencyEmail: z.string().optional(),
  
  // School Education
  schlInstitution: z.string().optional(),
  schlCountry: z.string().optional(),
  schlBoard: z.string().optional(),
  schlEndDate: z.string().optional(),
  schlGrade: z.string().optional(),
  
  // High School Education
  hsInstitution: z.string().optional(),
  hsCountry: z.string().optional(),
  hsBoard: z.string().optional(),
  hsStream: z.string().optional(),
  hsStartDate: z.string().optional(),
  hsEndDate: z.string().optional(),
  hsGrade: z.string().optional(),
  
  // Graduation Education
  gradInstitution: z.string().optional(),
  gradCountry: z.string().optional(),
  gradBoard: z.string().optional(),
  gradStream: z.string().optional(),
  gradStartDate: z.string().optional(),
  gradEndDate: z.string().optional(),
  gradGrade: z.string().optional(),
  
  // Post Graduation Education
  postgradInstitution: z.string().optional(),
  postgradCountry: z.string().optional(),
  postgradBoard: z.string().optional(),
  postgradStream: z.string().optional(),
  postgradStartDate: z.string().optional(),
  postgradEndDate: z.string().optional(),
  postgradGrade: z.string().optional(),
  
  // Work Experience
  workExpOrg: z.string().optional(),
  workExpAdd: z.string().optional(),
  workExpPos: z.string().optional(),
  workExpFrom: z.string().optional(),
  workExpTo: z.string().optional(),
  
  // Test Scores
  testName: z.string().optional(),
  testScore: z.string().optional(),
  testDate: z.string().optional(),
  engLangTest: z.string().optional(),
  engTestScore: z.string().optional(),
  engTestDate: z.string().optional(),
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
      gender: "",
      cityOfBirth: "",
      countryOfBirth: "",
      dob: "",
      nationality: "",
      countryOfResidence: "",
      address: "",
      mobile: "",
      email: "",
      maritalStatus: "",
      whatsapp: "",
      passportNumber: "",
      passportCountry: "",
      passportExpiry: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
      emergencyEmail: "",
      schlInstitution: "",
      schlCountry: "",
      schlBoard: "",
      schlEndDate: "",
      schlGrade: "",
      hsInstitution: "",
      hsCountry: "",
      hsBoard: "",
      hsStream: "",
      hsStartDate: "",
      hsEndDate: "",
      hsGrade: "",
      gradInstitution: "",
      gradCountry: "",
      gradBoard: "",
      gradStream: "",
      gradStartDate: "",
      gradEndDate: "",
      gradGrade: "",
      postgradInstitution: "",
      postgradCountry: "",
      postgradBoard: "",
      postgradStream: "",
      postgradStartDate: "",
      postgradEndDate: "",
      postgradGrade: "",
      workExpOrg: "",
      workExpAdd: "",
      workExpPos: "",
      workExpFrom: "",
      workExpTo: "",
      testName: "",
      testScore: "",
      testDate: "",
      engLangTest: "",
      engTestScore: "",
      engTestDate: "",
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
          if (response.data) {
            const studentData = response.data;
            form.reset({
              userName: studentData.userName || "",
              gender: studentData.gender || "",
              cityOfBirth: studentData.cityOfBirth || "",
              countryOfBirth: studentData.countryOfBirth || "",
              dob: studentData.dob || "",
              nationality: studentData.nationality || "",
              countryOfResidence: studentData.countryOfResidence || "",
              address: studentData.address || "",
              mobile: studentData.mobile?.toString() || "",
              email: studentData.email || "",
              maritalStatus: studentData.maritalStatus || "",
              whatsapp: studentData.whatsapp || "",
              passportNumber: studentData.passportNumber || "",
              passportCountry: studentData.passportCountry || "",
              passportExpiry: studentData.passportExpiry || "",
              emergencyName: studentData.emergencyName || "",
              emergencyRelation: studentData.emergencyRelation || "",
              emergencyPhone: studentData.emergencyPhone || "",
              emergencyEmail: studentData.emergencyEmail || "",
              schlInstitution: studentData.schlInstitution || "",
              schlCountry: studentData.schlCountry || "",
              schlBoard: studentData.schlBoard || "",
              schlEndDate: studentData.schlEndDate || "",
              schlGrade: studentData.schlGrade || "",
              hsInstitution: studentData.hsInstitution || "",
              hsCountry: studentData.hsCountry || "",
              hsBoard: studentData.hsBoard || "",
              hsStream: studentData.hsStream || "",
              hsStartDate: studentData.hsStartDate || "",
              hsEndDate: studentData.hsEndDate || "",
              hsGrade: studentData.hsGrade || "",
              gradInstitution: studentData.gradInstitution || "",
              gradCountry: studentData.gradCountry || "",
              gradBoard: studentData.gradBoard || "",
              gradStream: studentData.gradStream || "",
              gradStartDate: studentData.gradStartDate || "",
              gradEndDate: studentData.gradEndDate || "",
              gradGrade: studentData.gradGrade || "",
              postgradInstitution: studentData.postgradInstitution || "",
              postgradCountry: studentData.postgradCountry || "",
              postgradBoard: studentData.postgradBoard || "",
              postgradStream: studentData.postgradStream || "",
              postgradStartDate: studentData.postgradStartDate || "",
              postgradEndDate: studentData.postgradEndDate || "",
              postgradGrade: studentData.postgradGrade || "",
              workExpOrg: studentData.workExpOrg || "",
              workExpAdd: studentData.workExpAdd || "",
              workExpPos: studentData.workExpPos || "",
              workExpFrom: studentData.workExpFrom || "",
              workExpTo: studentData.workExpTo || "",
              testName: studentData.testName || "",
              testScore: studentData.testScore || "",
              testDate: studentData.testDate || "",
              engLangTest: studentData.engLangTest || "",
              engTestScore: studentData.engTestScore || "",
              engTestDate: studentData.engTestDate || "",
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
                {/* Personal Information Section */}
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
                      <Select
                        onValueChange={(value) => form.setValue("gender", value)}
                        value={form.watch("gender")}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    
                    <FormField id="maritalStatus" label="Marital Status">
                      <Select
                        onValueChange={(value) => form.setValue("maritalStatus", value)}
                        value={form.watch("maritalStatus")}
                      >
                        <SelectTrigger id="maritalStatus">
                          <SelectValue placeholder="Select Marital Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Textarea 
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
                  </div>
                </div>

                {/* Passport Information Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    Passport Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {/* Emergency Contact Section */}
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

                {/* Educational Information - School Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    School Education (Class 10th)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="schlInstitution" label="Institution Name">
                      <Input 
                        id="schlInstitution"
                        placeholder="Institution Name" 
                        {...form.register("schlInstitution")} 
                      />
                    </FormField>
                    
                    <FormField id="schlCountry" label="Country">
                      <Input 
                        id="schlCountry"
                        placeholder="Country" 
                        {...form.register("schlCountry")} 
                      />
                    </FormField>
                    
                    <FormField id="schlBoard" label="Board">
                      <Input 
                        id="schlBoard"
                        placeholder="Board" 
                        {...form.register("schlBoard")} 
                      />
                    </FormField>
                    
                    <FormField id="schlEndDate" label="Completion Date">
                      <DatePicker
                        value={form.watch("schlEndDate")}
                        onChange={(value) => form.setValue("schlEndDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="schlGrade" label="Grade / CGPA / Percentage">
                      <Input 
                        id="schlGrade"
                        placeholder="Grade / CGPA / Percentage" 
                        {...form.register("schlGrade")} 
                      />
                    </FormField>
                  </div>
                </div>

                {/* Educational Information - High School Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    High School Education (Class 12th)
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
                    
                    <FormField id="hsBoard" label="Board">
                      <Input 
                        id="hsBoard"
                        placeholder="Board" 
                        {...form.register("hsBoard")} 
                      />
                    </FormField>
                    
                    <FormField id="hsStream" label="Stream/Specialization">
                      <Input 
                        id="hsStream"
                        placeholder="Stream/Specialization" 
                        {...form.register("hsStream")} 
                      />
                    </FormField>
                    
                    <FormField id="hsStartDate" label="Start Date">
                      <DatePicker
                        value={form.watch("hsStartDate")}
                        onChange={(value) => form.setValue("hsStartDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="hsEndDate" label="Completion Date">
                      <DatePicker
                        value={form.watch("hsEndDate")}
                        onChange={(value) => form.setValue("hsEndDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="hsGrade" label="Grade / CGPA / Percentage">
                      <Input 
                        id="hsGrade"
                        placeholder="Grade / CGPA / Percentage" 
                        {...form.register("hsGrade")} 
                      />
                    </FormField>
                  </div>
                </div>

                {/* Educational Information - Graduation Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    Graduation Education (Bachelor's Degree)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="gradInstitution" label="Institution Name">
                      <Input 
                        id="gradInstitution"
                        placeholder="Institution Name" 
                        {...form.register("gradInstitution")} 
                      />
                    </FormField>
                    
                    <FormField id="gradCountry" label="Country">
                      <Input 
                        id="gradCountry"
                        placeholder="Country" 
                        {...form.register("gradCountry")} 
                      />
                    </FormField>
                    
                    <FormField id="gradBoard" label="University/Board">
                      <Input 
                        id="gradBoard"
                        placeholder="University/Board" 
                        {...form.register("gradBoard")} 
                      />
                    </FormField>
                    
                    <FormField id="gradStream" label="Degree/Major">
                      <Input 
                        id="gradStream"
                        placeholder="Degree/Major" 
                        {...form.register("gradStream")} 
                      />
                    </FormField>
                    
                    <FormField id="gradStartDate" label="Start Date">
                      <DatePicker
                        value={form.watch("gradStartDate")}
                        onChange={(value) => form.setValue("gradStartDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="gradEndDate" label="Completion Date">
                      <DatePicker
                        value={form.watch("gradEndDate")}
                        onChange={(value) => form.setValue("gradEndDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="gradGrade" label="Grade / CGPA / Percentage">
                      <Input 
                        id="gradGrade"
                        placeholder="Grade / CGPA / Percentage" 
                        {...form.register("gradGrade")} 
                      />
                    </FormField>
                  </div>
                </div>

                {/* Educational Information - Post Graduation Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    Post Graduation Education (Master's Degree) - If Applicable
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="postgradInstitution" label="Institution Name">
                      <Input 
                        id="postgradInstitution"
                        placeholder="Institution Name" 
                        {...form.register("postgradInstitution")} 
                      />
                    </FormField>
                    
                    <FormField id="postgradCountry" label="Country">
                      <Input 
                        id="postgradCountry"
                        placeholder="Country" 
                        {...form.register("postgradCountry")} 
                      />
                    </FormField>
                    
                    <FormField id="postgradBoard" label="University/Board">
                      <Input 
                        id="postgradBoard"
                        placeholder="University/Board" 
                        {...form.register("postgradBoard")} 
                      />
                    </FormField>
                    
                    <FormField id="postgradStream" label="Degree/Major">
                      <Input 
                        id="postgradStream"
                        placeholder="Degree/Major" 
                        {...form.register("postgradStream")} 
                      />
                    </FormField>
                    
                    <FormField id="postgradStartDate" label="Start Date">
                      <DatePicker
                        value={form.watch("postgradStartDate")}
                        onChange={(value) => form.setValue("postgradStartDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="postgradEndDate" label="Completion Date">
                      <DatePicker
                        value={form.watch("postgradEndDate")}
                        onChange={(value) => form.setValue("postgradEndDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="postgradGrade" label="Grade / CGPA / Percentage">
                      <Input 
                        id="postgradGrade"
                        placeholder="Grade / CGPA / Percentage" 
                        {...form.register("postgradGrade")} 
                      />
                    </FormField>
                  </div>
                </div>

                {/* Work Experience Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    Work Experience (If Applicable)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="workExpOrg" label="Organization">
                      <Input 
                        id="workExpOrg"
                        placeholder="Organization Name" 
                        {...form.register("workExpOrg")} 
                      />
                    </FormField>
                    
                    <FormField id="workExpPos" label="Position">
                      <Input 
                        id="workExpPos"
                        placeholder="Position/Title" 
                        {...form.register("workExpPos")} 
                      />
                    </FormField>

                    <FormField id="workExpAdd" label="Address">
                      <Textarea 
                        id="workExpAdd"
                        placeholder="Organization Address" 
                        {...form.register("workExpAdd")} 
                      />
                    </FormField>
                    
                    <FormField id="workExpFrom" label="From Date">
                      <DatePicker
                        value={form.watch("workExpFrom")}
                        onChange={(value) => form.setValue("workExpFrom", value)}
                      />
                    </FormField>
                    
                    <FormField id="workExpTo" label="To Date">
                      <DatePicker
                        value={form.watch("workExpTo")}
                        onChange={(value) => form.setValue("workExpTo", value)}
                      />
                    </FormField>
                  </div>
                </div>

                {/* Test Scores Section */}
                <div>
                  <h4 className="text-primary font-semibold text-lg mt-6 mb-2">
                    Test Scores
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField id="testName" label="Test Name (e.g., SAT, ACT)">
                      <Input 
                        id="testName"
                        placeholder="Test Name" 
                        {...form.register("testName")} 
                      />
                    </FormField>
                    
                    <FormField id="testScore" label="Test Score">
                      <Input 
                        id="testScore"
                        placeholder="Test Score" 
                        {...form.register("testScore")} 
                      />
                    </FormField>
                    
                    <FormField id="testDate" label="Test Date">
                      <DatePicker
                        value={form.watch("testDate")}
                        onChange={(value) => form.setValue("testDate", value)}
                      />
                    </FormField>
                    
                    <FormField id="EngLangTest" label="English Language Test (e.g., IELTS, TOEFL)">
                      <Input 
                        id="EngLangTest"
                        placeholder="English Language Test" 
                        {...form.register("engLangTest")} 
                      />
                    </FormField>
                    
                    <FormField id="EngTestScore" label="English Test Score">
                      <Input 
                        id="EngTestScore"
                        placeholder="Test Score" 
                        {...form.register("engTestScore")} 
                      />
                    </FormField>
                    
                    <FormField id="EngTestDate" label="English Test Date">
                      <DatePicker
                        value={form.watch("engTestDate")}
                        onChange={(value) => form.setValue("engTestDate", value)}
                      />
                    </FormField>
                  </div>
                </div>

                {/* Form Submission */}
                <div className="flex justify-end gap-4 pt-6 sticky bottom-0 bg-background pb-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpen(false)}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isPending ? (
                      <>
                        <span className="mr-2">Saving...</span>
                        <span className="animate-spin">↻</span>
                      </>
                    ) : "Save Changes"}
                  </Button>
                </div>
              </form>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}