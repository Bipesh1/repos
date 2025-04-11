import React from 'react'
import { LuCircleArrowLeft, LuUser, LuMail, LuPhone, LuTag } from "react-icons/lu";
import { checkUser } from '../actions/user';
import StudentProfileEdit from './components/student-profile-edit';
import { StudentProfileDialog } from './components/student-profile-dialog';

export const dynamic = 'force-dynamic';

export default async function page() {
  const response = await checkUser();
  const data = response.data || {};

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // returns YYYY-MM-DD
  };

  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <p className='text-2xl font-bold text-primary'>
            Welcome, <span className='text-secondary'>{data?.userName}</span>
          </p>
          <p className='text-gray-600 mt-1'>
            Manage your student profile and information
          </p>
        </div>
        <StudentProfileDialog id={data._id} />
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='md:col-span-1 bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
          <div className='flex flex-col items-center'>
            <div className='bg-primary/10 p-4 rounded-full mb-4'>
              <LuUser className='text-6xl text-primary' />
            </div>
            <h2 className='text-xl font-semibold text-secondary'>
              {data.mobile || "No Name Provided"}
            </h2>
            <p className='text-gray-500 mt-2'>{data.role}</p>
          </div>
        </div>

        <div className='md:col-span-2 bg-white shadow-lg rounded-lg p-6 border border-gray-100 space-y-4'>
          <h3 className='text-lg font-semibold text-primary border-b pb-2'>
            Contact Information
          </h3>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='flex items-center space-x-3'>
              <LuMail className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Email Address</p>
                <p className='font-medium text-secondary'>{data.email || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <LuPhone className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Mobile Number</p>
                <p className='font-medium text-secondary'>{data.phone || data.mobile || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <LuTag className='text-primary text-xl' />
              <div>
                <p className='text-gray-600'>Category</p>
                <p className='font-medium text-secondary'>
                  {data.category === "1000-tier" && "Starter Package"}
                  {data.category === "25000-tier" && "Achiever Package"}
                  {!data.category && "Not Specified"}
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
            <StudentProfileEdit id={data._id} />
          </div>
        </div>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100 space-y-6'>
        <h3 className='text-lg font-semibold text-primary border-b pb-2'>
          Additional Information
        </h3>
        <div className='grid md:grid-cols-2 gap-4'>
          <div><p className='text-gray-600'>Date of Birth</p><p className='text-secondary'>{formatDate(data.dob)}</p></div>
          <div><p className='text-gray-600'>Gender</p><p className='text-secondary'>{data.gender || 'N/A'}</p></div>
          <div><p className='text-gray-600'>City of Birth</p><p className='text-secondary'>{data.cityOfBirth || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Country of Birth</p><p className='text-secondary'>{data.countryOfBirth || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Nationality</p><p className='text-secondary'>{data.nationality || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Country of Residence</p><p className='text-secondary'>{data.countryOfResidence || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Permanent Address</p><p className='text-secondary'>{data.address || 'N/A'}</p></div>
          <div><p className='text-gray-600'>WhatsApp Number</p><p className='text-secondary'>{data.whatsapp || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Passport Number</p><p className='text-secondary'>{data.passportNumber || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Passport Issue Country</p><p className='text-secondary'>{data.passportCountry || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Passport Expiry</p><p className='text-secondary'>{formatDate(data.passportExpiry)}</p></div>
        </div>
        <h4 className='text-md font-semibold text-primary mt-4'>Emergency Contact</h4>
        <div className='grid md:grid-cols-2 gap-4'>
          <div><p className='text-gray-600'>Name</p><p className='text-secondary'>{data.emergencyName || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Relation</p><p className='text-secondary'>{data.emergencyRelation || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Mobile</p><p className='text-secondary'>{data.emergencyPhone || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Email</p><p className='text-secondary'>{data.emergencyEmail || 'N/A'}</p></div>
        </div>
        <h4 className='text-md font-semibold text-primary mt-4'>Academic Background</h4>
        <div className='grid md:grid-cols-2 gap-4'>
          <div><p className='text-gray-600'>High School Institution</p><p className='text-secondary'>{data.hsInstitution || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Country</p><p className='text-secondary'>{data.hsCountry || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Board</p><p className='text-secondary'>{data.hsBoard || 'N/A'}</p></div>
          <div><p className='text-gray-600'>Completion Date</p><p className='text-secondary'>{formatDate(data.hsEndDate)}</p></div>
          <div><p className='text-gray-600'>Grade / CGPA</p><p className='text-secondary'>{data.hsGrade || 'N/A'}</p></div>
        </div>
      </div>
    </div>
  )
}