import React from 'react'
import { fetchCourseByUniversity } from '@/app/(protected)/actions/course'
import CourseCarousel from './coursecarousel'

export default async function TopCourses({id,uniimg}:{
    id:string | undefined
    uniimg:string
}) {
    const response = await fetchCourseByUniversity(id)
       // Check if response or universities are undefined or null
       if (!response?.data?.courses || response.data.courses.length === 0) {
        return <p className='text-center text-gray-400'>No Courses.</p>;
    }
    const data= response.data.courses
   
  return (
   <CourseCarousel data={data} uniimg={uniimg} />
  )
}
