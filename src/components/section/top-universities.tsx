import { getActiveUniversities } from '@/app/(protected)/actions/university'
import React from 'react'
import MainCarousel from './main-carousel'

export default async function AllTopUniversities() {
    const response= await getActiveUniversities()
    const data= response.data || []
  return (
    <div className='container mx-auto space-y-4' id='top-universities'>
    <h2 className='text-3xl font-semibold text-center'>Top <span className='text-primary'>Universities</span></h2>
    <p className='text-center'>Apply to Top <span className='text-secondary'>Universities.</span></p>
    <MainCarousel data={data}/>
    </div>
  )
}
