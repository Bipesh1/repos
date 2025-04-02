import { StaticImageData } from "next/image";
import React from "react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default function CountryHeroSection({
  title,
  image,
  alt,
  altimage,
  address
}: {
  title: string;
  image: StaticImageData | null;
  alt: string;
  altimage:string |null
  address: string
}) {
  return (
    <section>
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Black overlay for entire image */}
        <Image src={image || altimage || ""} alt={alt} className="object-cover w-full max-h-80" width={500} height={500} />
        <div className="absolute bottom-0 text-white p-4 space-y-4">

        <h1 className="text-4xl">
          {title}
        </h1>
          <h2 className="flex items-center space-x-4">{address &&<CiLocationOn className="text-primary text-2xl"/>}{address}</h2>
        </div>
        
      </div>
    </section>
  );
}
