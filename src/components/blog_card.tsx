"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

export function CardDemo({ blog }: { blog: any }) {
  const router = useRouter();
  const [cardImage, setCardImage] = useState<string>("");

  useEffect(() => {
    if (blog?.images && blog.images.length > 0) {
      const randomIndex = Math.floor(Math.random() * blog.images.length);
      setCardImage(blog.images[randomIndex].url);
    }
  }, [blog]);

  const handleRedirect = (id: string) => {
    router.push(`blog/${id}`);
  };

  const sliceTitle = (content: string) => {
    const maxLength = 15;
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const sliceDescription = (content: string) => {
    const maxLength = 30;
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Recent post";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="md:max-w-xs max-w-xl w-full group/card transition-all duration-300 hover:scale-105">
      <div className="cursor-pointer overflow-hidden relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col">
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-blue-600 backdrop-blur-sm shadow-sm">
            {blog.category}
          </span>
        </div>

        {/* Responsive Image - UPDATED */}
        <div className="relative w-full h-48 sm:h-56 md:h-52 lg:h-56 bg-gray-100 border-b border-gray-100">
          {cardImage ? (
            <Image
              src={cardImage}
              alt={blog.title || "Blog image"}
              fill
              className="object-cover" 
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-200">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-5 bg-white h-48 flex flex-col">
          {/* Post Date */}
          <div className="flex items-center mb-2 text-gray-600 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(blog.updatedAt)}
          </div>

          {/* Title */}
          <h1 className="font-bold text-xl text-gray-900 mb-3">
            {parse(sliceTitle(blog.title))}
          </h1>

          {/* Content */}
          <p
            className="font-normal text-sm text-gray-700 mb-4 flex-grow"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sliceDescription(blog.content)),
            }}
          />

          {/* Read More */}
          <div
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-auto"
            onClick={() => handleRedirect(blog._id)}
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform group-hover/card:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}