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
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { countryFormSchema } from "@/formschemas/country";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FilePenLine } from "lucide-react";
import { z } from "zod";
import { editCountry, fetchCountryById } from "@/app/(protected)/actions/country";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CountriesEdit({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentCountry, setCurrentCountry] = useState<any>(null);

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

  useEffect(() => {
    const fetchCountry = () => {
      startTransition(async () => {
        const response = await fetchCountryById(id);
        if (response.data) {
          const country = response.data.country;
          setCurrentCountry(country);
          
          // Set image preview if image exists
          if (country.image && country.image.url) {
            setImagePreview(country.image.url);
          }
          
          // Reset form with all the data
          form.reset({
            name: country.name || "",
            priority: country.priority?.toString() || "",
            imagesAlt: country.imageAlt || "",
            publicUni: {
              undergraduate: country.publicUni?.undergraduate || "",
              masters: country.publicUni?.masters || ""
            },
            privateUni: {
              undergraduate: country.privateUni?.undergraduate || "",
              masters: country.privateUni?.masters || ""
            },
            general: {
              undergraduate: country.general?.undergraduate || "",
              masters: country.general?.masters || "",
              mba: country.general?.mba || ""
            }
          });
        }
      });
    };
    
    if(isOpen){
      fetchCountry();
    }
  }, [id, isOpen, form]);

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

  const onSubmit = (values: z.infer<typeof countryFormSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData();
        
        // Append basic form values
        formData.append('name', values.name);
        formData.append('priority', values.priority);
        
        if (values.imagesAlt) {
          formData.append('imageAlt', values.imagesAlt);
        }
        
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
        
        const response = await editCountry(formData, id);
        
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}> 
    <ToastContainer/>
      <SheetTrigger asChild>
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <FilePenLine size={16} />
          <p>Update</p>
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Update Country</SheetTitle>
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
              Update Country
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}