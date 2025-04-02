import React from 'react'
import {WhyUsSection}   from '@/components/section/why-us-section'
import OurProcessSection from '@/components/section/our-process'
// import UniversityPartnersSection from '@/components/section/UniversityPartners'
import { AffiliateSection } from '@/components/section/affiliated-partner'
export default function WhyUs() {
  return (
    <div>
      <WhyUsSection/>
      <OurProcessSection/>
      <AffiliateSection/>
      {/* <UniversityPartnersSection/> */}
    </div>
  )
}
