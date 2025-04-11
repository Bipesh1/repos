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
        title="Study In UK"
        alt="uk"
      />
      <div className="container md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  With an academic reputation built on centuries old heritage,
                  The UK is home to some of the world’s oldest universities that
                  consistently rank among the highest in the world. Universities
                  in UK have a rich legacy of welcoming international students
                  for centuries and are known to offer an unforgettable student
                  experience as they know the needs and aspirations of their
                  students very well. Learn from some of the world's best
                  academics and experts in some of world’s most prestigious
                  universities and benefit from their exceptional academic
                  support. Study alongside some of the finest and brilliant
                  minds and hone your skills using state-of-the-art technology.
                  Avail placements, internships and volunteering positions that
                  are your right fit through strong industry links of UK
                  universities and apply your knowledge and skills in a
                  real-world professional environment. Graduate with skills and
                  expertise that are in high demand around the world and get
                  hired by your dream employers.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-10">
              <div className="">
                <h2 className="text-xl font-semibold text-primary mb-6">
                  Quick Facts of UK
                </h2>
                <ul className="list-disc space-y-3 text-gray-500">
                  <li>
                    <span className="text-black font-medium">
                      The UK undertakes 5% of the world’s scientific research
                    </span>{" "}
                    and produces 14% of the world’s most frequently cited
                    papers.
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      UK welcomes over 400,000 students every year.
                    </span>
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      Post study work visa of 2 years
                    </span>{" "}
                    is available after graduation.
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      12 of the world’s top 100 universities
                    </span>{" "}
                    are in the UK (QS World Rankings 2024).
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      14 of the best student cities in the world
                    </span>{" "}
                    are located in the UK (QS Best Student Cities 2024).
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      The UK offers 131 internationally reputed universities
                    </span>{" "}
                    to choose from.
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      Admission without IELTS is possible
                    </span>{" "}
                    at many institutions.
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      1-year Master's programs with work placements
                    </span>{" "}
                    are widely available.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-primary mb-6 ">
                  Career and Industry Sights
                </h2>
                <p className="text-gray-500">
                  The UK is one of the most globalised economies comprising of
                  England, Scotland, Wales and Northern Ireland and is among the
                  world’s biggest economies. The sectors that dominate UK’s
                  economy include service sector, financial services, higher
                  education, aerospace, pharmaceuticals, manufacturing and
                  production. Best paid jobs in the UK include Information
                  Technology Managers, Engineering Professionals, Business and
                  Financial Management Professionals, Legal Professionals,
                  Aircraft Pilots & Flight Engineers, Higher Education Teaching
                  Professionals and Medical Practitioners.
                </p>
              </div>

              <div className="">
                <h2 className="text-xl font-semibold text-primary mb-4">
                  Admission Intakes in UK
                </h2>
                <p className="text-gray-500 mb-6">
                  UK universities offer three major intakes for international
                  students:
                </p>

                <ul className="list-disc ml-6 space-y-4 text-gray-500">
                  <li>
                    <span className="text-black font-medium">
                      September/October
                    </span>{" "}
                    is the primary intake, offering the highest number of
                    courses, universities, and scholarship opportunities.
                  </li>
                  <li>
                    <span className="text-black font-medium">
                      January/February
                    </span>{" "}
                    is the secondary intake, ideal for students who missed the
                    fall intake. It has fewer courses but still plenty of good
                    options.
                  </li>
                  <li>
                    <span className="text-black font-medium">May</span> is the
                    least common intake, offering limited programs—mostly
                    foundation or diploma-level courses.
                  </li>
                </ul>

                <p className="mt-6 text-gray-500">
                  Most students choose the{" "}
                  <span className="text-black font-medium">
                    September intake
                  </span>{" "}
                  for its flexibility and wide availability of programs.
                </p>
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
              <h2 className="text-2xl font-semibold mb-4">Cost of <span className="text-secondary">Education</span></h2>
              <p className="text-gray-500 mb-4">
                The cost for Nepali students to study in the UK depends on the
                level of study, university, and city.
              </p>

              <ul className="list-disc ml-6 space-y-4 text-gray-500">
                <li>
                  <span className="text-black font-medium">
                    Bachelor’s Degree:
                  </span>{" "}
                  Tuition fees usually range from £10,000 to £15,000 per year
                  (approximately NPR 1.7 to 2.6 million), and most programs last
                  for 3 years.
                </li>
                <li>
                  <span className="text-black font-medium">
                    Master’s Degree:
                  </span>{" "}
                  Typically lasts 1 year, with fees ranging from £12,000 to
                  £18,000 (around NPR 2 to 3 million), depending on the course
                  and university.
                </li>
                <li>
                  <span className="text-black font-medium">
                    Living Expenses:
                  </span>{" "}
                  About £9,000 to £12,000 per year (approx. NPR 1.5 to 2
                  million). Cities like London tend to be more expensive.
                </li>
              </ul>

              <p className="mt-6 text-gray-500">
                Many students manage costs through{" "}
                <span className="text-black font-medium">scholarships</span>,
                choosing affordable universities, and working part-time while
                studying.
              </p>
            </div>

            <div id="admission-requirements" className="">
      <h2 className="text-2xl font-semibold mb-5">Admission <span className="text-secondary">Requirements</span></h2>
      <p className="text-gray-500 mb-6">
        Here’s a clear breakdown of the admission requirements for international students in the UK for Bachelor’s, Master’s, and Doctorate (PhD) programs:
      </p>

      {/* Bachelor's Degree */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Bachelor’s Degree (Undergraduate)</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-500">
          <li><span className="text-black font-medium">Academic Qualification:</span> Completion of 10+2 or equivalent with required grades.</li>
          <li><span className="text-black font-medium">English Proficiency:</span> IELTS score of 6.0–6.5 (or equivalent TOEFL/PTE).</li>
          <li><span className="text-black font-medium">Personal Statement:</span> A short essay explaining your interest and goals.</li>
          <li><span className="text-black font-medium">Reference Letter(s):</span> Usually one from a teacher or school counselor.</li>
          <li><span className="text-black font-medium">Passport & Academic Documents</span></li>
        </ul>
      </div>

      {/* Master's Degree */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Master’s Degree (Postgraduate)</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-500">
          <li><span className="text-black font-medium">Academic Qualification:</span> Bachelor’s degree with required GPA (usually 2.5 or above on 4.0 scale).</li>
          <li><span className="text-black font-medium">English Proficiency:</span> IELTS score of 6.5–7.0 (or equivalent TOEFL/PTE).</li>
          <li><span className="text-black font-medium">Personal Statement:</span> Describing your motivation and career goals.</li>
          <li><span className="text-black font-medium">Reference Letters:</span> Typically two academic or professional references.</li>
          <li><span className="text-black font-medium">CV/Resume:</span> Some courses may ask for it.</li>
          <li><span className="text-black font-medium">Work Experience:</span> Required for certain programs (like MBA).</li>
          <li><span className="text-black font-medium">Passport & Academic Documents</span></li>
        </ul>
      </div>

      {/* Doctorate Degree */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Doctorate Degree (PhD)</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-500">
          <li><span className="text-black font-medium">Academic Qualification:</span> Master’s degree in a related field with strong academic performance.</li>
          <li><span className="text-black font-medium">Research Proposal:</span> A detailed outline of your intended research.</li>
          <li><span className="text-black font-medium">English Proficiency:</span> IELTS score of 6.5–7.0 or as required by the university.</li>
          <li><span className="text-black font-medium">Reference Letters:</span> Two or more academic references.</li>
          <li><span className="text-black font-medium">CV/Resume:</span> Including academic background and research experience.</li>
          <li><span className="text-black font-medium">Supervisor Confirmation:</span> Some universities require approval from a potential research supervisor before applying.</li>
        </ul>
      </div>
    </div>
        </div>
        <div className="mx-auto">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
