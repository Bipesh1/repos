import { fetchUniversityByCountry } from '@/app/(protected)/actions/university'
import React from 'react'
import Carousel from './carousel-university'

export default async function TopUniversities({id}:{
    id:string | undefined
}) {
   
    const response = await fetchUniversityByCountry(id)
       // Check if response or universities are undefined or null
       if (!response?.data?.universities || response.data.universities.length === 0) {
        return <p className='text-center text-gray-400'>No Universities.</p>;
    }
    const data= response.data.universities
   
  return (
   <Carousel data={data}/>
  )
}
