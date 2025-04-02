import React from "react";
import PageHeroSection from "@/components/page-hero";
import heroImage from "@/assets/hero-img1.webp";
import { fetchFaqByCountry, getActiveFaq } from "@/app/(protected)/actions/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import faq from "@/assets/faq.jpg"
import { useTransition } from "react";

export default async function FaqCountry({id}:{
    id:string |undefined
}){
    
  const response = await fetchFaqByCountry(id);

  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="py-16">
          <h2 className="text-2xl font-semibold">Explore <span className="text-secondary">Faq</span></h2>
          <Accordion type="single" collapsible className="w-[500px]">
            {response.data && response.data.map((faq:any, index:any) => (
              <AccordionItem  value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg">{faq.ques}</AccordionTrigger>
                <AccordionContent className="text-base w-[500px]">
                  {faq.ans}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}