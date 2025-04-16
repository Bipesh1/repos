"use client";
import Link from "next/link";
import { useState } from "react";

// Static data based on your provided links
const staticSearchItems = [
  { title: "Self Apply", href: "/company/blog/why-self-apply-to-usa-in-nepal" },
  { title: "USA Visa Guide", href: "/company/blog/usa-visa-guide-in-nepal" },
  { title: "STEM Courses", href: "/company/blog/stem-courses-in-usa-for-nepali-students" },
  { title: "No Application Fee", href: "/company/blog/application-fee-waiver-university-in-usa" },
  { title: "Arkansas State University", href: "/university/arkansas-state-university" },
  { title: "Texas State University", href: "/university/texas-state-university" },
  { title: "On-Campus Job", href: "/company/blog/tips-for-getting-on-campus-job" },
  { title: "Top Scholarships", href: "/company/blog/study-in-usa-with-scholarships-for-nepali-students" },
  { title: "For Nurses", href: "/company/blog/career-for-nepali-nurse-in-usa" },
  { title: "Study With 20 Lakh Budget", href: "/company/blog/study-in-usa-with-twenty-lakhs-from-nepal" },
  { title: "Education Gap Matters?", href: "/company/blog/education-gap-for-study-in-usa-from-nepal" },
  { title: "Top 10 Universities", href: "/company/blog/top-ten-universities-of-usa-for-nepali-students" },
  { title: "Southeast Missouri State University", href: "/university/southeast-missouri-state-university" },
  { title: "University of South Dakota", href: "/university/university-of-south-dakota" },
  { title: "Dream To Study Singapore", href: "/company/blog/study-in-singapore" },
  { title: "Wright State University", href: "/university/wright-state-university" },
  { title: "Study Bachelors", href: "/company/blog/study-bachelors-in-usa-from-nepal" },
  { title: "Study Masters", href: "/company/blog/study-masters-in-usa-from-nepal" },
  { title: "Study PhD", href: "/company/blog/study-phd-in-usa-from-nepal" }
];

export function MostSearch() {
  const [showAll, setShowAll] = useState(false);

  // Display a limited number of items initially, show all when "View more" is clicked
  const displayedItems = showAll ? staticSearchItems : staticSearchItems.slice(0, 12);

  return (
    <div className="bg-primary/10 py-12 px-4 mt-20">
      <div className="container px-4 md:px-12 mx-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="space-y-1">
            <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-800">Most Searched 🔥</h2>
            <p className="text-gray-600 text-center">Topics on demand</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {displayedItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="bg-secondary/30 px-4 py-2 rounded-full hover:shadow-md transition-all text-sm md:text-base whitespace-nowrap">
                {item.title}
              </div>
            </Link>
          ))}
        </div>

        {staticSearchItems.length > 12 && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="flex items-center bg-white px-6 py-2 rounded-full hover:shadow-md transition-all"
            >
              {showAll ? 'View less' : 'View more'} 
              <svg 
                className={`ml-2 w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}