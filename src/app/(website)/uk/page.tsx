import React, { useEffect } from "react";
import CountryHeroSection from "@/components/country-hero-section";
import uk from "@/assets/countryuni2.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavigationCountry } from "@/components/navigation-country";
import InquiryForm from "@/components/inquiryform";
import TopUniversities from "@/components/topuniversities";
import { fetchCountryById } from "@/app/(protected)/actions/country";
import FaqCountry from "@/components/faq-country";

export default async function page({searchParams}:{
  searchParams:{
    id?: string 
  }
}) {
   const {id} = await searchParams; // Ensure it's awaited
     const countryresponse= await fetchCountryById(id)
     const country= countryresponse.data.country
     
 
  return (
    <div className="container mx-auto space-y-4">
      <CountryHeroSection image={uk} altimage={null} address="" title="Study In UK" alt="uk" />
      <div className="container md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  The United Kingdom is a premier destination for international
                  students, offering a unique blend of academic excellence,
                  cultural richness, and historical significance. Prestigious
                  universities such as Oxford and Cambridge make the UK renowned
                  for high academic standards and innovative research
                  opportunities. The educational landscape is diverse, with
                  programs for a wide range of interests and career paths,
                  ensuring students find courses aligned with their aspirations.
                  Additionally, the UK’s vibrant cities are renowned for their
                  multicultural communities, providing students with an
                  enriching experience outside the classroom.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="container text-gray-500">
              he UK’s diverse educational landscape ensures that students can find courses tailored to their aspirations, whether at renowned research universities or specialized institutions. Additionally, shorter degree durations (three years for undergraduate and one year for master's) make studying in the UK a cost-effective option compared to other destinations.

Beyond academics, the UK provides a culturally enriching experience, with historic landmarks, vibrant cities, and a thriving arts and music scene. Cities like London, Edinburgh, and Manchester are known for their international communities, offering students a welcoming and inclusive environment. With post-study work opportunities through the Graduate Route visa, students can explore career prospects in leading industries. The UK’s strong emphasis on innovation, networking, and global connections makes it an ideal choice for students seeking both academic excellence and professional growth.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <NavigationCountry />
      <div className="container mx-auto md:px-12 px-4 scroll-smooth space-x-0 md:space-x-32 grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="" id="topuniversities">
              <h2 className="text-xl font-semibold text-primary">Top Universities</h2>
                <TopUniversities id={id}/>
          </div>
          <div className="" id="faq">
             <FaqCountry id={id}/>
          </div>
          <div className="" id="finances">
          <div className="container py-8 space-y-8">
            <h2 className="text-xl font-semibold">Cost of Education</h2>

            <p className="text-gray-700">
              The cost of studying in the USA varies widely depending on the
              type of institution, degree programme, and location. Here’s a
              summary of the key expenses:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-base font-semibold text-secondary">
                  Public Universities
                </h3>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>Undergraduate:</strong>{country.publicUni.undergraduate}
                  </li>
                  <li>
                    <strong>Masters:</strong>{country.publicUni.masters}
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-base font-semibold text-secondary">
                  Private Universities
                </h3>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>Undergraduate:</strong> {country.privateUni.undergraduate}
                  </li>
                  <li>
                    <strong>Masters:</strong> {country.privateUni.masters}
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-base font-semibold text-secondary">
                  Average Annual Costs for Specific Programmes
                </h3>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>
                    <strong>Bachelor's Degree:</strong> {country.general.undergraduate}
                  </li>
                  <li>
                    <strong>Masters Degree:</strong> {country.general.masters}
                  </li>
                  <li>
                    <strong>MBA:</strong> {country.general.mba}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
