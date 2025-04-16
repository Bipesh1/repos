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
    { name: "EduPilot", href: "/article/edupilot-nepal-for-self-apply-to-usa~67eec22bf2e1824c806fb309" },
    { name: "FAQ", href: "/company/faq" },
    { name: "Why Self Apply?", href: "/company/blog/why-self-apply-to-usa-in-nepal~67fe91eb6cc7857061d0b274" },
    { name: "Why Us?", href: "/company/why-us" },
    { name: "Media Coverage", href: "/company/blog/media-coverage~67eba33c755e391784ebce20" },
    { name: "Blog", href: "/company/blog" },
    { name: "Pricing", href: "/pricing" },
  ],
  applyUSA: [
    { name: "Top Universities", href: "/company/blog/top-universities-in-usa-for-nepali-students~67f80464327ca2a732f32f0a" },
    { name: "Scholarships", href: "/company/blog/study-in-usa-with-scholarships-for-nepali-students~67f7fcf3f30adbf521cc3e12" },
    { name: "For Working Professionals", href: "/company/blog/study-in-usa-for-working-professionals-in-nepal~67f9236338f1f786eb6d102c" },
    { name: "Visa Guide", href: "/company/blog/usa-visa-guide-in-nepal~67fe97b8a5995c7cf121d651" },
    { name: "Bachelor", href: "/company/blog/study-bachelors-in-usa-from-nepal~67f932fed4f1065b96d0e855" },
    { name: "Masters", href: "/company/blog/study-masters-in-usa-from-nepal~67f936891451002523b4dd70" },
    { name: "DBA", href: "/company/blog/dba-in-usa-fir-international-students~67f9fd2f9c65eac08f3c6ad1" },
    { name: "PhD", href: "/company/blog/study-phd-in-usa-from-nepal~67f92ae62b62a1700762852c" },
    { name: "Stem Courses", href: "/company/blog/stem-courses-in-usa-for-nepali-students~67fe8f93ba63302c15c5ab84" },
    { name: "Post Study Work", href: "/company/blog/post-study-job-in-usa-for-nepali-students~67fe8d35ba63302c15c5aa5e" },
    { name: "Apply for Greencard", href: "/company/blog/how-to-get-greencard-after-study~67fbdf96f197f9fe307e36a0" },
    { name: "On Campus Job", href: "/company/blog/tips-for-getting-on-campus-job~67fe7bb5f7a46ee89f94d168" },
  ],
  resources: [
    { name: "Course Advice", href: "/company/blog/course-advice~67e50dc45644b83ab5a29086" },
    { name: "Education Loan", href: "/company/blog/education-loan-in-nepal~67fa8ad413b6d24f4b3f22c5" },
    { name: "Meet Alumni", href: "/company/blog/meet-alumini-from-usa-universities~67fa126a0db45ebf3417867d" },
    { name: "Assured Scholarship", href: "/company/blog/assured-scholarship~67e50ebf5644b83ab5a29120" },
    { name: "Express Admission", href: "/company/blog/express-admission-to-usa-in-nepal~67f9273e67f097962bcd252b" },
    { name: "MBBS", href: "/company/blog/study-mbbs-in-usa-from-nepal~67f92d9449c72577ed5d60bc" },
    { name: "Why Singapore?", href: "/company/blog/study-in-singapore~67fbb82351825db8d67e6b76" },
    { name: "For Nursing", href: "/company/blog/career-for-nepali-nurse-in-usa~67fb9ed88d1b748b994b69ef" },
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