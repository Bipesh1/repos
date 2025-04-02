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
// import { Copy } from "lucide-react"
 
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
import { Label } from "@/components/ui/label"
import { blogFormSchema } from "@/formschemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateBlog } from "@/app/(protected)/actions/blog";
import { FilePenLine } from "lucide-react";
import { getBlog } from "@/app/(protected)/actions/blog";

export default function BlogEdit({id}:{id:string}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File[]>([]); // Ensure it's an array
  const [oldImagePreview, setOldImagePreview] = useState<string[]>([]); // Ensure it's an array
  const [imagePreview, setImagePreview] = useState<string[]>([]); // Ensure it's an array
  const [showOld, setShowOld] = useState(true)

   const fetchData = ()=>{
        startTransition(async () => {
            const response:any = await getBlog(id);

            if(response.data){
             
                form.reset({
                    priority: response.data.priority,
                    title: response.data.title,
                    slug: response.data.slug,
                    category: response.data.category,
                    content: response.data.content,
                    tags: response.data.tags,
                })
            }
            const imageUrls = response.data.images.map((image:any) => image.url);
            setOldImagePreview(imageUrls);
        });
    }
     useEffect(() => {
        if(isOpen){
            fetchData();
        }
      }, [id,isOpen]);

   


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
    setShowOld(false)
    const files = e.target.files;
    if(files) {
      const newImages = Array.from(files);
      setImage((prev) => [...prev, ...newImages]); // Now prev is always an array
  
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...newPreviews]); // Also ensures prev is an array
    }
  };

  const handleImageRemove = (index: number) => {
        // Remove from new images
        setImage((prev) => prev.filter((_, i) => i !== index));
        setImagePreview((prev) => prev.filter((_, i) => i !== index));
    
};

  const onSubmit = async (values: z.infer<typeof blogFormSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData();
        
        formData.append("priority", values.priority);
        formData.append("title", values.title);
        formData.append("slug", values.slug);
        formData.append("category", values.category);
        formData.append("content", values.content);
        formData.append("tags", values.tags);
  
        // Append each image to formData
        image.forEach((file) => formData.append("images", file));
  
        const response = updateBlog(formData,id)
        form.reset();
        setIsOpen(false);
        setImage([])
        setImagePreview([])
       
      });
    } catch (err) {
      console.error("An error occurred:", err);
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
          <SheetTitle>Update University</SheetTitle>
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
                <Select onValueChange={field.onChange} value={field.value}>
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
                  <DialogContent className="sm:max-w-md">
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
                          <textarea
                                        className="bg-white text-black"
                                          placeholder="Blog Content..."
                                          {...field}
                                  />
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
                  {showOld && (
                    oldImagePreview.map((preview, index) => (
                      <div key={`old-${index}`} className="relative w-20 h-20">
                        <img src={preview} alt="Old Preview" className="h-20 w-20 object-cover rounded-md" />
                        {/* <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                          onClick={() => handleImageRemove(index, true)} // Pass true for old images
                        >
                          X
                        </button> */}
                      </div>
                    ))
                  )}

                          

                    {/* Render new images */}
                  {imagePreview.map((preview, index) => (
                        <div key={`new-${index}`} className="relative w-20 h-20">
                            <img src={preview} alt="New Preview" className="h-20 w-20 object-cover rounded-md" />
                            <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded-full"
                                onClick={() => handleImageRemove(index)} // Pass false for new images
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
              Update Blog
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
