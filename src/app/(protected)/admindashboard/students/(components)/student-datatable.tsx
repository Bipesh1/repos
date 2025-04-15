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
}: {
  data: any
}) {
  // State to store fetched course names
  const [courseNames, setCourseNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Extract all unique course IDs from the data
  useEffect(() => {
    const fetchCourseNames = async () => {
      setLoading(true);
      const courseIds = new Set<string>();
      
      // Collect all course IDs
      data.forEach((item: any) => {
        if (item.university && Array.isArray(item.university)) {
          item.university.forEach((uni: any) => {
            if (uni.course) {
              courseIds.add(uni.course);
            }
          });
        }
      });
      
      // Fetch course names for all IDs
      const courseNameMap: Record<string, string> = {};
      
      await Promise.all(
        Array.from(courseIds).map(async (courseId) => {
          try {
            const response = await fetchCourseById(courseId);
            if (response.data?.course?.title) {
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
      id: "testScores",
      header: "Test Scores",
      cell: ({ row }) => {
        const item = row.original;
        
        // Create an array of all test score information
        const testScores = [];
        
        // Add standard test if exists
        if (item.testName || item.testScore) {
          testScores.push({
            type: "Standard Test",
            name: item.testName || "Not specified",
            score: item.testScore,
            date: item.testDate
          });
        }
        
        // Add English test if exists
        if (item.EngLangTest || item.EngTestScore) {
          testScores.push({
            type: "English Test",
            name: item.EngLangTest || "Not specified",
            score: item.EngTestScore,
            date: item.EngTestDate
          });
        }
        
        return testScores.length > 0 ? (
          <div className="flex flex-col gap-2">
            {testScores.map((test, index) => (
              <div key={index} className="border rounded p-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{test.type}</p>
                    <p className="text-sm text-gray-600">{test.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{test.score || 'N/A'}</p>
                    {test.date && (
                      <p className="text-xs text-gray-500">
                        {new Date(test.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">No test scores available</span>
        );
      }
    },
    {
      accessorKey: "link",
      header: "Drive Link",
      cell: ({ row }) => {
        const link = row.getValue("link");
        return link ? (
          <a 
            href={link as string} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Documents
          </a>
        ) : (
          <span className="text-gray-400">No link</span>
        );
      }
    },
    {
      id: "courses",
      header: "Applied Courses",
      cell: ({ row }) => {
        const item = row.original;
        
        if (item.university && Array.isArray(item.university)) {
          const coursesInfo = item.university
            .filter((uni: any) => uni.course)
            .map((uni: any) => {
              const courseName = courseNames[uni.course] || "Loading...";
              return courseName;
            });
          
          return coursesInfo.length > 0 ? 
            (loading ? "Loading courses..." : coursesInfo.join(', ')) : 
            <span className="text-gray-400">No courses</span>;
        }
        return <span className="text-gray-400">No data</span>;
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
                id: item.counselor?.id || "",
                name: "Counselor"
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