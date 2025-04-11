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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { courseFormSchema } from "@/formschemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePenLine, LoaderCircle, Save } from "lucide-react";
import { useState, useTransition, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getActiveUniversities } from "@/app/(protected)/actions/university";
import { editCourse, fetchCourseById } from "@/app/(protected)/actions/course";
import dynamic from "next/dynamic";

// Dynamically import the RichTextEditor with SSR disabled
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
};

export default function CourseEdit({id}:{
    id: string
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [universities, setUniversities] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Add states for initial content values
  const [scholarshipInitialValue, setScholarshipInitialValue] = useState("");
  const [overviewInitialValue, setOverviewInitialValue] = useState("");
  
  // Add refs for rich text editors
  const scholarshipEditorRef = useRef<RichTextEditorHandle>(null);
  const overviewEditorRef = useRef<RichTextEditorHandle>(null);
  
  const form = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      priority: "0",
      title: "",
      universityId: "",
      qualification: "",
      earliestIntake: "",
      deadline: "",
      duration: "",
      entryScore: 0,
      fee: "",
      scholarship: "",
      overview: "",
      tags:"",
      category:"",
      slug: "",
    },
  });

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await getActiveUniversities();
        setUniversities(response.data);
      } catch (error) {
        console.error("Failed to fetch universities", error);
      }
    };
    fetchUniversities();

    const fetchCourse = () => {
      setIsLoading(true);
      startTransition(async () => {
        const response = await fetchCourseById(id);
        if (response.data) {
          // Store rich text content in state to pass to editors
          setScholarshipInitialValue(response.data.course.scholarship);
          setOverviewInitialValue(response.data.course.overview);
          
          form.reset({
            priority: response.data.course.priority,
            title: response.data.course.title,
            universityId: response.data.course.university.id,
            qualification: response.data.course.qualification,
            earliestIntake: response.data.course.earliestIntake,
            deadline: response.data.course.deadline,
            duration: response.data.course.duration,
            entryScore: response.data.course.entryScore,
            fee: response.data.course.fee,
            scholarship: response.data.course.scholarship,
            overview: response.data.course.overview,
            slug: response.data.course.slug,
            tags: response.data.course.tags,
            category: response.data.course.category
          });
        }
        setIsLoading(false);
      });
    };
    
    if (isOpen) {
      fetchCourse();
    } else {
      setIsLoading(true);
    }
  }, [id, isOpen]);

  const onSubmit = (values: z.infer<typeof courseFormSchema>) => {
    try {
      startTransition(async () => {
        // Get current content from rich text editors
        const scholarshipContent = scholarshipEditorRef.current?.getContent() || "";
        const overviewContent = overviewEditorRef.current?.getContent() || "";
        
        // Create updated values with rich text content
        const updatedValues = {
          ...values,
          scholarship: scholarshipContent,
          overview: overviewContent
        };
        
        const response = await editCourse(updatedValues, id);
        
        form.reset();
        setIsOpen(false);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <FilePenLine size={16} />
          <p>Update</p>
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll w-full max-w-md sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Update Course</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoaderCircle size={24} className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bachelor of Computer Science"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="bachelor-of-computer-science"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="universityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a university" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((university: any) => (
                          <SelectItem key={university._id} value={university._id.toString()}>
                            {university.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bachelor's Degree"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="earliestIntake"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Earliest Intake</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="September 2025"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Deadline</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="June 15, 2025"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="4 years"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="entryScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entry Score/Requirements</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="GPA 3.0 or higher"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuition Fee</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$10,000 per year"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Scholarship Field with Rich Text Editor */}
              <FormField
                control={form.control}
                name="scholarship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship Information</FormLabel>
                    <FormControl>
                      <div className="min-h-[200px] border rounded-md">
                        <RichTextEditor
                          ref={scholarshipEditorRef}
                          initialContent={scholarshipInitialValue}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Overview Field with Rich Text Editor */}
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Overview</FormLabel>
                    <FormControl>
                      <div className="min-h-[300px] border rounded-md">
                        <RichTextEditor
                          ref={overviewEditorRef}
                          initialContent={overviewInitialValue}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="tag1,tag2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button size={"sm"} disabled={isPending} type="submit" className="mt-6">
                {isPending ? (
                  <LoaderCircle size={16} className="animate-spin mr-2" />
                ) : (
                  <Save size={16} className="mr-2" />
                )}
                Update Course
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}