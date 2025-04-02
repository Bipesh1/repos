"use client";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { getBlog } from "@/app/(protected)/actions/blog";
import { useEffect, useState } from "react";
import Image from "next/image";
import CarouselSlider from "@/components/Carousel";
export default function BlogDetail() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<any>([]);
  const [mainImage, setMainImage] = useState("");
  const [carouselImages, setCarouselImages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const [tagsArray, setTagsArray] = useState<any[]>([])

  
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await getBlog(id);
      const data:any = response.data || {};
      setBlog(data);
      
      // Process images
      if (data?.images && data.images.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.images.length);
        setMainImage(data.images[randomIndex].url);
        
        if (data.images.length > 1) {
          setCarouselImages(
            data.images
              .map((img: any) => ({
                id: img._id , 
                url: img.url
              }))
          );
        }
      }

      setTagsArray(data.tags?.split(","))
      
      // Format date
      if (data?.createdAt) {
        const date = new Date(data.createdAt);
        setFormattedDate(date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }));
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

      
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen pb-20 mb-[-40px]">
      {/* Hero Image Section with Parallax Effect */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {mainImage ? (
          <>
          <Image 
            src={mainImage} 
            alt={blog.title || "Blog header image"}
            layout="fill"
            objectFit="cover"
            className="w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-medium text-xl">No image available</span>
          </div>
        )}
        
        {/* Hero content overlay with animation */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16 text-white">
          <div className="max-w-5xl mx-auto animate-fade-up">
            <div className="flex items-center mb-4 space-x-4">
              <span className="bg-blue-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                {blog.category || "Blog"}
              </span>
              <span className="text-sm md:text-base opacity-90 font-light">{formattedDate}</span>
            </div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-up">
              {blog.title}
            </h1>
            
          </div>
        </div>
      </div>

      {/* Content Section with enhanced styling */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100">
          

          {/* Main content with enhanced typography */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-lg text-gray-700 leading-relaxed space-y-6 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} 
            />
           
            {/* Image Carousel with increased height */}
            {carouselImages.length > 0 && (
            <div className="my-12 rounded-lg overflow-hidden">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Gallery</h3>
              <div className="bg-transparent">
                <CarouselSlider urls={(carouselImages || []).map((item:any) => item.url)}/>
              </div>
            </div>
          )}
            
            {/* Enhanced metadata with icons */}
            <div className="border-t border-gray-200 pt-8 mt-16 text-sm text-gray-600 flex flex-col space-y-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Published on: <span className="font-medium text-gray-800">{formattedDate}</span></p>
              </div>
              
              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <p>Last updated: <span className="font-medium text-gray-800">{new Date(blog.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span></p>
                </div>
              )}
              
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center mt-2 flex-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div className="flex flex-wrap gap-2">
                    {tagsArray && tagsArray.map((tag: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}