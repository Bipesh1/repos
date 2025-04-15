"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { addedToWishlist } from "@/app/(protected)/actions/student";

// Define our filter states
type CategoryFilter = "all" | "gold" | "general" | "ivy";
type AdmissionFilter = "all" | true | false;

// Define a type for the university data
interface UniversityData {
  _id: string;
  name: string;
  slug:string;
  country: {
    name: string;
  };
  applyfee: string;
  test: string;
  address?: string;
  admissionOpen: boolean;
  category: string;
  priority?: number;
  image: {
    url: string;
  };
}

function Carousel({ data }: { data: UniversityData[] }) {
  const pathname = usePathname();
  const [wishlistedUniversities, setWishlistedUniversities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle adding/removing from wishlist
  const handleWishlistToggle = async (universityId: string) => {
    try {
      const values = { wishlist: universityId };
      const response = await addedToWishlist(values);

      if (response.status) {
        setWishlistedUniversities(prev => 
          prev.includes(universityId) 
            ? prev.filter(id => id !== universityId)
            : [...prev, universityId]
        );
      } else {
        console.error("Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [admissionFilter, setAdmissionFilter] = useState<AdmissionFilter>("all");
  const [applyFeeFilter, setApplyFeeFilter] = useState<any>("all");
  const [testRequiredFilter, setTestRequiredFilter] = useState<any>("all");
  
  // Sort by priority (lowest first)
  const sortedData = [...data].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  
  // Apply filters and search
  const filteredData = sortedData.filter((item) => {
    // Search filter
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const categoryMatch = categoryFilter === "all" || item.category === categoryFilter;

    // Admission filter
    const admissionMatch = admissionFilter === "all" || item.admissionOpen === admissionFilter;

    // Apply Fee filter
    const applyFeeMatch = applyFeeFilter === "all" || item.applyfee === applyFeeFilter;

    // Test Required filter
    const testRequiredMatch = testRequiredFilter === "all" || item.test === testRequiredFilter;

    return searchMatch && categoryMatch && admissionMatch && applyFeeMatch && testRequiredMatch;
  });

  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel, filteredData]);

  // Handle filter changes
  const handleCategoryChange = (category: CategoryFilter) => {
    setCategoryFilter(category);
  };

  const handleAdmissionChange = (admission: AdmissionFilter) => {
    setAdmissionFilter(admission);
  };

  const handleApplyFeeChange = (applyFee: any) => {
    setApplyFeeFilter(applyFee);
  };

  const handleTestRequiredChange = (testRequired: any) => {
    setTestRequiredFilter(testRequired);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Filter Menu */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Filter Universities</h3>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <CiSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search universities by name..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">University Type</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-3 py-1 text-sm rounded-full ${
                  categoryFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleCategoryChange("gold")}
                className={`px-3 py-1 text-sm rounded-full ${
                  categoryFilter === "gold"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Gold
              </button>
              <button
                onClick={() => handleCategoryChange("ivy")}
                className={`px-3 py-1 text-sm rounded-full ${
                  categoryFilter === "ivy"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                IVY
              </button>
            </div>
          </div>

          {/* Admission Filter */}
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">Admission Status</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleAdmissionChange("all")}
                className={`px-3 py-1 text-sm rounded-full ${
                  admissionFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleAdmissionChange(true)}
                className={`px-3 py-1 text-sm rounded-full ${
                  admissionFilter === true
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Open
              </button>
              <button
                onClick={() => handleAdmissionChange(false)}
                className={`px-3 py-1 text-sm rounded-full ${
                  admissionFilter === false
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Closed
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">Application Fee</span>
            <div className="flex gap-2">
              {["all", "waived","not waived"].map((option) => (
                <button
                  key={`applyFee-${option}`}
                  onClick={() => handleApplyFeeChange(option)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    applyFeeFilter === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {option === "all" ? "All" : option=="waived" ? "Waived" : "Not Waived"}
                </button>
              ))}
            </div>
          </div>

          {/* Test Required Filter */}
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">Test Required</span>
            <div className="flex gap-2">
              {["all", "GRE", "GMAT"].map((option) => (
                <button
                  key={`testRequired-${option}`}
                  onClick={() => handleTestRequiredChange(option)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    testRequiredFilter === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {option === "all" ? "All" : option=="GRE" ? "GRE" : "GMAT"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredData.length} universities
      </div>

      {/* Carousel */}
      <div className="w-full overflow-hidden">
        {filteredData.length > 0 ? (
          <motion.div
            ref={carousel}
            drag="x"
            whileDrag={{ scale: 0.95 }}
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={{ bounceDamping: 30 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex will-change-transform cursor-grab active:cursor-grabbing"
          >
            {filteredData.slice(0, 8)?.map((itemData) => (
              <motion.div
                key={itemData._id}
                className="min-w-[20rem] max-w-[20rem] min-h-[25rem] p-4 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden relative"
              >
                {/* Wishlist Icon */}
                <button 
                  onClick={() => handleWishlistToggle(itemData._id)}
                  className="absolute top-6 right-6 z-10 bg-white/70 p-2 rounded-full hover:bg-white transition-colors"
                >
                  {wishlistedUniversities.includes(itemData._id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-600 text-xl" />
                  )}
                </button>

                {/* Top Half - Image */}
                <div className="h-1/2 relative">
                  <Link href={`/university/${itemData.slug}`}>
                    <Image
                      src={itemData?.image.url}
                      width={400}
                      height={400}
                      alt="img"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </Link>
                </div>

                {/* Bottom Half - Details */}
                <div className="flex flex-col justify-center p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{itemData.name}</h2>
                  <p className="text-sm text-gray-600">{itemData.country.name}</p>
                  <p className="text-sm text-gray-600">
                    {itemData.category === "gold" && "Gold"}
                    {itemData.category === "ivy" && "IVY"}
                    {itemData.category === "general" && "General"}
                  </p>

                  {itemData.address && (
                    <p className="text-sm text-blue-600 mt-1 flex items-center">
                      <CiLocationOn className="mr-1" />
                      {itemData.address}
                    </p>
                  )}
                  <p
                    className={`text-sm font-medium mt-2 ${
                      itemData.admissionOpen ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {itemData.admissionOpen ? "Admissions Open" : "Admissions Closed"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No universities match your search and filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;