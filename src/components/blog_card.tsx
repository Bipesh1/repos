"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

export function CardDemo({ blog }: { blog: any }) {
  const router = useRouter();
  const cardImage = blog.images[0].url;

  const handleRedirect = (id: string) => {
    router.push(`blog/${id}`); // Navigate to the blog detail page
  };

  const sliceDescription = (content:string)=>{
    const maxLength = 65; // Set the maximum length to display
    const truncatedContent = content.length > maxLength
                            ? content.slice(0, maxLength) + "..."
                            : blog.content;
    return truncatedContent;
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Recent post"; // If no date provided, return default message
  
    const date = new Date(dateString);
  
    // Return formatted date: "Month Day, Year" (e.g., "March 18, 2025")
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  

  return (
    <div 
      className="md:max-w-xs max-w-xl w-full group/card transition-all duration-300 hover:scale-105">
      <div className={cn(
        "cursor-pointer overflow-hidden relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
      )}>
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-blue-600 backdrop-blur-sm shadow-sm">
            {blog.category}
          </span>
        </div>

        {/* Fixed height image container */}
        <div className="relative w-full h-48 overflow-hidden">
          <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 group-hover/card:scale-110">
            <Image 
              src={cardImage} 
              alt={blog.title || "Blog image"} 
              layout="fill"  
              objectFit="cover"  
              className="w-full h-full" 
            />
          </div>
          
          {/* Gradient Overlay that scales with image */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent transform transition-transform duration-700 group-hover/card:scale-110"></div>
        </div>
        
        {/* Content Container with separate fixed height */}
        <div className="relative z-10 p-5 bg-white h-48 flex flex-col">
          {/* Post Date */}
          <div className="flex items-center mb-2 text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(blog.updatedAt) || "Recent post"}
          </div>
          
          {/* Title */}
          <h1 className="font-bold text-xl text-gray-900 mb-3">
            {blog.title}
          </h1>
          
          {/* Content */}
          <p 
            className="font-normal text-sm text-gray-700 mb-4 flex-grow"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sliceDescription(blog.content)) }} 
          />
          {/* Read More Button */}
          <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-auto"
          onClick={() => { handleRedirect(blog._id) }} >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover/card:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}