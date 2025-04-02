"use client";

import { useEffect, useState } from "react";
import { CardDemo } from "@/components/blog_card";
import { getBlogs } from "@/app/(protected)/actions/blog";
import { checkUser } from "@/app/(protected)/actions/user";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [category, setCategory] = useState<"General" | "Premium" | "all">("all");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      let currentUserRole: string | null = null;
      let currentUserTier: string | null = null;
      let userLoggedIn = false;

      // Check user role and tier
      try {
        const userResponse = await checkUser();
        const userData = userResponse.data;
        currentUserRole = userData.role;
        currentUserTier = userData.category;
        setUserRole(currentUserRole);
        setUserTier(currentUserTier);
        setIsLoggedIn(true);
        userLoggedIn = true;
      } catch (error) {
        setUserRole(null);
        setUserTier(null);
        setIsLoggedIn(false);
      }

      // Fetch blogs and apply initial filtering
      try {
        setIsLoading(true);
        const response = await getBlogs();
        const data = response.data || [];
        setBlogs(data);
        setIsLoading(false);

        // Determine accessible blogs based on user status
        let accessibleBlogs = data;
        
        // Case 1: Non-logged in users can only see General content
        if (!userLoggedIn) {
          accessibleBlogs = data.filter(blog => blog.category === 'General');
        } 
        // Case 2: Users with role=user AND tier=none can only see General content
        else if (currentUserRole === 'user' && currentUserTier === 'none') {
          accessibleBlogs = data.filter(blog => blog.category === 'General');
        }
        // Case 3: All other logged-in users (admins, users with category/tier) can see all content
        
        setFilteredBlogs(accessibleBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setFilteredBlogs([]);
      }
    };

    fetchUserAndBlogs();
  }, []);

  // Filter function
  const handleFilter = (selectedCategory: "General" | "Premium" | "all") => {
    setCategory(selectedCategory);

    // Apply user access filtering first
    let accessibleBlogs = blogs;
    
    // Restrict to General content for non-logged in users
    if (!isLoggedIn) {
      accessibleBlogs = blogs.filter(blog => blog.category === 'General');
    } 
    // Restrict to General content for users with role=user AND tier=none
    else if (userRole === 'user' && userTier === 'none') {
      accessibleBlogs = blogs.filter(blog => blog.category === 'General');
    }

    // Apply category filter
    let finalFilteredBlogs = accessibleBlogs;
    if (selectedCategory !== 'all') {
      finalFilteredBlogs = accessibleBlogs.filter(
        (blog) => blog.category === selectedCategory
      );
    }

    setFilteredBlogs(finalFilteredBlogs);
  };

  // Show Premium button only if user has access to premium content
  const hasPremiumAccess = isLoggedIn && !(userRole === 'user' && userTier === 'none');
  const showPremiumButton = hasPremiumAccess;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our latest articles and insights
        </p>
        {!isLoggedIn && (
          <p className="mt-4 text-sm text-blue-600">
            Log in and pay to access premium content
          </p>
        )}
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => handleFilter("all")}
          className={`px-5 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm ${
            category === "all" 
              ? "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2" 
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => handleFilter("General")}
          className={`px-5 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm ${
            category === "General" 
              ? "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2" 
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          General
        </button>
        {showPremiumButton && (
          <button
            onClick={() => handleFilter("Premium")}
            className={`px-5 py-2 rounded-md font-medium text-sm transition-all duration-200 shadow-sm ${
              category === "Premium" 
                ? "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Premium
          </button>
        )}
      </div>

      {/* Blog Cards Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBlogs.map((blog, index) => (
            <div key={index} className="flex">
              <CardDemo blog={blog} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">No blogs available</p>
          <p className="text-gray-500 mt-1">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}