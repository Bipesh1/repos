import React from 'react'
import AboutUsSection from '@/components/section/about-us'
import ValuesSection from './(component)/values'
import ResourcesSection from './(component)/resources'
import { Testimonials } from '@/components/section/testmonials'
export default function page() {
  return (
    <div>
      <AboutUsSection/>
      <ValuesSection/>
      <Testimonials/>
      <ResourcesSection/>
    </div>
  )
}
