"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaretSortIcon } from "@radix-ui/react-icons";

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
import { truncateText } from "@/lib/truncate";
import UniversityEdit from "./university-edit";
import UniversityDelete from "./university-delete";
import { Input } from "@/components/ui/input"; // For the country filter input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // For the admission filter dropdown

export function UniversityDataTable({ data }: { data: any }) {
  // Flatten the data to make nested properties accessible
  const flattenedData = React.useMemo(() => 
    data.map((item: any) => ({
      ...item,
      countryName: item.country?.name || "N/A", // Flatten country.name to countryName
    })),
    [data] // Re-run when data changes
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            size={"sm"}
            variant="ghost"
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            University Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1 ml-2 whitespace-nowrap">
            <Avatar className="bg-gray-100 dark:bg-neutral-900 border h-6 w-6 object-scale-down">
              <AvatarImage src={item.image.url} alt="product-image" />
              <AvatarFallback className=""></AvatarFallback>
            </Avatar>
            {truncateText(item.name, 30)}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "countryName", // Use the flattened property
      header: "Country",
      cell: ({ row }) => {
        const countryName:any = row.getValue("countryName");
        return <div className="text-left">{countryName}</div>;
      },
    },
    {
      accessorKey: "admissionOpen",
      header: "Admission Status",
      cell: ({ row }) => {
        const admissionOpen = row.getValue("admissionOpen");
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              admissionOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {admissionOpen ? "Open" : "Closed"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <UniversityEdit id={item._id} />
              <UniversityDelete id={item._id} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: flattenedData, // Use the flattened data
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Debugging: Verify flattened data and column access


  return (
    <div className="rounded-md border">
      {/* Filters */}
      <div className="flex items-center gap-4 p-4">
        {/* Country Filter */}
        Filter
        <div className="flex gap-4 items-center text-primary">
        <h2>Country</h2>
        <Input
          placeholder="Filter by country..."
          value={(table.getColumn("countryName")?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            table.getColumn("countryName")?.setFilterValue(value.trim());
          }}
          className="max-w-sm"
          />
          </div>

        {/* Admission Status Filter */}
        <div className="flex gap-4 items-center text-primary">
       <h2>Admission Open</h2>
        <Select
          value={
            table.getColumn("admissionOpen")?.getFilterValue() === undefined
              ? "all"
              : table.getColumn("admissionOpen")?.getFilterValue() === true
              ? "true"
              : "false"
          }
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("admissionOpen")?.setFilterValue(undefined);
            } else {
              table.getColumn("admissionOpen")?.setFilterValue(value === "true");
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Admission Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Open</SelectItem>
            <SelectItem value="false">Closed</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>

      {/* Table */}
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}