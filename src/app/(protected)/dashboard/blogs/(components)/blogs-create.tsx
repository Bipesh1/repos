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
import { LoaderCircle, Save } from "lucide-react";
import { useState, useTransition, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { createBlog } from "@/app/(protected)/actions/blog";

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
            <div>
              <FormLabel>Blog Images</FormLabel>
              <label className="cursor-pointer border mx-3 text-sm px-3 py-1 rounded-md bg-gray-200 inline-block">
                Choose Files
                <Input type="file" multiple onChange={handleImageChange} className="hidden" />
              </label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                      onClick={() => handleImageRemove(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
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
