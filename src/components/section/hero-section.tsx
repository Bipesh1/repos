"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,

} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import Image from 'next/image'
import heroImage from "@/assets/hero.jpg"
import heroImage1 from "@/assets/hero1.jpg"

import { Button } from "../ui/button"
import { TypingAnimation } from "../magicui/typing-animation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { checkUser } from "@/app/(protected)/actions/user"
import RegisterGetstarted from "./register-getstarted"

export default function HeroSection() {
  return (
    <section className='w-full overflow-hidden bg-gradient-to-b from-background to-background/90 py-4 md:py-8'>
      <div className='container px-4 mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 items-center'>
        
        {/* Left Column - Carousel */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <Carousel
              plugins={[Autoplay({ delay: 4000 })]}
              className="w-full"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {[heroImage, heroImage1].map((image, index) => (
                  <CarouselItem key={index}>
                    <div className='relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[40rem] rounded-lg overflow-hidden'>
                      <Image
                        src={image}
                        alt="hero image"
                        className='object-cover'
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1280px) 100vw, 50vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} 
          className='bg-primary w-full px-6 py-8 sm:px-10 md:px-14 lg:px-20 xl:px-16 rounded-xl text-center xl:text-left flex flex-col justify-center space-y-5 sm:space-y-6 md:space-y-8 shadow-md'
        >
          <TypingAnimation className="text-white text-center xl:text-left text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Self-Apply. Get Accepted. Achieve More.
          </TypingAnimation>

          <p className='text-white/90 font-light text-sm sm:text-base md:text-lg text-center xl:text-left'>
            Apply to USA universities with our self-application platform and get assured scholarships with a single application.
          </p>

          <div className="w-full flex justify-center xl:justify-start">
            <RegisterGetstarted />
          </div>
        </motion.div>
      </div>
    </section>
  )
}