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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
 
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ColorRing } from "react-loader-spinner";
import { Label } from "@/components/ui/label"
import { blogFormSchema } from "@/formschemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save} from "lucide-react";
import { useState, useTransition } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBlog } from "@/app/(protected)/actions/blog";
import Tiptap from "@/components/Tiptap";

export default function BlogsCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File[]>([]); // Ensure it's an array
  const [imagePreview, setImagePreview] = useState<string[]>([]); // Ensure it's an array

  

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      priority:"",
      title:"",
      slug:"",
      category:"",
      content:"",
      tags:"",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(files) {
      const newImages = Array.from(files);
      setImage((prev) => [...prev, ...newImages]); // Now prev is always an array
  
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]); // Also ensures prev is an array
    }
  };

  const handleImageRemove = (index: number) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    try {
      await startTransition(async () => {
        const formData = new FormData();
    
        formData.append("priority", values.priority);
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("category", values.category);
        formData.append("content", values.content);
        formData.append("tags", values.tags);
    
        if(image.length<1){
          toast.error('Select at least one image.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            return;
        }

        image.forEach((file) => formData.append("images", file));
    
        try {
          const response = await createBlog(formData);
    
    
          // Modify the condition to match the backend response structure
          if (response.data?.success === true || response.msg === "Created Succesfully") {
            // Reset form and state
            form.reset();
            setImage([]);
            setImagePreview([]);
            setIsOpen(false);
          } else {
            // Handle error cases
            toast.error('Blog Creation error. Maybe image extension may be incorrect or data may be duplicated.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
          }
        } catch (serverError) {
          console.error("Server error:", serverError);
          window.alert("An error occurred while creating the blog");
        }
      });
    } catch (transitionError) {
      console.error("Transition error:", transitionError);
      window.alert("An unexpected error occurred");
    }
  };
  
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="float-end text-primary border px-2 py-1 rounded-md hover:text-primary/70 transition-all">
        Create
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
        <ToastContainer />
          <SheetTitle>Add Blog</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 py-10"
          >
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Priority of this blog"
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Blog Title"
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Slug"
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
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                  <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mx-3 bg-gray-200" variant="secondary">Open Text Editor</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Content</DialogTitle>
                        <DialogDescription>
                          Enter the blog contents here
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Content
                          </Label>
                          {/* <textarea
                                        className="bg-white text-black"
                                          placeholder="Blog Content..."
                                          {...field}
                                  /> */}
                                  <Tiptap content={field.value} setContent={field.onChange} />
                        </div>
                          
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                </DialogContent>
                    
                  </Dialog>
                    
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
                           placeholder="tag1, tag2, ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


            <div>
              <FormLabel>Blog Images</FormLabel>
              <label className="cursor-pointer border mx-3 text-sm px-3 py-1 rounded-md bg-gray-200 inline-block">
                Choose Files
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img src={preview} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
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

            

            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <LoaderCircle size={16} className=" animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Add Blog
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
