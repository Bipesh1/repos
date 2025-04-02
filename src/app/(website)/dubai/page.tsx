import React, { useEffect } from "react";
import CountryHeroSection from "@/components/country-hero-section";
import uk from "@/assets/countryuni4.jpg";
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
      <CountryHeroSection image={uk} altimage={null} address="" title="Study In Dubai" alt="uk" />
      <div className="container md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                Dubai has emerged as a leading destination for international students, offering a perfect blend of academic excellence, state-of-the-art infrastructure, and a dynamic career-driven environment. The city hosts renowned institutions such as the University of Birmingham Dubai, Middlesex University Dubai, and the American University in Dubai, providing students with internationally recognized degrees. With a strong focus on innovation, technology, and business, Dubai’s universities offer programs tailored to global industry demands, particularly in fields like finance, artificial intelligence, and engineering.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="container mx-auto text-gray-500">
              Beyond academics, Dubai’s thriving economy presents exceptional internship and employment opportunities, especially in sectors like fintech, hospitality, and logistics. Students benefit from a tax-free environment and proximity to multinational corporations. The city’s futuristic skyline, luxury lifestyle, and world-class entertainment options offer an unparalleled student experience. Additionally, Dubai’s multicultural society, hosting people from over 200 nationalities, provides a welcoming and inclusive atmosphere for international students.
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
              The cost of studying in the Dubai varies widely depending on the
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
