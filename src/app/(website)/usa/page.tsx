import React from "react";
import CountryHeroSection from "@/components/country-hero-section";
import usa from "@/assets/countryuni1.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavigationCountry } from "@/components/navigation-country";
import InquiryForm from "@/components/inquiryform";
import TopUniversities from "@/components/topuniversities";
import FaqCountry from "@/components/faq-country";
import { fetchCountryById } from "@/app/(protected)/actions/country";


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
      <CountryHeroSection image={usa} altimage={null} address="" title="Study In USA" alt="usa" />
      <div className="container mx-auto md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  The United States has emerged as a premier study abroad
                  destination, attracting millions of international students
                  each year. Renowned for its diverse academic offerings, the
                  U.S. boasts over 4,000 higher education institutions,
                  including prestigious universities like Harvard, MIT, and
                  Stanford, which are recognised globally for their commitment
                  to academic excellence and research innovation.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 container text-gray-500">
              The U.S. is a global leader in research and innovation, offering students access to advanced laboratories, state-of-the-art facilities, and industry collaborations in fields such as technology, business, medicine, and engineering. Universities emphasize experiential learning, encouraging students to engage in internships, co-op programs, and entrepreneurial ventures that enhance their career prospects.

Beyond academics, the U.S. is known for its cultural diversity, with students from all over the world contributing to a vibrant and inclusive educational environment. From the bustling streets of New York City and Silicon Valley’s tech hub to the serene landscapes of the Midwest, students have access to a wide range of experiences. With numerous scholarship opportunities, strong career networks, and post-graduation work options such as the OPT (Optional Practical Training) program, studying in the U.S. can be a transformative experience that opens doors to global career prospects.
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
          <InquiryForm/>
        </div>
      </div>
    </div>
  );
}
