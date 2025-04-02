"use client";
import {
  editFaq,
  fetchFaqById,
} from "@/app/(protected)/actions/faq";
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
  SelectValue
} from "@/components/ui/select";
import { faqFormSchema } from "@/formschemas/faq";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FilePenLine } from "lucide-react";
import { z } from "zod";
import { getActiveCountries } from "@/app/(protected)/actions/country";

export default function FaqEdit({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState<any>([]);

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

    const fetchFaq = () => {
      startTransition(async () => {
        const response = await fetchFaqById(id);
        if (response.data) {
          form.reset({
            ques: response.data.faq.ques,
            ans: response.data.faq.ans,
            countryId: response.data.faq.country.id,
            priority: response.data.faq.priority,
          });
        }
      });
    };
    if(isOpen){
      fetchFaq()
    }
  }, [id,isOpen]);

  const form = useForm<z.infer<typeof faqFormSchema>>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      ques: "",
      ans: "",
      priority: "",
      countryId:""
    },
  });

  const onSubmit = (values: z.infer<typeof faqFormSchema>) => {
    try {
      startTransition(async () => {
        const response = await editFaq(values, id);
        form.reset();
        if(response.status=200){
          setIsOpen(false);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}> 
      <SheetTrigger asChild>
        <span className="flex cursor-default select-none items-center gap-1 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <FilePenLine size={16} />
          <p>Update</p>
        </span>
      </SheetTrigger>{" "}
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Update Faq</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 py-10"
          >
            <FormField
              control={form.control}
              name="ques"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg.Bachelor in Information Technology"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg.Bachelor in Information Technology"
                      {...field}
                    />
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
                                  {countries.map((country:any) => (
                                    <SelectItem key={country._id} value={country._id.toString()}>
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
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg.Bachelor in Information Technology"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <LoaderCircle size={16} className=" animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Update Faq
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
