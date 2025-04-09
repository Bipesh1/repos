"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition, useEffect } from "react";
import { checkUser } from "@/app/(protected)/actions/user";
import { applyByStudent } from "@/app/(protected)/actions/student";
import { fetchCourseByUniversity } from "@/app/(protected)/actions/course"; // New server action import
import { Loader2 } from "lucide-react";

export default function ApplyUniversity({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open) {
      try {
        // Load user data
        const response = await checkUser();
        if (response?.data) {
          setUserData(response.data);
        } else {
          setError("Failed to load user data");
        }

        // Load university courses
        setLoadingCourses(true);
        try {
          const coursesResponse = await fetchCourseByUniversity(id);
          if (coursesResponse?.data?.courses) {
            setCourses(coursesResponse.data.courses);
          }
        } catch (err) {
          console.error("Error loading courses:", err);
        } finally {
          setLoadingCourses(false);
        }
      } catch (err) {
        setError("Failed to fetch user information");
        console.error(err);
      }
    } else {
      // Reset the course selection when dialog closes
      setSelectedCourse("");
    }
  };

  const handleApply = () => {
    if (!selectedCourse) {
      setError("Please select a course to apply");
      return;
    }

    startTransition(async () => {
      try {
        const response = await applyByStudent({
          university: id,
          course: selectedCourse,
        });

        if (response.status == 200) {
          setIsOpen(false);
          // Optionally show success message
        } else {
          setError(response?.error || "Application failed");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <span className="flex text-primary cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <p>Apply Now</p>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Application</DialogTitle>
          <DialogDescription>
            Please select a course and verify your information before submitting
          </DialogDescription>
        </DialogHeader>

        {userData ? (
          <div className="grid gap-4 py-4">
            {/* Course Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-right">
                Course:
              </span>
              <div className="col-span-3">
                {loadingCourses ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-sm">Loading courses...</span>
                  </div>
                ) : courses.length > 0 ? (
                  <Select
                    onValueChange={setSelectedCourse}
                    value={selectedCourse}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course._id} value={course._id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm text-yellow-600">
                    No courses available for this university
                  </span>
                )}
              </div>
            </div>

            {/* User info fields */}
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-right">Tests:</span>
              <span className="col-span-3 text-sm">
                {userData.tests || "Not specified"}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-right">
                Marital Status:
              </span>
              <span className="col-span-3 text-sm">
                {userData.maritalStatus || "Not specified"}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-right">
                GPA:
              </span>
              <span className="col-span-3 text-sm">
                {userData.gpa || "Not specified"}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium text-right">
                Google Link:
              </span>
              <span className="col-span-3 text-sm break-all">
                {userData.link || "Not provided"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-4">
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <Loader2 className="h-6 w-6 animate-spin" />
            )}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <DialogFooter>
          <Button
            type="button"
            onClick={handleApply}
            disabled={isPending || !userData || courses.length > 0 && !selectedCourse}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              "Confirm Application"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}