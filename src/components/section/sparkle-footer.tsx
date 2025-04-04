import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "../ui/sparkle";
import SocialLinks from "./social-links";
import logo from "@/assets/logo.png";

// Navigation links provided from your navigation bar
const footerNavigation = {
  countries: [
    { name: "USA", href: "/countries/usa" },
    { name: "UK", href: "/countries/uk" },
    { name: "Canada", href: "/countries/canada" },
    { name: "Australia", href: "/countries/australia" },
  ],
  company: [
    { name: "About Us", href: "/company/about" },
    { name: "EduPilot", href: "/company/blog/67eba2b3755e391784ebcd99" },
    { name: "FAQ", href: "/company/faq" },
    { name: "Why Self Apply?", href: "/company/blog/67eba2fd755e391784ebcddc" },
    { name: "Why Us?", href: "/company/why-us" },
    { name: "Media Coverage", href: "/company/blog/67eba33c755e391784ebce20" },
    { name: "Blog", href: "/company/blog" },
    { name: "Pricing", href: "/company/blog/67eba390755e391784ebcfaa" },
  ],
  applyUSA: [
    { name: "Top Universities", href: "/#top-universities" },
    { name: "Scholarships", href: "/company/blog/67dfbf97b3691ca0b847fa70" },
    { name: "For Working Professionals", href: "/company/blog/67e510195644b83ab5a2920e" },
    { name: "Visa Guide", href: "/company/blog/67dfc007b3691ca0b847faf2" },
    { name: "Bachelor", href: "/company/blog/67dfc18bb3691ca0b847fb43" },
    { name: "Masters", href: "/company/blog/67dfc239b3691ca0b847fb96" },
    { name: "DBA", href: "/company/blog/67dfc053b3691ca0b847fb05" },
    { name: "PhD", href: "/company/blog/67dfc32fb3691ca0b847fbca" },
    { name: "Job Opportunities", href: "/company/blog/67dfc8acb3691ca0b847fd51" },
    { name: "Post Study Work", href: "/company/blog/67dfc397b3691ca0b847fc1b" },
    { name: "Apply for Greencard", href: "/company/blog/67e10c80318f258e0d32c274" },
    { name: "On Campus Job", href: "/company/blog/67e10cd8318f258e0d32c295" },
  ],
  resources: [
    { name: "Course Advice", href: "/company/blog/67e50dc45644b83ab5a29086" },
    { name: "Education Loan", href: "/company/blog/67e50e105644b83ab5a290b4" },
    { name: "Meet Alumni", href: "/company/blog/67e50e7c5644b83ab5a290e8" },
    { name: "Assured Scholarship", href: "/company/blog/67e50ebf5644b83ab5a29120" },
    { name: "Express Admission", href: "/company/blog/67e50ef75644b83ab5a2915d" },
    { name: "MBBS", href: "/company/blog/67e50f365644b83ab5a29197" },
    { name: "For Working Professionals", href: "/company/blog/67e510195644b83ab5a2920e" },
    { name: "For Nursing", href: "/company/blog/67e50f6d5644b83ab5a291d2" },
  ],
};

// "Locate Us" addresses

export default function SparkleFooter() {
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
            We help students achieve their dream of studying abroad by providing expert guidance on applications, visas, scholarships, and more.
          </p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>

        {/* Navigation Links Columns */}
        <div className="grid mx-auto  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Countries Column */}
          <div>
            <h2 className="text-base font-semibold mb-3">Countries</h2>
            <ul className="space-y-2">
              {footerNavigation.countries.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm opacity-90 hover:opacity-100 transition-all">
                    {link.name}
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
