import React from "react";
import Image from "next/image";
import aboutus from "@/assets/aboutus.png";

export default function AboutUsSection() {
  return (
    <section
      id="aboutus"
      className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center items-start gap-10">
            <div className="flex flex-col justify-start items-start gap-4">
              <h6 className="text-base font-normal leading-relaxed text-secondary">About Us</h6>
              <h1 className="text-primary text-4xl font-bold font-manrope leading-normal">
                The Best Abroad Consultancy In Town
              </h1>
              <p className="text-base font-normal leading-relaxed opacity-80">
                We are dedicated to guiding students through every step of their journey to studying abroad. 
                Our commitment lies in providing expert <strong>consultation</strong>, <strong>application assistance</strong>, and <strong>career counseling</strong> 
                {" "}to help students achieve their dreams of global education.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-3.5 rounded-md border border-secondary/40 hover:border-secondary transition-all duration-700 ease-in-out">
                <h4 className="text-2xl font-bold font-manrope leading-9 opacity-90">10+ Years</h4>
                <p className="text-base font-normal leading-relaxed opacity-75">Helping Students Achieve Their Global Dreams</p>
              </div>
              <div className="p-3.5 rounded-md border border-secondary/40 hover:border-secondary transition-all duration-700 ease-in-out">
                <h4 className="text-2xl font-bold font-manrope leading-9 opacity-90">5000+ Students</h4>
                <p className="text-base font-normal leading-relaxed opacity-75">Successfully Placed in Top Universities</p>
              </div>
              <div className="p-3.5 rounded-md border border-secondary/40 hover:border-secondary transition-all duration-700 ease-in-out">
                <h4 className="text-2xl font-bold font-manrope leading-9 opacity-90">150+ Partnerships</h4>
                <p className="text-base font-normal leading-relaxed opacity-75">Collaborating with Universities Worldwide</p>
              </div>
              <div className="p-3.5 rounded-md border border-secondary/40 hover:border-secondary transition-all duration-700 ease-in-out">
                <h4 className="text-2xl font-bold font-manrope leading-9 opacity-90">98% Success Rate</h4>
                <p className="text-base font-normal leading-relaxed opacity-75">Guiding Students to Their Ideal Institutions</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end w-full h-[600px]">
              <Image
                className="rounded-md object-contain"
                src={aboutus}
                alt="About Us"
                width={600}
                height={600}
                priority
              />
          </div>
        </div>
      </div>
    </section>
  );
}
