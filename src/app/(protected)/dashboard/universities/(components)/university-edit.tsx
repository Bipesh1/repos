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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universityFormSchema } from "@/formschemas/university";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save, Upload } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FilePenLine } from "lucide-react";
import { z } from "zod";
import { useEffect } from "react";
import { getActiveCountries } from "@/app/(protected)/actions/country";
import {
  editUniversity,
  fetchUniversityById,
} from "@/app/(protected)/actions/university";
import { DatePicker } from "@/app/(protected)/components/datepicker";

export default function UniversityEdit({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    const fetchUniversity = () => {
      startTransition(async () => {
        const response = await fetchUniversityById(id);
        setImagePreview(response.data.university.image.url);
        if (response.data) {
          form.reset({
            priority: response.data.university.priority,
            name: response.data.university.name,
            slug: response.data.university.slug,
            countryId: response.data.university.country.id,
            category: response.data.university.category,
            address: response.data.university.address,
            link: response.data.university.link,
            email: response.data.university.email,
            fb: response.data.university.fb,
            insta: response.data.university.insta,
            admissionOpen: response.data.university.admissionOpen,
            x: response.data.university.x,
            phone: response.data.university.phone,
            syllabus: response.data.university.syllabus,
            estdDate: response.data.university.estdDate || "", // Format date correctly,
            deamMsg: response.data.university.deamMsg,
            scholarship: response.data.university.scholarship,
            content: response.data.university.content,
            imageAlt: response.data.university.imageAlt,
            applyfee: response.data.university.applyfee,
            test: response.data.university.test,
            tags: response.data.university.tags,
          });
        }
      });
    };
    if (isOpen) {
      fetchUniversity();
    }
  }, [id, isOpen]);

  const form = useForm<z.infer<typeof universityFormSchema>>({
    resolver: zodResolver(universityFormSchema),
    defaultValues: {
      priority: "0",
      name: "",
      slug: "",
      countryId: "",
      category: "",
      address: "",
      link: "",
      email: "",
      fb: "",
      insta: "",
      x: "",
      phone: "",
      syllabus: "",
      estdDate: "",
      deamMsg: "",
      scholarship: "",
      content: "",
      imageAlt: "",
      tags: "",
      admissionOpen: "",
      applyfee: "",
      test: "",
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getActiveCountries();
        setCountries(response.data);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

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

  const onSubmit = (values: z.infer<typeof universityFormSchema>) => {
    try {
      startTransition(async () => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (key === "tags") {
              // Remove this JSON.stringify conversion
              // Just append the string directly as it's already comma-separated
              formData.append(key, value); 
            } else {
              formData.append(key, value.toString());
            }
          }
        });

        // Append image if exists
        if (image) {
          formData.append("image", image);
        }

        const response = await editUniversity(formData, id);

        form.reset();
        setImage(null);
        setImagePreview(null);
        setIsOpen(false);
      });
    } catch (err) {
      console.log(err);
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
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Harvard University" {...field} />
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
                  <FormLabel>Slug*</FormLabel>
                  <FormControl>
                    <Input placeholder="harvard-university" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="countryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country: any) => (
                        <SelectItem
                          key={country._id}
                          value={country._id.toString()}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="ivy">IVY</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="admissionOpen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admission Open</FormLabel>
                  <FormControl>
                    <Input placeholder="true" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="University Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="test"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test Required</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the test required" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GRE">GRE</SelectItem>
                      <SelectItem value="GMAT">GMAT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applyfee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Fee</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="waived">Waived</SelectItem>
                      <SelectItem value="not waived">Not Waived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@university.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="fb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="Facebook URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Instagram URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="x"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X (Twitter)</FormLabel>
                    <FormControl>
                      <Input placeholder="X URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllabus</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Syllabus details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estdDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Date</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deamMsg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dean's Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Message from the Dean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scholarship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scholarship Information</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Scholarship details" {...field} />
                  </FormControl>
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
                    <Textarea
                      placeholder="Main content about the university"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>University Image</FormLabel>
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

            <FormField
              control={form.control}
              name="imageAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Alt Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Image alternative text" {...field} />
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
                    <Input placeholder="tag1, tag2, tag3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size={"sm"}
              disabled={isPending}
              type="submit"
              className="mt-6"
            >
              {isPending ? (
                <LoaderCircle size={16} className="animate-spin mr-2" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              Update University
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
