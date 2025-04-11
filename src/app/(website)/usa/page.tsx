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
        image={usa}
        altimage={null}
        address=""
        title="Study In USA"
        alt="usa"
      />
      <div className="container mx-auto md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  The best investment you can make for your future is to study
                  in the USA. There are more highly regarded institutions in the
                  USA that provide top-notch instruction, first-rate facilities,
                  and cutting-edge technology. With more than 4,000 universities
                  and a million international students, it offers a fantastic
                  opportunity for social and cultural development in addition to
                  academic growth.In the United States, you will find an array
                  of options for higher education study. Big and small, public
                  and private, more generalized or highly specific,
                  community-based or international, the U.S. is home to a wide
                  variety of higher educational institutions. International
                  students can find cutting-edge technologies, state-of-the-art
                  facilities, the most advanced curriculum and excellent
                  teaching.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 container text-gray-500">
                Finding a program that fits your particular needs can be a
                challenge, but is essential. Understanding the system,
                familiarizing yourself with options and developing a plan of
                action can help.
              </div>
              <div className="p-4">
      <ul className="space-y-4">
        <li>
          <span className="text-primary font-bold">RANKED #1: </span>
          <span className="text-secondary">
            The United States of America is ranked as the #1 host of international students, and the number is rising every year.
          </span>
        </li>
        <li>
          <span className="text-primary font-bold">1,000,000+ INTERNATIONAL STUDENTS: </span>
          <span className="text-secondary">
            With more than 1,000,000 students, the USA has the world's largest international student population.
          </span>
        </li>
        <li>
          <span className="text-primary font-bold">SHARING RESPONSIBILITY: </span>
          <span className="text-secondary">
            The education system in the United States is not controlled by the government. Public school regulations can vary, but in most cases, local and state governments share the responsibility. Private schools are administered by independent groups or trustees.
          </span>
        </li>
        <li>
          <span className="text-primary font-bold">WORLD'S TOP UNIVERSITIES: </span>
          <span className="text-secondary">
            Approximately 50% of the world's top universities are in the USA.
          </span>
        </li>
      </ul>
    </div>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Admission Intakes in USA
      </h2>
      <p className="mb-4 text-gray-500">
        In the United States, there are three main college/university admission intakes:
      </p>
      <div className="space-y-6">
        {/* Fall Intake */}
        <div>
          <h3 className="text-xl font-bold text-primary">Fall (Primary Intake)</h3>
          <ul className="list-disc ml-6 text-gray-500">
            <li>Starts in August/September</li>
            <li>Most popular and competitive intake</li>
            <li>Offers the widest range of course options</li>
            <li>Most scholarships and funding opportunities available</li>
            <li>Application deadlines typically between November and January</li>
          </ul>
        </div>
        {/* Spring Intake */}
        <div>
          <h3 className="text-xl font-bold text-primary">Spring (Secondary Intake)</h3>
          <ul className="list-disc ml-6 text-gray-500">
            <li>Starts in January/February</li>
            <li>More limited course offerings compared to Fall</li>
            <li>Fewer scholarship opportunities</li>
            <li>Application deadlines usually between September and November</li>
            <li>
              Good option for students who missed Fall deadlines or need more preparation time
            </li>
          </ul>
        </div>
        {/* Summer Intake */}
        <div>
          <h3 className="text-xl font-bold text-primary">Summer (Limited Intake)</h3>
          <ul className="list-disc ml-6 text-gray-500">
            <li>Starts in May/June</li>
            <li>Most limited in terms of course offerings and university options</li>
            <li>Not all universities offer summer admission</li>
            <li>Mainly for specific programs or transfer students</li>
            <li>Application deadlines typically between January and March</li>
          </ul>
        </div>
      </div>
      <p className="mt-4 text-gray-500">
        Universities may have slightly different application deadlines and requirements for each intake. It's important to check the specific requirements of your target institutions, as some programs might only be available for certain intakes.
      </p>
    </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <NavigationCountry />
      
      {/* Full width Top Universities section */}
      <div className="container mx-auto md:px-12 px-4" id="topuniversities">
        <h2 className="text-xl font-semibold text-primary">
          Top Universities
        </h2>
        <TopUniversities id={id} />
      </div>

      {/* Two-column layout for other content */}
      <div className="container mx-auto md:px-12 px-4 scroll-smooth grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column (2/3 width) */}
        <div className="lg:col-span-2 space-y-10">
          <div id="faq">
            <FaqCountry id={id} />
          </div>
          <div id="finances">
            <div className="container py-8 space-y-8">
              <h2 className="text-2xl font-semibold">Cost of <span className="text-secondary">Education</span></h2>

              <p className="text-gray-700">
                The cost of studying in the USA varies widely depending on the
                type of institution, degree programme, and location. Here's a
                summary of the key expenses:
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

          <div id="admission-requirements" className="">
      <h2 className="text-2xl font-semibold mb-6">
        Admission <span className="text-secondary">Requirements</span> 
      </h2>

      {/* Undergraduate Programs */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          Undergraduate Programs:
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-500">
          <li>
            <span className="font-semibold">High School Transcripts:</span> Provide official records of your high school courses and grades.
          </li>
          <li>
            <span className="font-semibold">Standardized Tests:</span> Most U.S. universities require the SAT or ACT for undergraduate programs. However, many universities now offer test-optional admissions.
          </li>
          <li>
            <span className="font-semibold">TOEFL/IELTS:</span> Proof of English proficiency is required for non-native English speakers.
          </li>
          <li>
            <span className="font-semibold">Letters of Recommendation:</span> Typically, 2-3 recommendation letters from teachers, school counselors, or mentors.
          </li>
          <li>
            <span className="font-semibold">Statement of Purpose/Essays:</span> Write a personal statement or essays explaining why you want to study in the U.S. and why you've chosen a particular program and university.
          </li>
        </ul>
      </div>

      {/* Graduate Programs */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Graduate Programs:
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-500">
          <li>
            <span className="font-semibold">Bachelor's Degree Transcripts:</span> Submit transcripts from your previous undergraduate studies.
          </li>
          <li>
            <span className="font-semibold">GRE/GMAT Scores:</span> Some graduate programs (especially in business or engineering) require the GRE or GMAT.
          </li>
          <li>
            <span className="font-semibold">TOEFL/IELTS:</span> If your undergraduate education was in a non-English language, you'll need to prove your English proficiency.
          </li>
          <li>
            <span className="font-semibold">Statement of Purpose (SOP):</span> A detailed essay explaining your academic background, career goals, and why you want to pursue graduate studies.
          </li>
          <li>
            <span className="font-semibold">Letters of Recommendation:</span> Usually, 2-3 letters from professors or employers who know your academic or professional work.
          </li>
          <li>
            <span className="font-semibold">Resume/CV:</span> Highlight your academic achievements, work experience, internships, and relevant skills.
          </li>
        </ul>
      </div>
    </div>
        </div>
        
        {/* Right column (1/3 width) - Form stays here */}
        <div className="lg:col-span-1 mx-auto">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}