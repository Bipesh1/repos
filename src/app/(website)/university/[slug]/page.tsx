import { fetchCourseByUniversity } from '@/app/(protected)/actions/course'
import { fetchUniversityById, fetchUniversityBySlug } from '@/app/(protected)/actions/university';
import React from 'react'
import CountryHeroSection from "@/components/country-hero-section";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InquiryForm from "@/components/inquiryform";
import TopCourses from '@/components/topcourses';
import { NavigationUniversity } from '@/components/navigation-university';
import { Button } from '@/components/ui/button';
import { checkUser } from '@/app/(protected)/actions/user';
import ApplyUniversity from '@/app/(protected)/studentdashboard/universities/(components)/apply-to-uni';
import parse from "html-react-parser";


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await fetchUniversityBySlug(slug);
  const university = response?.data?.university;

  if (!university) {
    return {
      title: "University Not Found | GoingCollege",
      description: "The university you're looking for could not be found.",
    };
  }

  return {
    title: `${university.name} | GoingCollege`,
    description: university?.metaDescription || `Explore courses, scholarships, and requirements for studying at ${university.name}.`,
    openGraph: {
      title: `${university.name} | GoingCollege`,
      description: university?.metaDescription || `Explore courses and scholarships at ${university.name}.`,
      images: university.image?.url ? [{ url: university.image.url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${university.name} | GoingCollege`,
      description: university?.metaDescription || `Explore courses, scholarships, and more about ${university.name}.`,
      images: university.image?.url ? [university.image.url] : [],
    },
  };
}



export default async function Page({params}:{
    params:{
        slug:string;
    }
}) {
    const userrespone= await checkUser()
    const data= userrespone.data
    const {slug}= await params
    const uniresponse= await fetchUniversityBySlug(slug)
    const unidata= uniresponse.data.university
  return (
    <div className="container mx-auto space-y-4">
      <CountryHeroSection image={null} logo={unidata.uniLogo?.url} altimage={unidata.image?.url} address={unidata.address} title={unidata.name} alt={unidata.imageAlt} />
      <div className="container md:px-12 px-4 space-y-4">
      {data && data.role && data.role === "user" && data.category !== "none" && (
  <Button className='float-end cursor-pointer' variant={"outline"}>
    <ApplyUniversity id={unidata._id}/>
  </Button>
)}
      
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
          <h2 className="text-xl">
                  About Us
                </h2>
            <AccordionTrigger>
           
            <p>Go through the about section to know more about the university.</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 ql-editor">
            
                   { parse(unidata.content)}
                
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <NavigationUniversity/>
      <div className="container mx-auto md:px-12 px-4 scroll-smooth space-x-0 md:space-x-32 grid grid-cols-1 lg:grid-cols-2">
        <div>
        <div className="" id="topuniversities">
        <h2 className="text-xl font-semibold text-primary">Top Courses</h2>
        <TopCourses id={unidata._id} uniimg={unidata.image.url} />
        </div>
        <div className="" id="faq"></div>
        <div className='container space-y-10'>

        <div className=" space-y-4" id="description">
                <h3 className="text-xl text-justify font-semibold text-secondary">
                  Requirements
                </h3>
                <span className='text-gray-500 ql-editor'>{unidata.content&&
                parse(unidata.syllabus)
            }</span>
                
          </div>
          <div className=" space-y-4" id="scholarship">
                <h3 className="text-xl font-semibold text-secondary">
                  Scholarship
                </h3>
                <span className='text-gray-500 ql-editor'>{unidata.scholarship&&
               parse(unidata.scholarship)
            }
            </span>
                
          </div>
            </div>
       
        </div>
        <div>
          <InquiryForm/>
        </div>
      </div>
    </div>

  )
}
