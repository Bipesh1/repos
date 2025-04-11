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

const profileSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string(),
  cityOfBirth: z.string(),
  countryOfBirth: z.string(),
  nationality: z.string(),
  countryOfResidence: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  passportNumber: z.string(),
  passportCountry: z.string(),
  passportExpiry: z.string(),
  emergencyName: z.string(),
  emergencyRelation: z.string(),
  emergencyPhone: z.string(),
  emergencyEmail: z.string(),
  hsInstitution: z.string(),
  hsCountry: z.string(),
  hsBoard: z.string(),
  hsEndDate: z.string(),
  hsGrade: z.string(),
});

export function StudentProfileDialog() {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: "",
      cityOfBirth: "",
      countryOfBirth: "",
      nationality: "",
      countryOfResidence: "",
      address: "",
      phone: "",
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
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
          Fill Your Application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-primary text-2xl font-bold">
            Student Profile Form
          </DialogTitle>
          <DialogDescription className="text-secondary">
            Please fill in the required personal and academic information.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[65vh] pr-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-sm">
            <div>
              <h4 className="text-primary font-semibold text-lg mb-2">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Full Name" {...form.register("fullName")} />
                <DatePicker
                  value={form.watch("dateOfBirth")}
                  onChange={(value) => form.setValue("dateOfBirth", value)}
                />
                <Input placeholder="Gender" {...form.register("gender")} />
                <Input placeholder="City of Birth" {...form.register("cityOfBirth")} />
                <Input placeholder="Country of Birth" {...form.register("countryOfBirth")} />
                <Input placeholder="Nationality" {...form.register("nationality")} />
                <Input placeholder="Country of Residence" {...form.register("countryOfResidence")} />
                <Input placeholder="Permanent Address" {...form.register("address")} />
                <Input placeholder="Phone Number" {...form.register("phone")} />
                <Input placeholder="Email Address" {...form.register("email")} />
                <Input placeholder="WhatsApp Number" {...form.register("whatsapp")} />
                <Input placeholder="Passport Number" {...form.register("passportNumber")} />
                <Input placeholder="Passport Issue Country" {...form.register("passportCountry")} />
                <DatePicker
                  value={form.watch("passportExpiry")}
                  onChange={(value) => form.setValue("passportExpiry", value)}
                />
              </div>
            </div>

            <div>
              <h4 className="text-primary font-semibold text-lg mt-6 mb-2">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Name" {...form.register("emergencyName")} />
                <Input placeholder="Relation" {...form.register("emergencyRelation")} />
                <Input placeholder="Mobile Number" {...form.register("emergencyPhone")} />
                <Input placeholder="Email Address" {...form.register("emergencyEmail")} />
              </div>
            </div>

            <div>
              <h4 className="text-primary font-semibold text-lg mt-6 mb-2">High School / 10th Education</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Institution Name" {...form.register("hsInstitution")} />
                <Input placeholder="Country" {...form.register("hsCountry")} />
                <Input placeholder="Board/University" {...form.register("hsBoard")} />
                <Input placeholder="Year of Completion" {...form.register("hsEndDate")} />
                <Input placeholder="Grade / CGPA" {...form.register("hsGrade")} />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
                Submit
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}