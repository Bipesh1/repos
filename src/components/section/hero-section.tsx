"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import Image from 'next/image'
import heroImage from "@/assets/hero-img1.webp"

import { Button } from "../ui/button"
import { TypingAnimation } from "../magicui/typing-animation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { checkUser } from "@/app/(protected)/actions/user"
import RegisterGetstarted from "./register-getstarted"

export default function HeroSection() {
  return (
    <section className='container mx-auto px-4 sm:px-6 grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 lg:gap-12 py-8 md:py-12'>
      {/* Left column - Carousel */}
      <div className="w-full flex items-center justify-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {[heroImage, heroImage].map((image, index) => (
              <CarouselItem key={index} className='mx-auto'>
                <div className='relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[40rem]'>
                  <Image
                    src={image}
                    alt="hero image"
                    className='object-contain'
                    fill
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Right column - Text content */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} 
        className='flex bg-primary flex-col justify-center px-6 py-8 sm:p-10 md:p-8 lg:p-12 text-center md:text-5xl font-semibold space-y-4 sm:space-y-6 md:space-y-8'
      >
        <TypingAnimation className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
          The Best Consultancy in the Town
        </TypingAnimation>
        
        <p className='text-white font-light text-sm sm:text-base'>
          Join us in this journey. The step to make your flow better is 
          simpler than you imagine.
        </p>
        
        <div className="w-full flex justify-center">
          <RegisterGetstarted/>
        </div>
      </motion.div>
    </section>
  )
}