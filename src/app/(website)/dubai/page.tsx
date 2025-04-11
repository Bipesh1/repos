import React from "react";
import CountryHeroSection from "@/components/country-hero-section";
import dubai from "@/assets/countryuni4.jpg";
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
        image={dubai}
        altimage={null}
        address=""
        title="Study In Dubai"
        alt="dubai"
      />

      <div className="container mx-auto md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  Study in Dubai, a futuristic city that is home to over 60
                  world renowned university campuses and colleges and that
                  offers plenty of higher education opportunities meeting your
                  aspirations. Pursue a world class undergraduate or
                  postgraduate degree from this destination and advance your
                  career globally.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-gray-500 space-y-4">
                <p>
                  Studying in Dubai comes with a dual benefit of accessing
                  global campuses of universities of world repute and job
                  opportunities of a booming economy at the same time.
                  Institutions in Dubai have affiliations with international
                  universities, offer a wide range of programs suiting your
                  academic pursuits and have world class learning facilities.
                </p>
                <p>
                  Dubai is among the fastest growing world economies and has an
                  entrepreneurial ecosystem that creates hundreds of thousands
                  of new jobs in diverse areas. Presence of renowned global
                  universities and a robust economy makes studying in Dubai a
                  very lucrative choice.
                </p>
                <h3 className="text-xl font-bold text-primary">Quick Facts</h3>
                <ul className="list-disc ml-6">
                  <li>Dubai – a popular student city</li>
                  <li>
                    Institutions in Dubai are affiliated with top international
                    universities in Australia and The UK
                  </li>
                  <li>Global tourism and entertainment hub</li>
                  <li>A safe city and a modern design capital</li>
                  <li>
                    Excellent full time and part time job opportunities for
                    international students
                  </li>
                  <li>Global knowledge hub</li>
                  <li>
                    Paid - Unpaid Internship opportunities for the students
                  </li>
                  <li>
                    Affordable tuition fee and living expenses with plenty of
                    scholarships
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <NavigationCountry />

      <div className="container mx-auto md:px-12 px-4" id="topuniversities">
        <h2 className="text-xl font-semibold text-primary">Top Universities</h2>
        <TopUniversities id={id} />
      </div>

      <div className="container mx-auto md:px-12 px-4 scroll-smooth grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <div className="" id="faq">
            <FaqCountry id={id} />
          </div>

          <div id="finances">
            <div className="container py-8 space-y-8">
              <h2 className="text-2xl font-semibold">
                Cost of <span className="text-secondary">Education</span>
              </h2>
              <p className="text-gray-700">
                Studying in Dubai offers Nepali students a blend of high-quality
                education and a dynamic urban experience. Here's a breakdown of
                the estimated costs:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Tuition Fees
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>
                      Undergraduate Programs: AED 40,000 to AED 50,000/year (NPR
                      1.3M to 1.6M)
                    </li>
                    <li>
                      Postgraduate Programs: AED 35,000 to AED 85,000/year (NPR
                      1.1M to 2.7M)
                    </li>
                    <li>
                      PhD Programs: AED 26,536 to AED 92,877/year (NPR 850K to
                      3M)
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Living Expenses
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>
                      Accommodation: AED 3,500 to AED 7,000/month (NPR 110K to
                      220K)
                    </li>
                    <li>Food: AED 800 to AED 1,500/month (NPR 25K to 50K)</li>
                    <li>
                      Transportation: AED 200 to AED 500/month (NPR 6.5K to 16K)
                    </li>
                    <li>
                      Miscellaneous: AED 500 to AED 1,000/month (NPR 16K to 32K)
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Additional Costs
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600">
                    <li>Visa Application Fee: AED 300 to AED 600</li>
                    <li>Medical Exam: AED 1,000 to AED 2,000</li>
                    <li>Health Insurance: AED 1,500 to AED 2,500/year</li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Total Estimated Annual Cost
                  </h3>
                  <p className="text-gray-600">
                    AED 56,800 to AED 127,100/year (NPR 1.8M to 4.1M)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="admission-requirements">
            <h2 className="text-2xl font-semibold mb-6">
              Admission <span className="text-secondary">Requirements</span>
            </h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                Academic Qualifications
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>
                  Completion of +2 or equivalent for undergraduate programs
                </li>
                <li>Recognized Bachelor’s degree for postgraduate programs</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Academic transcripts and certificates</li>
                <li>Valid passport</li>
                <li>IELTS/TOEFL scores (or English as previous medium)</li>
                <li>Statement of Purpose</li>
                <li>Letters of Recommendation</li>
                <li>Passport-sized photographs</li>
                <li>Visa application form and insurance (post-admission)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Language Requirements
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>IELTS: 6.0 – 6.5</li>
                <li>TOEFL: 80 – 90 iBT</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Intake Periods</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Fall Intake (September/October)</li>
                <li>Spring Intake (January/February)</li>
                <li>Summer Intake (May/June – limited programs)</li>
              </ul>
            </div>
          </div>

          <div id="working-opportunities">
            <h2 className="text-2xl font-semibold mb-6">
              Working <span className="text-secondary">Opportunities</span>
            </h2>
            <p className="mb-4 text-gray-700">
              International students can work both on-campus and off-campus
              during their studies, subject to regulations.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-500">
              <li>Up to 20 hours/week during terms; full-time during breaks</li>
              <li>Employment Pass required for off-campus roles</li>
              <li>
                Post-graduation options include Green Visa and Employment Pass
              </li>
              <li>
                Dubai's startup ecosystem also offers entrepreneurship visas
              </li>
            </ul>
          </div>
        </div>
        <div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
