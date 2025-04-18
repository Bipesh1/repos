import { fetchUniversityById, fetchUniversityBySlug } from '@/app/(protected)/actions/university';
import React from 'react'
import CountryHeroSection from "@/components/country-hero-section";


import InquiryForm from "@/components/inquiryform";
import { fetchCourseById, fetchCourseBySlug } from '@/app/(protected)/actions/course';
import CourseInfoCard from '@/components/courseinfocard';
import { NavigationCourse } from '@/components/navigation-courses';
import parse from "html-react-parser"

export async function generateMetadata({ params }: { params: { slug: string; courseid: string } }) {
  const { slug, courseid } = params;

  const uniResponse = await fetchUniversityBySlug(slug);
  const courseResponse = await fetchCourseBySlug(courseid);

  const university = uniResponse?.data?.university;
  const course = courseResponse?.data?.course;

  if (!course || !university) {
    return {
      title: "Course Not Found | GoingCollege",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: `${course.title} at ${university.name} | GoingCollege`,
    description:
      course.overview?.replace(/<[^>]*>?/gm, "").slice(0, 150) ||
      `Explore the ${course.title} course offered at ${university.name}, including fees, duration, and scholarships.`,
    openGraph: {
      title: `${course.title} at ${university.name} | GoingCollege`,
      description:
        course.overview?.replace(/<[^>]*>?/gm, "").slice(0, 150) ||
        `Learn more about ${course.title} at ${university.name}.`,
      images: university.image?.url ? [{ url: university.image.url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} at ${university.name} | GoingCollege`,
      description:
        course.overview?.replace(/<[^>]*>?/gm, "").slice(0, 150) ||
        `Details on ${course.title}, offered at ${university.name}.`,
      images: university.image?.url ? [university.image.url] : [],
    },
  };
}

export default async function Page({params}:{
    params:{
        slug:string;
        courseid: string;
    }
}) {
    const {slug,courseid}= await params

    const uniresponse= await fetchUniversityBySlug(slug)
    const unidata= uniresponse.data.university
    const courseresponse=await fetchCourseBySlug(courseid)
    const coursedata= courseresponse.data.course
  return (
    <div className="container mx-auto space-y-4">
      <CountryHeroSection image={null} address={unidata.address} altimage={unidata.image.url} title={coursedata.title} alt="usa" />
      <div className="container md:px-12 px-4 space-y-4">
      <CourseInfoCard 
          courseFee={coursedata.fee} 
          courseDuration={coursedata.duration} 
          courseEntryScore={coursedata.entryScore}
      />

      </div>
      <NavigationCourse/>
      <div className="container mx-auto md:px-12 px-4 scroll-smooth space-x-0 md:space-x-32 grid grid-cols-1 lg:grid-cols-2">
        <div>
        <div className='container space-y-10'>

        <div className=" space-y-4" id="description">
                <h3 className="text-xl text-justify font-semibold text-secondary">
                  Course Overview
                </h3>
                {coursedata.overview&&
              <span>{parse(coursedata.overview)}</span>
            }
                
          </div>
          <div className=" space-y-4" id="scholarship">
                <h3 className="text-xl font-semibold text-secondary">
                  Scholarship
                </h3>
                {coursedata.scholarship&&
                <span>{parse(coursedata.scholarship)}</span>
            }
                
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
