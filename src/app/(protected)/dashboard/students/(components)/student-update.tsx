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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { studentSchema } from "@/formschemas/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine, LoaderCircle, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  assignCounselor,
  editStudent,
  fetchStudentById,
} from "@/app/(protected)/actions/student";
import { getActiveAdmin } from "@/app/(protected)/actions/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentEdit({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [admins, setAdmins] = useState<any>([]);
  const [student, setStudent] = useState<any>(null);
  const [isAssigningCounselor, setIsAssigningCounselor] = useState<boolean>(false);

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      userName: "",
      email: "",
      mobile: "",
      password: "",
      category: "",
      counselor: "",
      role: "user", // Adding the missing role field with default value
    },
  });

  useEffect(() => {
    const fetchStudent = () => {
      startTransition(async () => {
        const adminresponse = await getActiveAdmin();
        setAdmins(adminresponse.data);

        const response = await fetchStudentById(id);
        if (response.data) {
          const student = response.data;
          setStudent(student);
          // Set image preview if image exists

          // Reset form with all the data
          form.reset({
            userName: response.data.userName,
            email: response.data.email,
            mobile: response.data.mobile,
            password: response.data.password,
            category: response.data.category,
            counselor: response.data.counselor.id,
            role: "user",
          });
        }
      });
    };

    if (isOpen) {
      fetchStudent();
    }
  }, [id, isOpen]);

  const onSubmit = (values: z.infer<typeof studentSchema>) => {

    try {
      startTransition(async () => {
        const response = await editStudent(values, id);
        form.reset();
        setIsOpen(false);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignCounselor = async () => {
    const counselor = form.getValues("counselor");

    if (!counselor) {
      // Show an error or alert that counselor selection is required
      toast.error("Assign a counselor ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    setIsAssigningCounselor(true);
    try {
      const response = await assignCounselor({ counselor: counselor }, id);
    } catch (error) {
      console.error("Error assigning counselor:", error);
    } finally {
      setIsAssigningCounselor(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <FilePenLine size={16} />
          <p>Update</p>
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
      <ToastContainer/>
        <SheetHeader>
          <SheetTitle>Add New Students</SheetTitle>
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
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter admin name" {...field} />
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

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-tier">1000-tier</SelectItem>
                        <SelectItem value="25000-tier">25000-tier</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="counselor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counselor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a counselor" />
                      </SelectTrigger>
                      <SelectContent>
                        {admins.map((admin: any) => (
                          <SelectItem
                            key={admin._id}
                            value={admin._id.toString()}
                          >
                            {admin.adminName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <Button
                      type="button" // Important: type="button" prevents form submission
                      onClick={handleAssignCounselor}
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      disabled={isAssigningCounselor}
                    >
                      {isAssigningCounselor ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        "Assign Counselor"
                      )}
                    </Button>
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
                      <Input type="hidden" {...field} />
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
              Update Student
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
