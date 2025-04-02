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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
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
import axios from "axios";
import { LoaderCircle, Save, Upload } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createFaq, getActiveFaq } from "@/app/(protected)/actions/faq";
import { getActiveCountries } from "@/app/(protected)/actions/country";

export default function FaqCreate() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState<any>([]);


  const form = useForm<z.infer<typeof faqFormSchema>>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      ques:"",
      ans:"",
      countryId:"",
      priority:"",
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

  const onSubmit = (values: z.infer<typeof faqFormSchema>) => {
    try {
      startTransition(async () =>{
      
        const response=await createFaq(values)
        form.reset();
        setIsOpen(false)

      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="float-end text-primary border px-2 py-1 rounded-md hover:text-primary/70 transition-all">Create</SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Create FAQ</SheetTitle>
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
                      placeholder="Eg.What is the aim of goingabroadcollege? "
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
                  <FormLabel>Answers</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The aim of going abroad college is to help students to streamline their flow"
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
                      placeholder="1"
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
              Create Faq
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
