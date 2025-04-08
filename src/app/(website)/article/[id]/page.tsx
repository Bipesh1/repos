"use client";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { getBlog } from "@/app/(protected)/actions/blog";
import { useEffect, useState } from "react";
import Image from "next/image";
import CarouselSlider from "@/components/Carousel";
import parse from "html-react-parser";
import 'quill/dist/quill.snow.css';


export default function ArticleDetail() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<any>([]);
  const [mainImage, setMainImage] = useState("");
  const [carouselImages, setCarouselImages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const [tagsArray, setTagsArray] = useState<any>([]);
  const [relatedArticles, setRelatedArticles] = useState([
    {
      id: 1,
      title: "Announcing the 2025–2026 Common App essay prompts",
      image: "/api/placeholder/400/320",
      url: "#"
    },
    {
      id: 2,
      title: "Leaping from dance to counseling: An unexpected journey to inspire students",
      image: "/api/placeholder/400/320",
      url: "#"
    },
    {
      id: 3,
      title: "Common App welcomes its first cohort of community colleges to the platform",
      image: "/api/placeholder/400/320",
      url: "#"
    }
  ]);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await getBlog(id);
      const data = response.data || {};
      console.log("Data: ", data);
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

      setTagsArray(response.data.tags ? response.data.tags.split(",") : []);
      
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-20">
        {/* Title Section */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 leading-tight">
          {blog.title}
        </h1>
        
        {/* Author and Date Section */}
        <div className="mb-6">
          <p className="text-base text-gray-600">Published Date : {formattedDate}</p>
        </div>
        
        {/* Social Share Buttons */}
        <div className="flex items-center space-x-2 mb-8">
          <a href="#" className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a href="#" className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-400 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-700 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
        
        {/* Main Image */}
        <div className="mb-8">
          {mainImage ? (
            <div className="relative w-full h-64 md:h-96">
              <Image 
                src={mainImage} 
                alt={blog.title || "Blog header image"}
                layout="fill"
                objectFit="cover"
                className="rounded"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">No image available</span>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="ql-editor prose prose-xl max-w-none">
          {parse(blog.content)}
        </div>
        
        {/* Author Bio */}
        {/* <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-700 italic mb-4">
            {blog.authorBio || "Carmen Larsen, Ph.D., is a middle school counselor at Sarasota Middle School in Sarasota, Florida. She was the 2024 Florida School Counselor of the Year and is the 2025 National School Counselor of the Year."}
          </p>
        </div> */}
        
        {/* Tags */}
        {tagsArray && tagsArray.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
            <span className=" text-gray-700">Tags : </span>
            {tagsArray && tagsArray.map((tag: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
            </div>
          </div>
        )}
        
        {/* Gallery Section - Preserved as requested */}
        {carouselImages.length > 0 && (
          <div className="my-12 rounded-lg overflow-hidden">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">Gallery</h3>
            <div className="bg-transparent">
              <CarouselSlider urls={(carouselImages || []).map(item => item.url)}/>
            </div>
          </div>
        )}
      </div>
      
      {/* Related Articles Section */}
      {/* <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">News and updates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <div key={article.id} className="bg-white rounded overflow-hidden shadow">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-base text-gray-900">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              See more news
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}