import React, { useEffect } from "react";
import CountryHeroSection from "@/components/country-hero-section";
import uk from "@/assets/countryuni3.jpg";
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

export default async function page({
  searchParams,
}: {
  searchParams: {
    id?: string;
  };
}) {
  const { id } = await searchParams; // Ensure it's awaited
  const countryresponse = await fetchCountryById(id);
  const country = countryresponse.data.country;

  return (
    <div className="container mx-auto space-y-4">
      <CountryHeroSection
        image={uk}
        altimage={null}
        address=""
        title="Study In Singapore"
        alt="uk"
      />
      <div className="container md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  Singapore is a globally recognized education hub, offering a
                  seamless blend of academic rigor, cutting-edge research, and
                  strong industry connections. Home to world-class institutions
                  like the National University of Singapore (NUS), Nanyang
                  Technological University (NTU), and Singapore Management
                  University (SMU), the country is renowned for its excellence
                  in science, technology, and business education. The
                  government’s emphasis on innovation and research ensures that
                  students are exposed to forward-thinking programs and
                  state-of-the-art facilities.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="container mx-auto text-gray-500">
              With its status as a global financial and technological hub, Singapore provides unparalleled internship and job opportunities in sectors such as finance, artificial intelligence, biotechnology, and logistics. The country’s strategic location in Asia makes it an ideal launchpad for career opportunities across the region. Students also benefit from a highly efficient public transport system, world-class healthcare, and a safe, disciplined society. Singapore’s multicultural environment, with influences from Chinese, Malay, Indian, and Western cultures, ensures a rich cultural experience, making it an ideal place for international students to thrive both academically and personally.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <NavigationCountry />
      <div className="container mx-auto md:px-12 px-4 scroll-smooth space-x-0 md:space-x-32 grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="" id="topuniversities">
            <h2 className="text-xl font-semibold text-primary">
              Top Universities
            </h2>
            <TopUniversities id={id} />
          </div>
          <div className="" id="faq">
            <FaqCountry id={id} />
          </div>
          <div className="" id="finances">
            <div className="container py-8 space-y-8">
              <h2 className="text-xl font-semibold">Cost of Education</h2>

              <p className="text-gray-700">
                The cost of studying in the Singapore varies widely depending on
                the type of institution, degree programme, and location. Here’s
                a summary of the key expenses:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Public Universities
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>
                      <strong>Undergraduate:</strong>
                      {country.publicUni.undergraduate}
                    </li>
                    <li>
                      <strong>Masters:</strong>
                      {country.publicUni.masters}
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Private Universities
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4">
                    <li>
                      <strong>Undergraduate:</strong>{" "}
                      {country.privateUni.undergraduate}
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
                      <strong>Bachelor's Degree:</strong>{" "}
                      {country.general.undergraduate}
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
