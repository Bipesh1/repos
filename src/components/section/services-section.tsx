import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa6";



export default function ServiceSection() {
  return (
    <section className='container mx-auto md:px-12 px-4 space-y-20 mt-20'>
        <div className='container mx-auto text-center space-y-5'>
            <h2 className='text-3xl font-semibold'>How It<span className='text-primary'>{" "}Works?</span></h2>
            <p className='text-center'>Simple steps to apply,track and<span className='text-secondary'> secure your admissions.</span>.</p>
        </div>
        <div className='container mx-auto border-red-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-5  place-items-center'>
            <div className='flex flex-col justify-center items-center space-y-4' >
                <FaUser className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>Register</p>
                <p>Create account, <span className='text-secondary'>upload documents.</span>.</p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4' >
                <FaUniversity className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>Search University</p>
                <p>Search your universities <span className='text-secondary'>and courses.</span>.</p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'  >
                <RiMoneyDollarBoxLine className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>Assured <span className='text-primary'>Scholarship</span></p>
                <p>Find Scholarships <span className='text-secondary'>Accordingly.</span>.</p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'  >
                <FaWpforms className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>Self <span className='text-primary'>Apply</span></p>
                <p>Submit application & get <span className='text-secondary'>admission</span>.</p>
            </div>
        </div>
    </section>
  )
}
