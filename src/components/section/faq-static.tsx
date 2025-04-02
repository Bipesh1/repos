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
      ques: "What are the general admission requirements for studying in the USA?",
      ans: "Admission requirements typically include academic transcripts, standardized test scores (SAT/ACT for undergraduates, GRE/GMAT for graduates), English proficiency tests (TOEFL/IELTS), a statement of purpose, and recommendation letters.",
    },
    {
      ques: "How much does it cost to study in the USA?",
      ans: "Tuition fees vary, but on average, undergraduate programs cost between $20,000 and $50,000 per year, while graduate programs range from $25,000 to $60,000 per year. Living expenses can be around $10,000 to $15,000 annually.",
    },
    {
      ques: "What are the visa requirements for studying in the UK?",
      ans: "Students need a Tier 4 (General) student visa, which requires a Confirmation of Acceptance for Studies (CAS), proof of financial support, English proficiency test results, and a valid passport.",
    },
    {
      ques: "Are there scholarships available for international students in the UK?",
      ans: "Yes, scholarships like the Chevening Scholarship, Commonwealth Scholarship, and university-specific scholarships are available for international students based on academic merit and financial need.",
    },
    {
      ques: "What are the work opportunities for international students in Canada?",
      ans: "International students in Canada can work up to 20 hours per week during academic sessions and full-time during scheduled breaks without needing a separate work permit.",
    },
    {
      ques: "How can I apply for permanent residency in Canada after studying?",
      ans: "Students can apply for a Post-Graduation Work Permit (PGWP) after completing their studies and later qualify for permanent residency through the Express Entry system or Provincial Nominee Program (PNP).",
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
          <span className="text-secondary"> 1uestions</span>
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
        <Accordion type="single" collapsible className="md:w-[700px] w-[380px]">
          <h2 className="text-2xl font-semibold">
            Explore <span className="text-secondary">FAQ</span>
          </h2>
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg">
                {faq.ques}
              </AccordionTrigger>
              <AccordionContent className="text-base md:w-[700px] w-[450px]">
                {faq.ans}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
