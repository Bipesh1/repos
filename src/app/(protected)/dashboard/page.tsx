"use client"
import React from 'react'
import { LuCircleArrowLeft } from "react-icons/lu";
import {UniversityChart } from './(components)/universitychart';
import { FaqChart } from './(components)/faqchart';
import { StudentChart } from './(components)/userchart';

export default function page() {
  return (
    <div className='space-y-4'>
     <p className='text-xl font-semibold'>Welcome to your page admin</p>
     <p className='gap-x-4 flex items-center'><LuCircleArrowLeft className='text-2xl text-primary'/>Get Started By Managing Your Consultancy.</p>
    <div className='grid grid-cols-2'>
     <UniversityChart/>
     <FaqChart/>
     <StudentChart/>
      </div>     
    </div>

  )
}
