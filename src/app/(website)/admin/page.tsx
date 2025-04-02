import React from "react";
import login1 from "@/assets/login1.png";
import login2 from "@/assets/login2.png";
import Image from "next/image";
import LoginAdmin from "@/components/section/loginformadmin";

export default function page() {
  return (
    <section className="container mx-auto space-y-10 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:px-12 px-4 place-content-center mt-10">
      <div className="flex justify-center">
        <LoginAdmin />
      </div>
      <div className="flex flex-col space-y-10 md:space-y-10 items-center">
      <div className="md:w-1/2 md:h-1/2 w-full h-full"> 
        <Image
          src={login1}
          alt="login"
          className="object-cover min-h-[100px] md:w-100 md:h-52 w-full h-full"
          width={500}
          height={500}
          />
      </div>
      <div className="md:w-1/2 md:h-1/2 w-full h-full"> 
        <Image
          src={login2}
          alt="login"
          className="object-cover min-h-[100px]  md:w-100 md:h-52 w-full"
          width={500}
          height={500}
        />
      </div>
      </div>
    </section>
  );
}
