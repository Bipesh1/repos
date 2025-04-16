import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "../ui/sparkle";
import SocialLinks from "./social-links";
import logo from "@/assets/logo.png";
import { getActiveCountries } from "@/app/(protected)/actions/country";

// Updated navigation links to match navigation.tsx
const footerNavigation = {
  company: [
    { name: "About Us", href: "/company/about" },
    { name: "EduPilot", href: "/article/edupilot-nepal-for-self-apply-to-usa" },
    { name: "FAQ", href: "/company/faq" },
    { name: "Why Self Apply?", href: "/company/blog/why-self-apply-to-usa-in-nepal" },
    { name: "Why Us?", href: "/company/why-us" },
    { name: "Media Coverage", href: "/company/blog/media-coverage" },
    { name: "Blog", href: "/company/blog" },
    { name: "Pricing", href: "/pricing" },
  ],
  applyUSA: [
    { name: "Top Universities", href: "/company/blog/top-universities-in-usa-for-nepali-students" },
    { name: "Scholarships", href: "/company/blog/study-in-usa-with-scholarships-for-nepali-students" },
    { name: "For Working Professionals", href: "/company/blog/study-in-usa-for-working-professionals-in-nepal" },
    { name: "Visa Guide", href: "/company/blog/usa-visa-guide-in-nepal" },
    { name: "Bachelor", href: "/company/blog/study-bachelors-in-usa-from-nepal" },
    { name: "Masters", href: "/company/blog/study-masters-in-usa-from-nepal" },
    { name: "DBA", href: "/company/blog/dba-in-usa-fir-international-students" },
    { name: "PhD", href: "/company/blog/study-phd-in-usa-from-nepal" },
    { name: "Stem Courses", href: "/company/blog/stem-courses-in-usa-for-nepali-students" },
    { name: "Post Study Work", href: "/company/blog/post-study-job-in-usa-for-nepali-students" },
    { name: "Apply for Greencard", href: "/company/blog/how-to-get-greencard-after-study" },
    { name: "On Campus Job", href: "/company/blog/tips-for-getting-on-campus-job" },
  ],
  resources: [
    { name: "Course Advice", href: "/course-advice" },
    { name: "Education Loan", href: "/company/blog/education-loan-in-nepal" },
    { name: "Meet Alumni", href: "/company/blog/meet-alumini-from-usa-universities" },
    { name: "Assured Scholarship", href: "/company/blog/assured-scholarship" },
    { name: "Express Admission", href: "/company/blog/express-admission-to-usa-in-nepal" },
    { name: "MBBS", href: "/company/blog/study-mbbs-in-usa-from-nepal" },
    { name: "Why Singapore?", href: "/company/blog/study-in-singapore" },
    { name: "For Nursing", href: "/company/blog/career-for-nepali-nurse-in-usa" },
  ],
};

export default async function SparkleFooter() {
    const countriesResponse = await getActiveCountries().catch(error => {
      console.error("Error fetching countries:", error);
      return { data: [] };
    });
    
    const countries = countriesResponse.data || [];
  return (
    <div id="contact" className="w-screen overflow-hidden bg-primary text-white">
      {/* Decorative Background with Sparkles */}
      <div
        className="relative h-80 w-screen overflow-hidden 
          [mask-image:radial-gradient(50%_50%,white,transparent)]
          before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#ffcc00,transparent_90%)]
          before:opacity-100 after:absolute after:border-2 after:-left-1/2 after:top-1/2 after:aspect-[1/1.8]
          after:w-[200%] after:rounded-[50%] after:border-b after:border-[#d4af3766] after:bg-[#3b2f19]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <Sparkles
          density={400}
          size={2.4}
          direction="top"
          className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>

      {/* Logo Circle */}
      <div className="mx-auto -mt-52 w-screen max-w-2xl relative z-10">
        <div className="bg-white backdrop-blur-lg border border-primary p-4 w-28 h-28 mx-auto grid place-content-center rounded-full">
          <Image src={logo} alt="company logo" width={100} height={100} />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container max-w-7xl mx-auto px-4 pt-12">
        {/* Brief Description & Social Links */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 px-4">
          <p className="leading-6 opacity-90">
            Nepal's first self-apply platform for admission to top universities in the USA. Save more with access to scholarships and full control over your applications.
          </p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>

        {/* Navigation Links Columns */}
        <div className="grid mx-auto grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Countries Column */}
          <div>
            <h2 className="text-base font-semibold mb-3">Countries</h2>
            <ul className="space-y-2">
              {countries.map((country) => (
                <li key={country._id}>
                  <Link href={`/${country.name.toLowerCase()}?id=${country._id}`} className="text-white">
                        {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h2 className="text-base font-semibold mb-3">Company</h2>
            <ul className="space-y-2">
              {footerNavigation.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm opacity-90 hover:opacity-100 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Apply USA Column */}
          <div>
            <h2 className="text-base font-semibold mb-3">Apply USA</h2>
            <ul className="space-y-2">
              {footerNavigation.applyUSA.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm opacity-90 hover:opacity-100 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h2 className="text-base font-semibold mb-3">Resources</h2>
            <ul className="space-y-2">
              {footerNavigation.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm opacity-90 hover:opacity-100 transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-900/10 pt-8 flex flex-col sm:flex-row items-center gap-2 md:gap-4 justify-between text-xs leading-5 opacity-80">
          <p>&copy; 2025 Going College. All rights reserved.</p>
          <p>
            Designed and Developed by{" "}
            <Link href="https://techylads.net/" className="text-white font-semibold underline" target="_blank">
              TechyLads Solution 
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}