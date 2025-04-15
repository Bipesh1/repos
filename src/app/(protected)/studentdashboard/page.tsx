import React from 'react'
import { 
  LuUser, LuMail, LuPhone, LuTag, LuBookOpen, 
  LuGlobe, LuAward, LuCalendar, LuMapPin, 
  LuFileText, LuShield, LuUsers, LuBriefcase,
  LuGraduationCap, LuSchool, 
} from "react-icons/lu";
import { checkUser } from '../actions/user';
import StudentProfileEdit from './components/student-profile-edit';
import { StudentProfileDialog } from './components/student-profile-dialog';

export const dynamic = 'force-dynamic';

export default async function page() {
  const response = await checkUser();
  const data = response.data || {};

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderTestScores = () => {
    const hasStandardTest = data.testName || data.testScore;
    const hasEnglishTest = data.EngLangTest || data.EngTestScore;

    if (!hasStandardTest && !hasEnglishTest) return 'N/A';

    return (
      <div className="space-y-3">
        {hasStandardTest && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium flex items-center gap-2">
              <LuAward className="text-primary" /> Standard Test
            </h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div><span className="text-gray-600">Test:</span> {data.testName || 'N/A'}</div>
              <div><span className="text-gray-600">Score:</span> {data.testScore || 'N/A'}</div>
              <div><span className="text-gray-600">Date:</span> {formatDate(data.testDate)}</div>
            </div>
          </div>
        )}
        {hasEnglishTest && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium flex items-center gap-2">
              <LuGlobe className="text-primary" /> English Test
            </h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div><span className="text-gray-600">Test:</span> {data.EngLangTest || 'N/A'}</div>
              <div><span className="text-gray-600">Score:</span> {data.EngTestScore || 'N/A'}</div>
              <div><span className="text-gray-600">Date:</span> {formatDate(data.EngTestDate)}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEducationSection = (level: string) => {
    const prefix = level.toLowerCase();
    const institution = data[`${prefix}Institution`];
    const country = data[`${prefix}Country`];
    const board = data[`${prefix}Board`];
    const stream = data[`${prefix}Stream`];
    const startDate = data[`${prefix}StartDate`];
    const endDate = data[`${prefix}EndDate`];
    const grade = data[`${prefix}Grade`];

    if (!institution && !country && !board) return 'N/A';

    return (
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Institution</p>
            <p className="font-medium">{institution || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Country</p>
            <p className="font-medium">{country || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">Board/University</p>
            <p className="font-medium">{board || 'N/A'}</p>
          </div>
          {stream && (
            <div>
              <p className="text-gray-600">Stream/Major</p>
              <p className="font-medium">{stream}</p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Duration</p>
            <p className="font-medium">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Grade/Score</p>
            <p className="font-medium">{grade || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
          <p className='text-2xl font-bold text-primary'>
            Welcome, <span className='text-secondary'>{data?.userName || 'Student'}</span>
          </p>
          <p className='text-gray-600 mt-1'>
            Manage your student profile and information
          </p>
        </div>
        <StudentProfileDialog id={data._id} />
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        {/* Profile Summary Card */}
        <div className='md:col-span-1 bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
          <div className='flex flex-col items-center'>
            <div className='bg-primary/10 p-4 rounded-full mb-4'>
              <LuUser className='text-6xl text-primary' />
            </div>
            <h2 className='text-xl font-semibold text-secondary'>
              {data.userName || "No Name Provided"}
            </h2>
            <p className='text-gray-500 mt-2 capitalize'>{data.role?.toLowerCase()}</p>
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <LuTag className="text-primary" />
                <div>
                  <p className="text-gray-600">Package</p>
                  <p className="font-medium">
                    {data.category === "1000-tier" && "Starter"}
                    {data.category === "25000-tier" && "Achiever"}
                    {!data.category && "Not Specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LuShield className="text-primary" />
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className={`font-medium ${data.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {data.isVerified ? 'Verified' : 'Unverified'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className='md:col-span-2 bg-white shadow-lg rounded-lg p-6 border border-gray-100 space-y-4'>
          <h3 className='text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2'>
            <LuUser className="text-primary" /> Personal Information
          </h3>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='flex items-center gap-3'>
              <LuMail className='text-primary' />
              <div>
                <p className='text-gray-600'>Email</p>
                <p className='font-medium'>{data.email || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <LuPhone className='text-primary' />
              <div>
                <p className='text-gray-600'>Phone</p>
                <p className='font-medium'>{data.mobile || data.phone || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <LuCalendar className='text-primary' />
              <div>
                <p className='text-gray-600'>Date of Birth</p>
                <p className='font-medium'>{formatDate(data.dob)}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <LuUser className='text-primary' />
              <div>
                <p className='text-gray-600'>Gender</p>
                <p className='font-medium'>{data.gender || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <LuMapPin className='text-primary' />
              <div>
                <p className='text-gray-600'>Nationality</p>
                <p className='font-medium'>{data.nationality || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <LuGlobe className='text-primary' />
              <div>
                <p className='text-gray-600'>Residence Country</p>
                <p className='font-medium'>{data.countryOfResidence || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Sections */}
      <div className='space-y-6'>
        {/* Passport & Emergency Contact */}
        <div className='grid md:grid-cols-2 gap-6'>
          {/* Passport Information */}
          <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
            <h3 className='text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2'>
              <LuFileText className="text-primary" /> Passport Information
            </h3>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Passport Number</p>
                  <p className="font-medium">{data.passportNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Issuing Country</p>
                  <p className="font-medium">{data.passportCountry || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Expiry Date</p>
                <p className="font-medium">{formatDate(data.passportExpiry)}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
            <h3 className='text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2'>
              <LuUsers className="text-primary" /> Emergency Contact
            </h3>
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{data.emergencyName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Relation</p>
                  <p className="font-medium">{data.emergencyRelation || 'N/A'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{data.emergencyPhone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{data.emergencyEmail || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Scores */}
        <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
          <h3 className='text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2'>
            <LuAward className="text-primary" /> Test Scores
          </h3>
          <div className="mt-4">
            {renderTestScores()}
          </div>
        </div>

        {/* Education History */}
        <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100 space-y-6'>
          <h3 className='text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2'>
            <LuGraduationCap className="text-primary" /> Education History
          </h3>
          
          <div>
            <h4 className="font-medium flex items-center gap-2 text-secondary mb-2">
              <LuSchool className="text-primary" /> School (10th Grade)
            </h4>
            {renderEducationSection('schl')}
          </div>

          <div>
            <h4 className="font-medium flex items-center gap-2 text-secondary mb-2">
              <LuSchool className="text-primary" /> High School (12th Grade)
            </h4>
            {renderEducationSection('hs')}
          </div>

          <div>
            <h4 className="font-medium flex items-center gap-2 text-secondary mb-2">
              <LuGraduationCap className="text-primary" /> Graduation
            </h4>
            {renderEducationSection('grad')}
          </div>

          <div>
            <h4 className="font-medium flex items-center gap-2 text-secondary mb-2">
             Post Graduation
            </h4>
            {renderEducationSection('postgrad')}
          </div>
        </div>

        {/* Work Experience */}
        {data.workExpOrg && (
          <div className='bg-white shadow-lg rounded-lg p-6 border border-gray-100'>
            <h3 className='text-lg font-semibold text-primary border-b pb-2 flex items-center gap-2'>
              <LuBriefcase className="text-primary" /> Work Experience
            </h3>
            <div className="mt-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Organization</p>
                  <p className="font-medium">{data.workExpOrg}</p>
                </div>
                <div>
                  <p className="text-gray-600">Position</p>
                  <p className="font-medium">{data.workExpPos || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p className="font-medium">{data.workExpAdd || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration</p>
                <p className="font-medium">
                  {formatDate(data.workExpFrom)} - {formatDate(data.workExpTo)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}