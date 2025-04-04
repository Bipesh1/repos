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
import { LoaderCircle, Save, FilePenLine } from "lucide-react";
import { useEffect, useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateBlog, getBlog } from "@/app/(protected)/actions/blog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

// Dynamically import the Quill-based RichTextEditor with SSR disabled.
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  ),
});

// Define a handle type for the RichTextEditor.
type RichTextEditorHandle = {
  getContent: () => string;
};

export default function BlogEdit({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [oldImagePreviews, setOldImagePreviews] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [showOld, setShowOld] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contentEditorInitialValue, setContentEditorInitialValue] = useState("");

  // Create a ref for the rich text editor used for blog content.
  const contentEditorRef = useRef<RichTextEditorHandle>(null);

  // Initialize the form with blogFormSchema.
  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      priority: "",
      title: "",
      slug: "",
      category: "",
      content: "",
      tags: "",
    },
  });

  // Fetch blog data when the sheet opens.
  const fetchBlog = () => {
    startTransition(async () => {
      const response: any = await getBlog(id);
      if (response.data) {
        setContentEditorInitialValue(response.data.content);
        // Reset the form with the fetched blog data.
        form.reset({
          priority: response.data.priority,
          title: response.data.title,
          slug: response.data.slug,
          category: response.data.category,
          content: response.data.content, // Initial content for the editor.
          tags: response.data.tags,
        });
        // Extract and set old image URLs.
        const imageUrls = response.data.images.map((img: any) => img.url);
        setOldImagePreviews(imageUrls);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchBlog();
    } else {
      setIsLoading(true);
    }
  }, [id, isOpen]);

  // New image handling.
  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowOld(false);
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setNewImages((prev) => [...prev, ...newFiles]);
      const previews = newFiles.map((file) => URL.createObjectURL(file));
      setNewImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleNewImageRemove = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // On submit, build the FormData and call updateBlog.
  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("priority", values.priority);
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("category", values.category);
        formData.append("tags", values.tags);
        // Get the latest content from the RichTextEditor.
        const contentFromEditor = contentEditorRef.current?.getContent() || "";
        formData.append("content", contentFromEditor);
        // Append any new images.
        newImages.forEach((file) => formData.append("images", file));
        await updateBlog(formData, id);
        form.reset();
        setNewImages([]);
        setNewImagePreviews([]);
        setIsOpen(false);
        toast.success("Blog updated successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      });
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Failed to update blog", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <ToastContainer />
      <SheetTrigger asChild>
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground">
          <FilePenLine size={16} />
          <p>Update Blog</p>
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll w-full max-w-md sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Update Blog</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <LoaderCircle size={24} className="animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Priority" {...field} />
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
                          initialContent={contentEditorInitialValue}
                        
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
                {showOld &&
                  oldImagePreviews.map((preview, index) => (
                    <div key={`old-${index}`} className="relative w-20 h-20 inline-block mr-2">
                      <img
                        src={preview}
                        alt="Old Preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </div>
                  ))}
                <label className="cursor-pointer border mx-3 text-sm px-3 py-1 rounded-md bg-gray-200 inline-block">
                  Choose Files
                  <Input type="file" multiple onChange={handleNewImageChange} className="hidden" />
                </label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {newImagePreviews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative w-20 h-20">
                      <img src={preview} alt="New Preview" className="h-20 w-20 object-cover rounded-md" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                        onClick={() => handleNewImageRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <Button size={"sm"} disabled={isPending} type="submit" className="mt-6">
                {isPending ? (
                  <LoaderCircle size={16} className="animate-spin mr-2" />
                ) : (
                  <Save size={16} className="mr-2" />
                )}
                Update Blog
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
}
