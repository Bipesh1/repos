"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { getActiveUniversities } from "@/app/(protected)/actions/university";
import { getActiveCourses } from "@/app/(protected)/actions/course";

// Define interfaces for our data structures
interface University {
  _id: string;
  name: string;
  slug?: string;
  country?:  { 
    name: string,
  _id: string,
 
}
  image?: {
    url: string;
  };
}

interface Course {
  _id: string;
  title: string;
  slug?: string;
  level?: string;
  university?: {
    name: string;
    id: string;
    slug:string
  };
  universityName?: string;
  universityId?: string;
}

interface AllData {
  universities: University[];
  courses: Course[];
}

interface FilteredResults {
  universities: University[];
  courses: Course[];
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allData, setAllData] = useState<AllData>({
    universities: [],
    courses: []
  });
  const [filteredResults, setFilteredResults] = useState<FilteredResults>({
    universities: [],
    courses: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch all universities and courses on component mount
  useEffect(() => {
    const fetchAllData = async (): Promise<void> => {
      try {
        // Use the server actions to fetch data
        const [universitiesRes, coursesRes] = await Promise.all([
          getActiveUniversities(),
          getActiveCourses()
        ]);
        
        setAllData({
          universities: universitiesRes.data || [],
          courses: coursesRes.data || []
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Filter results based on search query
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length >= 2) {
      // Filter universities
      const filteredUniversities = allData.universities
        .filter(uni => 
          uni.name.toLowerCase().includes(query) || 
          (uni.country && uni.country.name.toLowerCase().includes(query))
        )
        .slice(0, 5); // Limit to 5 results
      
      // Filter courses
      const filteredCourses = allData.courses
        .filter(course => {
          const universityName = course.university?.name || course.universityName || "";
          return course.title.toLowerCase().includes(query) || 
                 universityName.toLowerCase().includes(query);
        })
        .slice(0, 5); // Limit to 5 results
      
      setFilteredResults({
        universities: filteredUniversities,
        courses: filteredCourses
      });
      setShowResults(true);
    } else {
      setFilteredResults({ universities: [], courses: [] });
      setShowResults(false);
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        searchContainerRef.current && 
        event.target instanceof Node && 
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigate to search results page on form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const hasResults = filteredResults.universities.length > 0 || filteredResults.courses.length > 0;

  // Helper function to get university URL
  const getUniversityUrl = (uni: University): string => {
    return `/university/${uni.slug || uni.name.toLowerCase().replace(/\s+/g, '-')}?id=${uni._id}`;
  };

  // Helper function to get course URL
  const getCourseUrl = (course: Course): string => {
    return `/course/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}?id=${course._id}`;
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search universities, courses..."
            className="pr-10 w-64 focus:w-80 transition-all duration-300"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading data...</span>
            </div>
          ) : !hasResults ? (
            <div className="p-4 text-gray-500">No results found</div>
          ) : (
            <div>
              {/* Universities Section */}
              {filteredResults.universities.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-primary">
                    Universities
                  </div>
                  <ul>
                    {filteredResults.universities.map((uni) => (
                      <li key={uni._id} className="border-b border-gray-100 last:border-0">
                        <Link 
                          href={`/university/${uni.slug}`}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowResults(false)}
                        >
                          <div className="text-sm font-medium">{uni.name}</div>
                          <div className="text-xs text-gray-500">{uni.country?.name}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Courses Section */}
              {filteredResults.courses.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-primary">
                    Courses
                  </div>
                  <ul>
                    {filteredResults.courses.map((course) => (
                      <li key={course._id} className="border-b border-gray-100 last:border-0">
                        <Link 
                          href={`/university/${course.university?.slug}/${course._id}`}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowResults(false)}
                        >
                          <div className="text-sm font-medium">{course.title}</div>
                          <div className="text-xs text-gray-500">
                            {course.university?.name || course.universityName} • {course.level}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  );
}