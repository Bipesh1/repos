import React from 'react';
import { FaGraduationCap, FaTrophy, FaClock, FaChartBar } from 'react-icons/fa';

interface CourseInfoCardProps {
  courseFee: string | number;
  courseDuration: string;
  courseEntryScore: string;
}

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  courseFee,
  courseDuration,
  courseEntryScore,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        {/* Tuition Fee */}
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-primary mb-2">
            <FaGraduationCap className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Tuition Fee</h3>
          <p className="font-bold mt-1">{courseFee}</p>
        </div>

       
        {/* Duration */}
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-primary mb-2">
            <FaClock className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Duration</h3>
          <p className="font-bold mt-1">{courseDuration}</p>
        </div>

        {/* Score */}
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-primary mb-2">
            <FaChartBar className="h-6 w-6 mx-auto" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium">Score</h3>
          <p className="font-bold mt-1">{courseEntryScore}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCard;