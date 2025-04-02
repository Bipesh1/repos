import React from 'react'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";

export default function ServiceSection() {
  return (
    <section className='container mx-auto md:px-12 px-4 space-y-20 mt-20'>
        <div className='container mx-auto text-center space-y-5'>
            <h2 className='text-3xl font-semibold'>What We<span className='text-primary'>{" "}Provide More</span></h2>
            <p className='text-center'>Its easier than you imagine.Steps away from <span className='text-secondary'>streamlining your flow</span>.</p>
        </div>
        <div className='container mx-auto border-red-500 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-5  place-items-center'>
            <div className='flex flex-col justify-center items-center space-y-4' >
                <FaUser className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>User <span className='text-primary'>Experience</span></p>
                <p>Enjoy the seamless user <span className='text-secondary'>experience</span>.</p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4' >
                <MdDashboard  className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>Dashboard</p>
                <p>Get Your Own <span className='text-secondary'>Dashboard</span>.</p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'  >
                <IoIosChatboxes className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>Communication <span className='text-primary'>Platform</span></p>
                <p>Communicate with your <span className='text-secondary'>counselor</span>.</p>
            </div>
            <div className='flex flex-col justify-center items-center space-y-4'  >
                <MdDashboard className='text-7xl text-primary'/>
                <p className='text-xl font-semibold'>User <span className='text-primary'>Experience</span></p>
                <p>Enjoy the seamless user <span className='text-secondary'>experience</span>.</p>
            </div>
        </div>
    </section>
  )
}
