import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import faq from "@/assets/faq.jpg";
import Image from "next/image";

export default function FaqStatic() {
  const faqs = [
    {
      ques: "Is Going College is a consultancy?",
      ans: "No, we’re not a traditional consultancy. GoingCollege is an online self-apply platform that lets you apply to U.S. universities of your choice—fully in your control, from start to finish.",
    },
    {
      ques: "Is Going College free to use?",
      ans: "You can search and shortlist universities for free. To apply, we charge a one-time software handling fee of NRs. 999—this gives you unlimited university applications and access to premium content.",
    },
    {
      ques: "Can you help me with the application steps?",
      ans: "Yes, you’ll receive complete support throughout your application process. Our partnered universities will assist you with admissions, making your study in the USA journey simpler with our self-apply platform.",
    },
    {
      ques: "Why choose a self-apply platform over a consultancy?",
      ans: "The U.S. government encourages students to self-apply instead of relying on traditional consultancies. Data shows that the visa success rate is higher for self-applicants. Additionally, applying on your own helps you gain confidence for the visa interview.",
    },
    {
      ques: "Do you guarantee admission and scholarships?",
      ans: "No, we do not guarantee admission or scholarships. Admissions are based on university requirements. If you meet the criteria, we help improve your chances for both admission and scholarships.",
    },
    {
      ques: "Do you help with visa interview preparation?",
      ans: "Yes, with our Premium Package, EduPilot provides assistance for visa interview preparation. Additionally, some of our partnered universities offer support to help you prepare for your visa interview.",
    },
  ];

  return (
    <div className="container mx-auto mt-20 md:px-12 px-4  space-y-10">
      <div className=" space-y-4">
        <h2 className="md:text-3xl text-2xl text-center font-semibold">
          Frequently Asked <span className="text-primary"> Questions</span>
        </h2>
        <p className=" text-base text-center">
          See the most frequently asked
          <span className="text-secondary"> Questions</span>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full">
          <Image
            src={faq}
            alt="faq abroad study"
            className="object-cover"
            width={700}
            height={500}
          />
        </div>
        <Accordion type="single" collapsible className="md:w-[700px]  w-[380px] container mx-auto">
          <h2 className="text-2xl font-semibold">
            Explore <span className="text-secondary">FAQ</span>
          </h2>
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg">
                {faq.ques}
              </AccordionTrigger>
              <AccordionContent className="text-base md:w-[700px] w-[380px]">
                {faq.ans}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
