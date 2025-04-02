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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // You may need to import this
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { countryFormSchema } from "@/formschemas/country";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCountry } from "@/app/(protected)/actions/country";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CountriesCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  

  const form = useForm<z.infer<typeof countryFormSchema>>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      name: "",
      priority: "",
      imagesAlt: "",
      publicUni: {
        undergraduate: "",
        masters: ""
      },
      privateUni: {
        undergraduate: "",
        masters: ""
      },
      general: {
        undergraduate: "",
        masters: "",
        mba: ""
      }
    },
  });

  const onSubmit = (values: z.infer<typeof countryFormSchema>) => {
    const formData = new FormData();
    
    // Append basic form values
    formData.append('name', values.name);
    formData.append('priority', values.priority);
    
    if (values.imagesAlt) {
      formData.append('imageAlt', values.imagesAlt); // Note: backend expects imageAlt, not imagesAlt
    }
    
    // Append nested object values for universities and general info
    // For publicUni
    if (values.publicUni) {
      formData.append("publicUni", JSON.stringify(values.publicUni));

    }
    
    // For privateUni
    if (values.privateUni) {
      formData.append("privateUni", JSON.stringify(values.privateUni));
    }
    
    // For general
    if (values.general) {
      formData.append("general", JSON.stringify(values.general));
    }
    
    // Append image if exists
    if (image) {
      formData.append('image', image);
    }

    try {
      startTransition(async () => {
        const response = await createCountry(formData);
        if(response.status==400){
          toast.error("You haven't uploaded an image ", {
                   position: "top-right",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: false,
                   pauseOnHover: true,
                   draggable: true,
                   theme: "light",
                 });
 
       }else{
        form.reset();
        setImagePreview(null);
        setIsOpen(false);
       }
      });
      
    } catch (err:any) {
      
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ToastContainer/>
      <SheetTrigger className="float-end text-primary border px-2 py-1 rounded-md hover:text-primary/70 transition-all">Create</SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add Country</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-10"
          >
            {/* Basic Info Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg. USA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imagesAlt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Alt</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Country flag alt text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Country Flag Image</FormLabel>
                <div className="mt-1 flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Public University Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Public University</h3>
              
              <FormField
                control={form.control}
                name="publicUni.undergraduate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Undergraduate</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Public university undergraduate information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="publicUni.masters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Masters</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Public university masters information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Private University Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">Private University</h3>
              
              <FormField
                control={form.control}
                name="privateUni.undergraduate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Undergraduate</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Private university undergraduate information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="privateUni.masters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Masters</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Private university masters information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* General Information Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-medium">General Information</h3>
              
              <FormField
                control={form.control}
                name="general.undergraduate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Undergraduate</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="General undergraduate information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="general.masters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Masters</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="General masters information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="general.mba"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MBA</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="General MBA information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Add Country
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}