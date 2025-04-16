import React, { useEffect } from "react";
import CountryHeroSection from "@/components/country-hero-section";
import uk from "@/assets/countryuni5.webp";
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

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }) {
  const countryId = searchParams?.id;
  const countryresponse = await fetchCountryById(countryId);
  const country = countryresponse?.data?.country;

  return {
    title: `Study in ${country?.name || "a Country"} | GoingCollege`,
    description: `Explore top universities, education costs, scholarships, and admission requirements for studying in ${country?.title || "this country"}.`,
  };
}

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
      <CountryHeroSection image={uk} altimage={null} address="" title="Study In France" alt="uk" />
      <div className="container md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                France is one of the most sought-after destinations for international students, offering a rich academic tradition, world-class institutions, and an immersive cultural experience. With prestigious universities such as Sorbonne University, Sciences Po, and HEC Paris, France is renowned for its excellence in humanities, business, engineering, and the arts. The country is a global leader in research and innovation, providing students with cutting-edge facilities and collaborations with leading industries.


                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="container mx-auto text-gray-500">
              Beyond academics, France’s diverse regions and historic cities provide an extraordinary cultural experience. Students can explore iconic landmarks like the Eiffel Tower, the Louvre, and the Château de Versailles while immersing themselves in France’s world-famous art, fashion, and cuisine. The country’s robust economy and its role as a leader in industries such as fashion, luxury goods, aerospace, and finance offer excellent career prospects. Moreover, France’s affordable tuition fees, government-funded scholarships, and student-friendly visa policies make it an attractive choice for international students. With a perfect blend of tradition and modernity, France ensures a rewarding academic journey and a globally recognized degree.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <NavigationCountry />
      <div className="container mx-auto md:px-12 px-4" id="topuniversities">
        <h2 className="text-xl font-semibold text-primary">
          Top Universities
        </h2>
        <TopUniversities id={id} />
      </div>

      <div className="container mx-auto md:px-12 px-4 scroll-smooth grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-10">
         
          <div className="" id="faq">
             <FaqCountry id={id}/>
          </div>
          <div className="" id="finances">
          <div className="container py-8 space-y-8">
            <h2 className="text-xl font-semibold">Cost of Education</h2>

            <p className="text-gray-700">
              The cost of studying in the France varies widely depending on the
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
