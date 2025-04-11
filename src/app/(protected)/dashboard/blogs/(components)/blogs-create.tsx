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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogFormSchema } from "@/formschemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save, X } from "lucide-react";
import { useState, useTransition, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { createBlog } from "@/app/(protected)/actions/blog";
import Image from "next/image";

// Dynamically import the RichTextEditor (Quill-based) with SSR disabled.
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});

// Define the RichTextEditorHandle type (as used in your RichTextEditor)
type RichTextEditorHandle = {
  getContent: () => string;
};

export default function BlogsCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Create form with blogFormSchema
  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      priority: "",
      title: "",
      slug: "",
      category: "",
      tags: "",
    },
  });

  // Ref for our RichTextEditor (for the blog content)
  const contentEditorRef = useRef<RichTextEditorHandle>(null);

  // Handle multiple image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    try {
      await startTransition(async () => {
        const formData = new FormData();

        // Append simple text fields
        formData.append("priority", values.priority);
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("category", values.category);
        formData.append("tags", values.tags);

        // Get content from the RichTextEditor
        const contentFromEditor = contentEditorRef.current?.getContent() || "";
        formData.append("content", contentFromEditor);

        // Ensure at least one image is provided
        if (images.length < 1) {
          toast.error("Select at least one image.", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
          });
          return;
        }

        images.forEach((file) => formData.append("images", file));

        // Call your API endpoint
        const response = await createBlog(formData);

        // Check the response structure and display a toast
        if (response.data?.success === true || response.msg === "Created Succesfully") {
          form.reset();
          setImages([]);
          setImagePreviews([]);
          setIsOpen(false);
          toast.success("Blog created successfully", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
        } else {
          toast.error("Blog Creation error. Please check your data.", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
          });
        }
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ToastContainer />
      <SheetTrigger className="float-end text-primary border px-2 py-1 rounded-md hover:text-primary/70 transition-all">
        Create Blog
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add Blog</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-10">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input placeholder="Priority of this blog" {...field} />
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Title" {...field} />
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
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
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Rich Text Editor for Blog Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <div className="min-h-[300px] border rounded-md">
                      <RichTextEditor
                        ref={contentEditorRef}
                        initialContent={field.value}
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
                    <Input placeholder="tag1, tag2, ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload Section */}
            <div className="space-y-2">
              <FormLabel>Blog Images</FormLabel>
              <label className="cursor-pointer flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-8 h-8 mb-2 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (MAX. 5MB each)
                  </p>
                </div>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </label>

              {/* Image Previews Grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md overflow-hidden border group"
                    >
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleImageRemove(index)}
                        aria-label="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs truncate">
                          {images[index]?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button size={"sm"} disabled={isPending} type="submit" className="mt-6">
              {isPending ? <LoaderCircle size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />}
              Add Blog
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}