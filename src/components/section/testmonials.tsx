"use client"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useEffect,useState } from "react";
import test1 from "@/assets/test1.jpg"
import test2 from "@/assets/test2.jpg"
import test3 from "@/assets/test3.jpg"
import test4 from "@/assets/test4.jpg"


export function Testimonials() {

    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  const testimonials = [
    {
      quote:
        "I was stuck on selecting university for a longtime and I applied via GoingCollege. I got my admission within two week with assured scholarship.",
      name: "Charchit Ghimire",
      designation: "Wright State University",
      src: test1,
    },
    {
      quote:
        "I got my i20 within two weeks and I got complete guidance for visa interview. Highly recommend this platform.",
      name: "Ruchir Sharma",
      designation: "McNeese State University",
      src: test4,
    },
    
    {
      quote:
        "I am glad that now Nepali students can self apply to USA with GoingCollege. And achieve scholarships and save more money. I highly recommend to apply via GoingCollege.",
      name: "Samudra Nepal",
      designation: "University of Idaho",
      src: test2,
    },
  
  ];
  return (
    <div className="container mx-auto space-y-4 mt-20">
        <h2 className="text-center text-3xl md:text-4xl font-semibold">Our <span className="text-primary">Testimonials</span></h2>
        <p className="text-center text-gray-500">Hear From Our Satisfied <span className="text-secondary">Students.</span></p>
        {isClient && <AnimatedTestimonials testimonials={testimonials}/>}
    </div>
  )
  
}
