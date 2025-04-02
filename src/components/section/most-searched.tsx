"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogs } from "@/app/(protected)/actions/blog";

export function MostSearch() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getBlogs();
      if (response.data) {
        setBlogs(response.data);
      }
    }

    fetchData();
  }, []);

  // Display a limited number of blogs initially, show all when "View more" is clicked
  const displayedBlogs = showAll ? blogs : blogs.slice(0, 12);

  return (
    <div className="bg-primary/10 py-12 px-4 mt-20">
      <div className="container px-4 md:px-12 mx-auto">
        <div className="flex flex-col  items-center mb-6">
          <div className="space-y-1 ">
            <h2 className="text-3xl text-center md:text-4xl font-bold text-gray-800">Most Searched 🔥</h2>
            <p className="text-gray-600 text-center">Topics on demand</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {displayedBlogs.map((blog) => (
            <Link key={blog._id} href={`/company/blog/${blog._id}`}>
              <div className="bg-secondary/30 px-4 py-2 rounded-full hover:shadow-md transition-all text-sm md:text-base whitespace-nowrap">
                {blog.title}
              </div>
            </Link>
          ))}
        </div>

        {blogs.length > 12 && (
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