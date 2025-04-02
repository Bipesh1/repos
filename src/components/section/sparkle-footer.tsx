import React from "react";
import { Sparkles } from "../ui/sparkle";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./social-links";
import logo from "@/assets/logo.png"

export default function Sparklefooter() {
  return (
    <div
      id="contact"
      className=" w-screen overflow-hidden bg-primary text-white">
      <div
        className="relative  h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] 
before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#ffcc00,transparent_90%)] before:opacity-100  
after:absolute after:border-2 after:-left-1/2 after:top-1/2 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#d4af3766] after:bg-[#3b2f19]
">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px] "></div>
        <Sparkles
          density={400}
          size={2.4}
          direction="top"
          className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </div>
      <div className="mx-auto -mt-52  w-screen max-w-2xl relative z-10">
        <div className="bg-white  backdrop-blur-lg border border-primary p-4  w-28 h-28 mx-auto grid place-content-center rounded-full">
         <Image
         src={logo}
         alt="company logo"
         width={100}
         height={100}
         />
        </div>
      </div>

      <div className=" container mx-auto px-4 ">
        <div className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-full lg:col-span-4 lg:flex justify-start lg:pr-6 lg:py-3 mb-5 lg:mb-0">
            <div className="relative flex-col flex gap-5 xl:gap-11 items-center px-4 py-5 xl:py-9">
              <p className="text-center leading-6 opacity-90 ">We help students achieve their dream of studying abroad by providing expert guidance on applications, visas, scholarships, and more.</p>
              <SocialLinks />
            </div>
          </div>
          <FooterNavigation />
          <div className="lg:py-10 col-span-full md:col-span-6 place-items-center md:place-items-start lg:col-span-4  flex-col gap-5 opacity-90 hidden md:block text-justify px-5">
            “At Going College Abroad, we believe in making your dream of studying abroad a reality. With expert guidance, personalized consultation, and strong partnerships with top universities worldwide, we ensure a seamless admission process.
          </div>
        </div>
        <div className="w-full pr-3 mx-auto mt-10 border-t border-gray-900/10 pt-8 flex flex-col sm:flex-row items-center gap-2 md:gap-4 justify-between text-xs leading-5 mb-4 opacity-80">
          <p>&copy; 2025 Going College Abroad. All rights reserved.</p>
          <p>
            Designed and Developed by{" "}
            <Link
              href="https://techylads.net/"
              className="text-white font-semibold  underline"
              target="blank">
              TechyLads
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const FooterNavigation = () => (
  <div className="lg:py-10 col-span-full  md:place-items-start md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-3">
    <div>
      <h3 className="text-sm font-semibold leading-6 ">Quick Links</h3>
      <div className="mt-6 space-y-4">
        {navigation.connect.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className="text-sm leading-6  opacity-90 hover:opacity-100 group/sublink flex items-center gap-1">
              {item.name}
              <Arrow />
            </Link>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
      <div className="mt-6 space-y-4">
        {navigation.company.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className="text-sm leading-6 opacity-90 hover:opacity-100   group/sublink flex items-center gap-1">
              {item.name}
              <Arrow />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const navigation = {
  connect: [
    { name: "Universities", href: "/universities" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ],
};

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-right transition-all -rotate-45 group-hover/sublink:rotate-0 duration-200 group-hover/sublink:translate-x-1.5 ease-in-out">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
