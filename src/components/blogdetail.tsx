"use client";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import Image from "next/image";
import CarouselSlider from "@/components/Carousel";
import parse from "html-react-parser";
import { Share2 } from "lucide-react";
import 'quill/dist/quill.snow.css';

export default function BlogDetailClient({ initialBlog, slugandId }) {
  const [blog, setBlog] = useState(initialBlog || {});
  const [mainImage, setMainImage] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const [isLoading, setIsLoading] = useState(!initialBlog);
  const [formattedDate, setFormattedDate] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [copied, setCopied] = useState(false);

  const fetchBlogs = async () => {
    if (initialBlog) {
      // If we already have the blog data from the server, use that
      processBlogData(initialBlog);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs/${slugandId}`);
      const data = await response.json();
      setBlog(data);
      processBlogData(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processBlogData = (data) => {
    if (data?.images && data.images.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.images.length);
      setMainImage(data.images[randomIndex].url);

      if (data.images.length > 1) {
        setCarouselImages(
          data.images.map((img) => ({
            id: img._id,
            url: img.url,
          }))
        );
      }
    }

    setTagsArray(data.tags ? data.tags.split(",") : []);

    if (data?.createdAt) {
      const date = new Date(data.createdAt);
      setFormattedDate(
        date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: "Check out this blog!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        alert("Failed to copy the link.");
      }
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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-base text-gray-600">
            Published Date: {formattedDate}
          </p>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            <Share2 className="h-4 w-4" />
            {copied ? "Link copied!" : "Share this blog"}
          </button>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          {mainImage ? (
            <div className="w-full bg-white rounded overflow-hidden">
              <Image
                src={mainImage}
                alt={blog.title || "Blog header image"}
                width={1000}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">
                No image available
              </span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="ql-editor prose prose-xl max-w-none">
          {blog.content && parse(blog.content)}
        </div>

        {/* Tags */}
        {tagsArray && tagsArray.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-700">Tags :</span>
              {tagsArray.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {carouselImages.length > 0 && (
          <div className="my-12 rounded-lg overflow-hidden">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">
              Gallery
            </h3>
            <div className="bg-transparent">
              <CarouselSlider
                urls={(carouselImages || []).map((item) => item.url)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}