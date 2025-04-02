import React from 'react'
import { LuCircleArrowLeft, LuUser, LuMail, LuPhone, LuTag } from "react-icons/lu";
import { checkUser } from '../actions/user';
import StudentProfileEdit from './components/student-profile-edit';
export const dynamic = 'force-dynamic';

export default async function page() {
   const response = await checkUser()
   const data = response.data || {}

  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-2xl font-bold text-primary'>
            Welcome, <span className='text-secondary'>{data?.userName}</span>
          </p>
          <p className='text-gray-600 mt-1'>
            Manage your student profile and information
          </p>
        </div>
        <LuCircleArrowLeft className='text-3xl text-primary hover:text-secondary transition-colors' />
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        {/* Profile Card */}
        <div className='md:col-span-1 bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
          <div className='flex flex-col items-center'>
            <div className='bg-primary/10 p-4 rounded-full mb-4'>
              <LuUser className='text-6xl text-primary' />
            </div>
            <h2 className='text-xl font-semibold text-secondary'>
              {data.userName}
            </h2>
            <p className='text-gray-500 mt-2'>{data.role}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className='md:col-span-2 bg-white shadow-lg rounded-lg p-6 border border-gray-100 space-y-4'>
          <h3 className='text-lg font-semibold text-primary border-b pb-2'>
            Contact Information
          </h3>
          
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='flex items-center space-x-3'>
              <LuMail className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Email Address</p>
                <p className='font-medium text-secondary'>{data.email}</p>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <LuPhone className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Mobile Number</p>
                <p className='font-medium text-secondary'>{data.mobile}</p>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <LuTag className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Category</p>
                <p className='font-medium text-secondary'>
                  {data.category || 'Not Specified'}
                </p>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <LuUser className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Account Status</p>
                <p className={`font-medium ${data.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {data.isVerified ? 'Verified' : 'Unverified'}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-6 flex justify-between items-center'>
            <p className='text-gray-500 text-sm'>
              Profile last updated: {new Date().toLocaleDateString()}
            </p>
             <StudentProfileEdit id={data._id}/>
           
          </div>
        </div>
      </div>

      {/* Placeholder for Future Fields */}
      <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
        <h3 className='text-lg font-semibold text-primary border-b pb-2'>
          Additional Information
        </h3>
        <div className='grid md:grid-cols-2 gap-4 mt-4'>
          <div>
            <p className='text-gray-600'>Google Drive Link</p>
            <p className='text-secondary'>{data.link}</p>
          </div>
          <div>
            <p className='text-gray-600'>GPA</p>
            <p className='text-secondary'>{data.gpa}</p>
          </div>
          <div>
            <p className='text-gray-600'>Test Information</p>
            <p className='text-secondary'>{data.tests}</p>
          </div>
        </div>
      </div>
    </div>
  )
}