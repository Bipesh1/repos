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
                {[heroImage,heroImage].map((image, index) => (
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
            <TypingAnimation className="text-white text-4xl">The Best Consultancy in the Town</TypingAnimation>
            <p className='text-white font-light text-base'>Join us in this journey. The step to make your flow better is 
            simpler than you imagine.</p>
            <RegisterGetstarted/>
        </motion.div>
    </section>
  )
}
