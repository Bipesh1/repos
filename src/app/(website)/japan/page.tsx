import React from "react";
import CountryHeroSection from "@/components/country-hero-section";
import japan from "@/assets/japan.jpg";
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
        image={japan}
        altimage={null}
        address=""
        title="Study In Japan"
        alt="japan"
      />
      <div className="container mx-auto md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  Japan is renowned for its excellent education system and is
                  one of the top-performing countries in reading literacy, math,
                  and sciences. Studying abroad in Japan means access to a
                  well-rounded education system, a unique culture, and a
                  globally respected degree. Students can engage with Japanese
                  culture, cuisine, and language while enjoying high safety
                  standards and quality of life.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 container text-gray-500">
                From globally ranked universities to affordable tuition and
                exciting career paths, Japan is a smart choice for international
                students. Programs in English, strong scholarship support, and
                work-study opportunities make Japan an attractive destination.
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  Quick Facts
                </h2>
                <ul className="list-disc ml-6 text-gray-500">
                  <li>1st City GDP (USD 1.8 Trillion)</li>
                  <li>76% of foreign companies' HQs</li>
                  <li>3rd Global Power City Index 2017</li>
                  <li>4th Global City Ranking 2017</li>
                  <li>Tokyo among the best student cities (QS 2019)</li>
                  <li>Extensive and affordable public transport system</li>
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
                Studying in Japan offers a high-quality education with
                reasonable costs. Here's a breakdown for Nepali students:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Tuition Fees
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>
                      Public Universities: ¥535,800/year (UG & PG), Admission
                      fee: ¥282,000
                    </li>
                    <li>
                      Private Universities: ¥800,000–¥1,800,000/year depending
                      on course level
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Living Expenses
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>
                      Total: ¥80,000–¥120,000/month (includes housing, food, and
                      transport)
                    </li>
                    <li>Accommodation: ¥30,000–¥60,000</li>
                    <li>Food: ¥20,000–¥30,000</li>
                    <li>Transport & others: ¥15,000–¥30,000</li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Other Costs
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>Health Insurance: ¥20,000–¥30,000/year</li>
                    <li>Books: ¥10,000–¥20,000/year</li>
                    <li>Visa: NPR 4,000–5,000</li>
                    <li>
                      Language classes (if needed): ¥150,000–¥500,000 for 6–12
                      months
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Estimated Annual Cost
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>Public Universities: ¥1,200,000–¥1,500,000</li>
                    <li>Private Universities: ¥1,500,000–¥2,500,000</li>
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
                Academic Qualifications
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Undergraduate: Grade 12 or equivalent with 50%–60%</li>
                <li>Postgraduate: Bachelor's degree with GPA 2.5–3.0</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                Language Proficiency
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Japanese programs: JLPT N2 or N3 (if applicable)</li>
                <li>English programs: IELTS 6.0–6.5 or TOEFL iBT 80–90</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Transcripts and Certificates</li>
                <li>Passport copy (valid min. 6 months)</li>
                <li>Language certificates (JLPT/IELTS/TOEFL)</li>
                <li>Recommendation Letters</li>
                <li>SOP or Research Proposal</li>
                <li>Financial proof</li>
                <li>Photographs</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Visa Requirements</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Certificate of Eligibility (COE)</li>
                <li>Visa Application Form</li>
                <li>Financial Documents</li>
                <li>Photographs</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Intake Periods</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>April (major intake)</li>
                <li>October (available for some programs)</li>
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
