"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import Image, { StaticImageData } from 'next/image'
import heroImage from "@/assets/hero.jpg"
import heroImage1 from "@/assets/hero1.jpg"
import { Button } from "@/components/ui/button"
import { TypingAnimation } from "@/components/magicui/typing-animation"


export default function PageHeroSection({img1,img2,title,description}:{
    img1:StaticImageData,
    img2:StaticImageData,
    title:string,
    description:string
}
) {
  return (
    <section className='container min-w-full xl:min-w-[768px] mx-auto grid md:grid-cols-2 grid-cols-1 space-y-10 md:space-y-0  mb-10'>
        <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className=""
            >
              <CarouselContent className=''>
                {[heroImage,heroImage1].map((image, index) => (
                  <CarouselItem key={index} className='mx-auto' >
                    <div className='relative w-full h-[40rem]'>
                    <Image
                      src={image}
                      alt="singing bowl"
                      className='object-contain'
                      fill
                      />
                      </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
       
        <motion.div initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} className='flex bg-primary  flex-col justify-center text-3xl p-5 md:p-0 text-center md:text-5xl font-semibold space-y-8 '>
            <TypingAnimation className="text-white text-4xl">{title}</TypingAnimation>
            <p className='text-white font-light text-base'>{description}</p>
            <div className="grid grid-cols-2 w-1/2 mx-auto gap-x-5">
                <Button className="bg-blue-800 hover:bg-blue-800/80 rounded-full">Register</Button>
                <Button className="bg-secondary hover:bg-secondary/80 rounded-full">Get Started</Button>
            </div>
        </motion.div>
    </section>
  )
}
