import React from "react";
import CountryHeroSection from "@/components/country-hero-section";
import malaysia from "@/assets/malaysia.jpg";
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
  const { id } = await searchParams;
  const countryresponse = await fetchCountryById(id);
  const country = countryresponse.data.country;

  return (
    <div className="container mx-auto space-y-4">
      <CountryHeroSection
        image={malaysia}
        altimage={null}
        address=""
        title="Study In Malaysia"
        alt="malaysia"
      />
      <div className="container mx-auto md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  Want to study in top international universities but have a low
                  budget? Then, Malaysia is the best study destination for you.
                  Known for its tag line “Truly Asia”, the country has a diverse
                  culture and multicultural society. Cities with modern
                  facilities and infrastructures along with celebrations and
                  festivals all year round make the country famous among
                  international students.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 container text-gray-500">
                Malaysia is known as the hub of international universities. The
                cost of living and food of the country is lower than other
                countries, which makes it an ideal place for international
                students. English is the widely spoken language in the country
                which makes it easier for international students to communicate.
                The country’s thriving industries provide promising employment
                opportunities for international students. The visa procedures
                for the country are simple.
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  Quick Facts
                </h2>
                <ul className="list-disc ml-6 text-gray-500">
                  <li>
                    8 Malaysian universities in the 2023 QS World University
                    ranking top 500
                  </li>
                  <li>Affordable living expenses and food costs</li>
                  <li>Seamless immigration procedures</li>
                  <li>IELTS waiver is possible</li>
                  <li>
                    Hub of international universities including universities of
                    Australia, United Kingdom, Singapore and Canada
                  </li>
                  <li>English is the widely spoken language</li>
                  <li>City life with modern facilities and infrastructures</li>
                  <li>Scholarships are available for international students</li>
                </ul>
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
            <FaqCountry id={id} />
          </div>
          <div className="" id="finances">
            <div className="container py-8 space-y-8">
              <h2 className="text-2xl font-semibold">
                Cost of <span className="text-secondary">Education</span>
              </h2>
              <p className="text-gray-700">
                Studying in Malaysia is an affordable option compared to other
                popular study destinations. Here's an overview of the estimated
                costs for Nepali students:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Tuition Fees
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4 text-gray-600">
                    <li>
                      Public Universities: RM 15,000 to RM 30,000/year (approx.
                      NPR 450,000 to NPR 900,000)
                    </li>
                    <li>
                      Private Universities: RM 20,000 to RM 50,000/year (approx.
                      NPR 600,000 to NPR 1,500,000)
                    </li>
                    <li>
                      Postgraduate: RM 25,000 to RM 60,000/year (approx. NPR
                      750,000 to NPR 1,800,000)
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Living Expenses
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4 text-gray-600">
                    <li>
                      Accommodation: RM 500–2,000/month (NPR 15,000–60,000)
                    </li>
                    <li>Food: RM 500–1,200/month (NPR 15,000–35,000)</li>
                    <li>Transport: RM 100–300/month (NPR 3,000–9,000)</li>
                  </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Other Costs
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4 text-gray-600">
                    <li>Visa Application Fee: RM 200–500 (NPR 6,000–15,000)</li>
                    <li>
                      Health Insurance: RM 500–1,000/year (NPR 15,000–30,000)
                    </li>
                    <li>
                      Miscellaneous: RM 500–1,000/month (NPR 15,000–30,000)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="admission-requirements" className="">
            <h2 className="text-2xl font-semibold mb-6">
              Admission <span className="text-secondary">Requirements</span>
            </h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                Undergraduate Programs
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Grade 12 (+2) with 50%-60%</li>
                <li>IELTS: 5.5–6.0 / TOEFL: 60–80</li>
                <li>
                  Required: Certificates, passport, photos, proof of English
                  proficiency
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                Postgraduate Programs
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Bachelor's degree with minimum GPA 2.5–3.0</li>
                <li>IELTS: 6.0–6.5 / TOEFL: 80–90</li>
                <li>
                  Required: Degree, transcripts, SOP, references, passport,
                  English score
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Intake Periods</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Fall: Main intake (September/October)</li>
                <li>Spring: January/February</li>
                <li>Summer: May/June (limited)</li>
              </ul>
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
