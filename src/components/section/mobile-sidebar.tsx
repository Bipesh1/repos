import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { FileUser, Home, Menu, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getActiveCountries } from "@/app/(protected)/actions/country";
import { checkUser } from "@/app/(protected)/actions/user";
import { SearchBar } from "../search";

export default async function MobileSidebar() {
  const countriesResponse = await getActiveCountries().catch(error => {
    console.error("Error fetching countries:", error);
    return { data: [] };
  });
  
  const countries = countriesResponse.data || [];
  
  const userResponse = await checkUser().catch(() => {
    return { data: null };
  });
  
  const user = userResponse.data;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} className="text-gray-700" />
      </SheetTrigger>
      <SheetContent className="bg-white border-l-0 overflow-y-auto pb-20" side="right">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" width={100} height={100} />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-2 mb-6">
          <SearchBar />
        </div>

        {/* User Dashboard Button */}
        {user?.role === "user" && (
          user?.category === "none" ? (
            <Button variant="outline" className="w-full mb-4">
              <Link href="/payment" className="text-primary w-full text-left">
                Payment For Dashboard
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="w-full mb-4">
              <Link href="/studentdashboard" className="text-primary w-full text-left">
                Your Dashboard
              </Link>
            </Button>
          )
        )}
        {user?.role === "super-admin" && (
          <Button variant="outline" className="w-full mb-4">
            <Link href="/dashboard" className="text-primary w-full text-left">
              Your Dashboard
            </Link>
          </Button>
        )}
        {user?.role === "admin" && (
          <Button variant="outline" className="w-full mb-4">
            <Link href="/admindashboard" className="text-primary w-full text-left">
              Your Dashboard
            </Link>
          </Button>
        )}
        {user == null && (
          <Button className="bg-primary hover:bg-primary/80 w-full mb-4">
            <Link href="/login" className="w-full text-left">Login</Link>
          </Button>
        )}

        {/* Navigation Accordion */}
        <Accordion type="single" collapsible className="w-full text-gray-700">
          {/* Countries Section */}
          <AccordionItem value="countries">
            <AccordionTrigger className="text-base py-3">Countries</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-4">
                {countries?.length > 0 ? (
                  countries.map((country: any) => (
                    <div key={country._id} className="flex items-center gap-x-3">
                      <div className="w-6">
                        <Image src={country.image.url} alt={country.name} width={24} height={24} />
                      </div>
                      <Link href={`/${country.name.toLowerCase()}?id=${country._id}`} className="text-primary">
                        {country.name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-secondary/70">No countries available</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Company Section */}
          <AccordionItem value="company">
            <AccordionTrigger className="text-base py-3">Company</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-4">
                <Link href="/company/about" className="block text-secondary/80 hover:text-primary">
                  About Us
                </Link>
                <Link href="/article/edupilot-nepal-for-self-apply-to-usa~67eec22bf2e1824c806fb309" className="block text-secondary/80 hover:text-primary">
                  EduPilot
                </Link>
                <Link href="/company/faq" className="block text-secondary/80 hover:text-primary">
                  FAQ
                </Link>
                <Link href="/company/blog/why-self-apply-to-usa-in-nepal~67fe91eb6cc7857061d0b274" className="block text-secondary/80 hover:text-primary">
                  Why Self Apply?
                </Link>
                <Link href="/company/why-us" className="block text-secondary/80 hover:text-primary">
                  Why Us?
                </Link>
                <Link href="/company/blog/media-coverage~67eba33c755e391784ebce20" className="block text-secondary/80 hover:text-primary">
                  Media Coverage
                </Link>
                <Link href="/company/blog" className="block text-secondary/80 hover:text-primary">
                  Blog
                </Link>
                <Link href="/pricing" className="block text-secondary/80 hover:text-primary">
                  Pricing
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Apply USA Section */}
          <AccordionItem value="apply-usa">
            <AccordionTrigger className="text-base py-3">Apply USA</AccordionTrigger>
            <AccordionContent>
              {/* Guide Section */}
              <div className="mb-4">
                <h3 className="font-medium text-primary mb-2 pl-4">Guide</h3>
                <div className="space-y-2 pl-6">
                  <Link href="/company/blog/top-universities-in-usa-for-nepali-students" className="block text-secondary/80 hover:text-primary">
                    Top Universities
                  </Link>
                  <Link href="/company/blog/study-in-usa-with-scholarships-for-nepali-students" className="block text-secondary/80 hover:text-primary">
                    Scholarships
                  </Link>
                  <Link href="/company/blog/study-in-usa-for-working-professionals-in-nepal" className="block text-secondary/80 hover:text-primary">
                    For Working Professionals
                  </Link>
                  <Link href="/company/blog/usa-visa-guide-in-nepal" className="block text-secondary/80 hover:text-primary">
                    Visa Guide
                  </Link>
                </div>
              </div>

              {/* Universities Section */}
              <div className="mb-4">
                <h3 className="font-medium text-primary mb-2 pl-4">Universities</h3>
                <div className="space-y-2 pl-6">
                  <Link href="/company/blog/study-bachelors-in-usa-from-nepal" className="block text-secondary/80 hover:text-primary">
                    Bachelor
                  </Link>
                  <Link href="/company/blog/study-masters-in-usa-from-nepal" className="block text-secondary/80 hover:text-primary">
                    Masters
                  </Link>
                  <Link href="/company/blog/dba-in-usa-fir-international-students" className="block text-secondary/80 hover:text-primary">
                    DBA
                  </Link>
                  <Link href="/company/blog/study-phd-in-usa-from-nepal" className="block text-secondary/80 hover:text-primary">
                    PhD
                  </Link>
                </div>
              </div>

              {/* Living In USA Section */}
              <div>
                <h3 className="font-medium text-primary mb-2 pl-4">Living In USA</h3>
                <div className="space-y-2 pl-6">
                  <Link href="/company/blog/stem-courses-in-usa-for-nepali-students" className="block text-secondary/80 hover:text-primary">
                    Stem Courses
                  </Link>
                  <Link href="/company/blog/post-study-job-in-usa-for-nepali-students" className="block text-secondary/80 hover:text-primary">
                    Post Study Work
                  </Link>
                  <Link href="/company/blog/how-to-get-greencard-after-study" className="block text-secondary/80 hover:text-primary">
                    Apply for Greencard
                  </Link>
                  <Link href="/company/blog/tips-for-getting-on-campus-job" className="block text-secondary/80 hover:text-primary">
                    On Campus Job
                  </Link>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Resources Section */}
          <AccordionItem value="resources">
            <AccordionTrigger className="text-base py-3">Resources</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-4">
                <Link href="/company/blog/course-advice" className="block text-secondary/80 hover:text-primary">
                  Course Advice
                </Link>
                <Link href="/company/blog/education-loan-in-nepal" className="block text-secondary/80 hover:text-primary">
                  Education Loan
                </Link>
                <Link href="/company/blog/meet-alumini-from-usa-universities" className="block text-secondary/80 hover:text-primary">
                  Meet Alumni
                </Link>
                <Link href="/company/blog/assured-scholarship" className="block text-secondary/80 hover:text-primary">
                  Assured Scholarship
                </Link>
                <Link href="/company/blog/express-admission-to-usa-in-nepal" className="block text-secondary/80 hover:text-primary">
                  Express Admission
                </Link>
                <Link href="/company/blog/study-mbbs-in-usa-from-nepal" className="block text-secondary/80 hover:text-primary">
                  MBBS
                </Link>
                <Link href="/company/blog/study-in-singapore" className="block text-secondary/80 hover:text-primary">
                  Why Singapore?
                </Link>
                <Link href="/company/blog/career-for-nepali-nurse-in-usa" className="block text-secondary/80 hover:text-primary">
                  For Nursing
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact Information */}
        <div className="flex flex-col gap-2 items-center justify-center mt-8 text-gray-700 border-t pt-4">
          <Link href="mailto:inquiry@goingcollege.com">
            <span className="text-sm">inquiry@goingcollege.com</span>
          </Link>
          <p className="text-gray-500/80 text-sm">© inquiry@goingcollege.com | 2025</p>
          <div className="flex items-center gap-1 text-xs">
            <Link
              href="tel:+977-9851014902"
              className="transition-all ease-in-out duration-300 cursor-pointer"
            >
              9851014902
            </Link>{" "}
            |{" "}
            <Link href="tel:+977-9851014902" className="cursor-pointer">
              9851014902
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}