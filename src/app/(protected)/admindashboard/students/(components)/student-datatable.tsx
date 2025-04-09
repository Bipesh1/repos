"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import UniversityStatusUpdate from "./student-update";
import { useState, useEffect } from "react";
import ChatDialog from "@/app/(protected)/components/chatdialog";
import { fetchCourseById } from "@/app/(protected)/actions/course";

export function StudentDataTable({
  data,
}:{
  data:any
}) {
  console.log(data);
  // State to store fetched course names
  const [courseNames, setCourseNames] = useState({});
  const [loading, setLoading] = useState(false);

  // Extract all unique course IDs from the data
  useEffect(() => {
    const fetchCourseNames = async () => {
      setLoading(true);
      const courseIds = new Set();
      
      // Collect all course IDs
      data.forEach((item:any) => {
        if (item.university && Array.isArray(item.university)) {
          item.university.forEach((uni:any) => {
            if (uni.course) {
              courseIds.add(uni.course);
            }
          });
        }
      });
      
      // Fetch course names for all IDs
      const courseNameMap = {};
      
      await Promise.all(
        Array.from(courseIds).map(async (courseId) => {
          try {
            const response = await fetchCourseById(courseId);
            console.log(response)
            if (response.data?.course && response.data?.course?.title) {
              courseNameMap[courseId] = response.data.course.title;
            } else {
              courseNameMap[courseId] = "Unknown Course";
            }
          } catch (error) {
            console.error(`Error fetching course ${courseId}:`, error);
            courseNameMap[courseId] = "Error Loading Course";
          }
        })
      );
      
      setCourseNames(courseNameMap);
      setLoading(false);
    };
    
    if (data && data.length > 0) {
      fetchCourseNames();
    }
  }, [data]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "userName",
      header: "User Name",
    },
    {
      accessorKey: "tests",
      header: "Test",
    },
    {
      accessorKey: "link",
      header: "Drive Link",
    },
    {
      id: "courses",
      header: "Applied Courses",
      cell: ({ row }) => {
        const item = row.original;
        
        if (item.university && Array.isArray(item.university)) {
          // Get courses from all universities where course field exists
          const coursesInfo = item.university
            .filter((uni:any) => uni.course)
            .map((uni:any) => {
              const courseName = courseNames[uni.course] || "Loading...";
              return courseName;
            });
          
          return coursesInfo.length > 0 ? 
            (loading ? "Loading courses..." : coursesInfo.join(', ')) : 
            'No course information';
        }
        return 'No course data';
      }
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        const [chatOpen, setChatOpen] = useState(false);
        
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setChatOpen(true)}>
                  Chat
                </DropdownMenuItem>
                <UniversityStatusUpdate id={item._id}/>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ChatDialog
              open={chatOpen}
              onOpenChange={setChatOpen}
              channelId={`student_${item._id}_counselor_${item.counselor?.id}`}
              currentUser={{
                id: item.counselor?.id || "", // Counselor's ID
                name: "Counselor" // Or fetch counselor name
              }}
            />
          </>
        );
      }
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="whitespace-normal break-words max-w-[300px] overflow-hidden"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}