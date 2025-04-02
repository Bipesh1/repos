import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/section/navigation";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sparklefooter from "@/components/section/sparkle-footer";
import AdBanner from "@/components/section/advertisement-banner";

const poppins= Poppins({
  weight: ['400','500','600','700'],
  subsets: ['latin'],
})




export const metadata: Metadata = {
  title: "Going College",
  description: "Going College Consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <>
        <Navigation />
        <div className=" overflow-x-hidden py-10">{children}</div>

        <div className="overflow-x-hidden">
          <Sparklefooter/>
        </div>
        </>      
      
 
  );
}
