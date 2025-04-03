import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default function CountryHeroSection({
  title,
  image,
  alt,
  altimage,
  address,
  logo,
  logoAlt = "University Logo"
}: {
  title: string;
  image: StaticImageData | null;
  alt: string;
  altimage: string | null;
  address: string;
  logo?: StaticImageData | string | null; // 🔥 new prop for logo
  logoAlt?: string; // Optional alt text
}) {
  return (
    <section>
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src={image || altimage || ""}
          alt={alt}
          className="object-cover w-full max-h-80"
          width={500}
          height={500}
        />
        <div className="absolute bottom-0 text-white p-4 space-y-4">
          <h1 className="text-4xl flex items-center gap-2">
            {title}
            {logo && (
              <Image
                src={logo}
                alt={logoAlt}
                width={80}
                height={80}
                className="inline-block object-contain rounded-md"
              />
            )}
          </h1>
          <h2 className="flex items-center space-x-2">
            {address && <CiLocationOn className="text-primary text-2xl" />}
            {address}
          </h2>
        </div>
      </div>
    </section>
  );
}
