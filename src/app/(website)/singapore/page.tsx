import React from "react";
import CountryHeroSection from "@/components/country-hero-section";
import singapore from "@/assets/countryuni1.png"; // You might need to update this image path
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
  const { id } = await searchParams; // Ensure it's awaited
  const countryresponse = await fetchCountryById(id);
  const country = countryresponse.data.country;

  return (
    <div className="container mx-auto space-y-4">
      <CountryHeroSection
        image={singapore}
        altimage={null}
        address=""
        title="Study In Singapore"
        alt="singapore"
      />
      <div className="container mx-auto md:px-12 px-4 space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="grid grid-cols-1 space-y-4">
                <h2 className="text-2xl hover:no-underline">Introduction</h2>
                <p className="text-gray-500">
                  Discover the Lion City. Study in Singapore to experience one of the best education systems in the world, to earn a globally recognized qualification from high ranked institutions and to experience a multicultural society with a very high quality of life. A city of skyscrapers, Singapore is fast emerging as Asia's leading international study destination and is attracting students from all parts of the world, thanks to its reputation for being a center of academic excellence, universities and institutions that are highly placed in all major global rankings and this country being the IT & Business hub of Asia.
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 container text-gray-500">
                Singapore ranks high on other crucial parameters such as student satisfaction and safety and affordability. Singapore's status of being an economic powerhouse with excellent job opportunities across a diverse range of sectors complements its education system of international repute and makes this city country one of the most sought after study destinations globally.
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  <li>
                    <span className="text-primary font-bold">TOP RANKED INSTITUTIONS: </span>
                    <span className="text-secondary">
                      Singapore is home to world-class institutions like the National University of Singapore (NUS) and Nanyang Technological University (NTU), ranked #9 and #26 globally (QS 2024).
                    </span>
                  </li>
                  <li>
                    <span className="text-primary font-bold">HIGH QUALITY OF LIFE: </span>
                    <span className="text-secondary">
                      Ranked as the second-best country to live and work in, according to an HSBC ranking in 2019.
                    </span>
                  </li>
                  <li>
                    <span className="text-primary font-bold">ECONOMIC POWERHOUSE: </span>
                    <span className="text-secondary">
                      Singapore's economy has been ranked as the most open and most pro-business economy in the world with top sectors including Information Technology, Pharmaceuticals, Biotechnology, and Professional Services.
                    </span>
                  </li>
                  <li>
                    <span className="text-primary font-bold">GLOBAL BUSINESS HUB: </span>
                    <span className="text-secondary">
                      Many multinational companies such as Twitter, Dyson, Tencent, LinkedIn & Facebook have established their regional headquarters and global RnD laboratories in Singapore.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  Quick Facts
                </h2>
                <ul className="list-disc ml-6 text-gray-500">
                  <li>Ranked as the second-best country to live and work in, according to an HSBC ranking in 2019</li>
                  <li>2 universities ranked among the top 20 in the world</li>
                  <li>One of the financial capitals of the world</li>
                  <li>Institutions affiliated with top international universities in the USA, the UK, Canada & Australia</li>
                  <li>Transfer opportunities to parent campus</li>
                  <li>Masters of 1 Year and Bachelors of 2 or 3 years</li>
                  <li>Paid - Unpaid Internship opportunities for the students</li>
                  <li>Lower tuition fee and living expenses with plenty of scholarships on offer</li>
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
              <h2 className="text-2xl font-semibold">Cost of <span className="text-secondary">Education</span></h2>

              <p className="text-gray-700">
                The cost of studying in Singapore is generally more affordable than Western countries, while still offering world-class education. Here's a detailed breakdown of expenses for students:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Tuition Fees
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4 text-gray-600">
                    <li>Public universities like NUS and NTU typically charge between SGD 12,000 to SGD 20,000 per year for most undergraduate programs after the MOE Tuition Grant (which international students can apply for)</li>
                    <li>Without the grant, tuition can range from SGD 25,000 to SGD 40,000+ annually</li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Living Expenses
                  </h3>
                  <p className="mb-2 text-gray-600">On average, students can expect to spend SGD 800 to SGD 1,200 per month on accommodation, food, transport, and personal expenses. That's around NPR 78,000 to NPR 117,000 per month.</p>
                  <ul className="list-inside list-disc space-y-2 pl-4 text-gray-600">
                    <li><strong>Accommodation:</strong> SGD 300-700 per month (dormitories to shared apartments)</li>
                    <li><strong>Food:</strong> SGD 300-400 per month</li>
                    <li><strong>Transportation:</strong> SGD 100-150 per month</li>
                    <li><strong>Personal expenses:</strong> SGD 100-200 per month</li>
                  </ul>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Visa & Miscellaneous Costs
                  </h3>
                  <ul className="list-inside list-disc space-y-2 pl-4 text-gray-600">
                    <li>Student's Pass application fee: SGD 30</li>
                    <li>Issuance fee (once approved): SGD 60</li>
                    <li>Medical checkup & insurance: Varies (~SGD 100–300)</li>
                    <li>Books and study materials: SGD 200-500 per semester</li>
                  </ul>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-base font-semibold text-secondary">
                    Total Annual Budget
                  </h3>
                  <p className="text-gray-600">
                    Overall, a student should budget around SGD 18,000 to SGD 25,000 per year on average (approximately NPR 1.7M to NPR 2.3M), depending on lifestyle and program choice.
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          <div id="scholarship-options" className="">
            <h2 className="text-2xl font-semibold mb-6">
              Scholarship <span className="text-secondary">Options</span> 
            </h2>
            <p className="mb-4 text-gray-500">
              Singapore offers several merit-based and need-based scholarships for international students. Here are some popular options:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary">Singapore Government Scholarships</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-500">
                  <li>
                    <span className="font-semibold">ASEAN Undergraduate Scholarship (AUS):</span>
                    <ul className="ml-6">
                      <li>For outstanding students from ASEAN countries</li>
                      <li>Covers tuition fees + living allowance</li>
                      <li>Offered by NUS, NTU, and SMU</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">SINGA – Singapore International Graduate Award:</span>
                    <ul className="ml-6">
                      <li>For PhD students in science and engineering fields</li>
                      <li>Full tuition + monthly stipend + airfare</li>
                      <li>Offered by A*STAR in partnership with top universities</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary">University-Specific Scholarships</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-500">
                  <li>
                    <span className="font-semibold">NUS Global Merit Scholarship:</span>
                    <ul className="ml-6">
                      <li>Highly competitive; full tuition + allowance</li>
                      <li>For top-performing undergraduates</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">NTU International Scholarships:</span>
                    <ul className="ml-6">
                      <li>Merit-based; can cover partial or full tuition</li>
                      <li>Apply directly through the NTU application portal</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary">Other Opportunities</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-500">
                  <li>
                    <span className="font-semibold">Institutional Financial Aid:</span> Some universities offer need-based aid or on-campus work opportunities
                  </li>
                  <li>
                    <span className="font-semibold">External Scholarships:</span> You can also apply for global scholarships like the Commonwealth Scholarship, Inlaks, or Fulbright (for graduate study)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="working-opportunities" className="">
            <h2 className="text-2xl font-semibold mb-6">
              Working <span className="text-secondary">Opportunities</span> 
            </h2>
            <p className="mb-4 text-gray-700">
              International students in Singapore can work part-time during their studies without a separate work permit, as long as:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-500">
              <li>They are enrolled in a full-time program at an approved institution (like NUS, NTU, SMU, etc.)</li>
              <li>Work is limited to 16 hours per week during term time</li>
              <li>They can work full-time during holidays or semester breaks</li>
            </ul>
            <p className="mt-4 text-gray-500">
              Note: Private institutions not registered with the Singapore Ministry of Education may not offer this benefit. Always check with your university.
            </p>
          </div>

          <div id="studying-abroad" className="">
            <h2 className="text-2xl font-semibold mb-6">
              Studying in the <span className="text-secondary">USA After Singapore</span> 
            </h2>
            <p className="mb-4 text-gray-700">
              Students who have graduated from Singaporean institutions are eligible to apply for higher education in the United States. Your qualifications are recognized internationally, and you can proceed with your U.S. university applications.
            </p>
            <p className="mb-4 text-gray-700">Key steps include:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-500">
              <li><span className="font-semibold">Preparing required documents:</span> Like transcripts, recommendation letters, and standardized test scores (e.g., GRE, TOEFL, or IELTS).</li>
              <li><span className="font-semibold">University Applications:</span> Apply directly to U.S. universities through platforms like the Going College or individual school portals.</li>
              <li><span className="font-semibold">Visa Process:</span> After acceptance, you can apply for a U.S. student visa (F-1) to study in the U.S.</li>
            </ul>
            <p className="mt-4 text-gray-500">
              Studying in Singapore also gives you an international perspective, making your application to U.S. universities stand out.
            </p>
          </div>

          <div id="admission-requirements" className="">
            <h2 className="text-2xl font-semibold mb-6">
              Admission <span className="text-secondary">Requirements</span> 
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Academic Qualifications</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Completion of +2/Grade 12 or A-Levels (with strong grades)</li>
                <li>For diploma programs: SEE or equivalent may be considered</li>
                <li>For postgraduate study: A recognized Bachelor's degree</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>Academic transcripts and certificates</li>
                <li>Valid passport</li>
                <li>English language proficiency (IELTS/TOEFL — usually required unless medium of instruction is English)</li>
                <li>Statement of Purpose (SOP) or personal statement</li>
                <li>Letters of recommendation (for Master's/PhD)</li>
                <li>Passport-sized photographs</li>
                <li>Application fee (varies by university)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Language Requirements</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-500">
                <li>IELTS: Minimum 6.0 – 6.5 (varies by course)</li>
                <li>TOEFL: Minimum 80 – 90 iBT</li>
                <li>Some universities waive this if your previous education was in English</li>
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