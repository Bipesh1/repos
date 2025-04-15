import React from "react";
import PageHeroSection from "@/components/page-hero";
import heroImage from "@/assets/hero.jpg";
import heroImage1 from "@/assets/hero1.jpg";

import { getActiveFaq } from "@/app/(protected)/actions/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import faq from "@/assets/faq.jpg"

export default async function Faq() {
  const response = await getActiveFaq();

  return (
    <div>
      <PageHeroSection
        img1={heroImage}
        img2={heroImage1}
        title="Explore Faqs"
        description="Clear out your confusion with our faqs."
      />
      <div className="container md:px-12 px-4 mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="w-full">
          <Image
          src={faq}
          alt="faq abroad study"
          className="object-cover"
          width={700}
          height={500}
          />
        </div>
        <div className="py-16">
          <h2 className="text-2xl font-semibold">Explore <span className="text-secondary">Faq</span></h2>
          <Accordion type="single" collapsible>
            {response.data && response.data.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.ques}</AccordionTrigger>
                <AccordionContent>
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