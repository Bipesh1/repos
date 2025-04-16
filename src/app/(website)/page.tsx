import { AffiliateSection } from "@/components/section/affiliated-partner";
import FaqStatic from "@/components/section/faq-static";
import HeroSection from "@/components/section/hero-section";
import { MostSearch } from "@/components/section/most-searched";
import ServiceSection from "@/components/section/services-section";
import { Testimonials } from "@/components/section/testmonials";
import AllTopUniversities from "@/components/section/top-universities";
import { WhyUsSection } from "@/components/section/why-us-section";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <HeroSection/>
      <ServiceSection/>
      <WhyUsSection/>
      <AllTopUniversities/>
      <Testimonials/>
      <AffiliateSection/>
      <MostSearch/>
      <FaqStatic/>
      
     
    </div>
  );
}