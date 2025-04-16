"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FaGraduationCap, FaCalendarAlt, FaDollarSign, FaRegCalendarAlt } from "react-icons/fa";

function CourseCarousel({ data, uniimg }: { data: any[]; uniimg: string }) {
  const pathname = usePathname();

  // Sorting courses by priority
  const sortedData = [...data].sort((a, b) => (a.priority || 999) - (b.priority || 999));

  // Filter state with null values
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minEntryScore, setMinEntryScore] = useState<number | null>(null);
  const [maxEntryScore, setMaxEntryScore] = useState<number | null>(null);
  const [minFee, setMinFee] = useState<number | null>(null);
  const [maxFee, setMaxFee] = useState<number | null>(null);

  

  // Filter data based on category, entryScore, and fee
  const filteredData = sortedData.filter((item) => {
    const isCategoryMatch = 
      selectedCategory === "all" || 
      item.category?.toLowerCase() === selectedCategory.toLowerCase();

    // Entry score filtering with null check
    const isEntryScoreMatch = 
      (minEntryScore === null || (item.entryScore && parseFloat(item.entryScore) >= minEntryScore)) &&
      (maxEntryScore === null || (item.entryScore && parseFloat(item.entryScore) <= maxEntryScore));
    
    // Fee filtering with null check
    const isFeeMatch = 
      (minFee === null || (item.fee && parseFloat(item.fee.replace(/[^0-9.-]+/g, "")) >= minFee)) &&
      (maxFee === null || (item.fee && parseFloat(item.fee.replace(/[^0-9.-]+/g, "")) <= maxFee));

    return isCategoryMatch && isEntryScoreMatch && isFeeMatch;
  });

  const [width, setWidth] = useState(0);
    // Fix: Properly type the ref to HTMLDivElement
    const carousel = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      // Check if carousel.current exists before accessing properties
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    }, [carousel, filteredData]);
  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Filter Courses</h3>
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">Course Type</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory("bachelor")}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === "bachelor" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Bachelor
              </button>
              <button
                onClick={() => setSelectedCategory("master")}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === "master" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Master
              </button>
            </div>
          </div>

          {/* Entry Score Filter */}
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">Entry Score (GPA)</span>
            <div className="flex gap-2">
              <input
                type="number"
                value={minEntryScore ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setMinEntryScore(value === '' ? null : parseFloat(value));
                }}
                className="px-3 py-1 text-sm border rounded bg-white"
                min={0}
                max={4}
                step={0.1}
                placeholder="Min GPA"
              />
              <input
                type="number"
                value={maxEntryScore ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setMaxEntryScore(value === '' ? null : parseFloat(value));
                }}
                className="px-3 py-1 text-sm border rounded bg-white"
                min={0}
                max={4}
                step={0.1}
                placeholder="Max GPA"
              />
            </div>
          </div>

          {/* Fee Filter */}
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-2">Fee Range</span>
            <div className="flex gap-2">
              <input
                type="number"
                value={minFee ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setMinFee(value === '' ? null : parseFloat(value));
                }}
                className="px-3 py-1 text-sm border rounded bg-white"
                min={0}
                placeholder="Min Fee"
              />
              <input
                type="number"
                value={maxFee ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setMaxFee(value === '' ? null : parseFloat(value));
                }}
                className="px-3 py-1 text-sm border rounded bg-white"
                min={0}
                placeholder="Max Fee"
              />
            </div>
          </div>
        </div>
      </div>

      {/* No Courses Message */}
      {filteredData.length === 0 ? (
        <div className="w-full text-center py-10">
          <p className="text-lg font-semibold text-gray-600">No courses available for this category.</p>
        </div>
      ) : (
        // Carousel
        <div className="w-full overflow-hidden">
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
                className="min-w-[20rem] max-w-[20rem] min-h-[30rem] p-4 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden hover:scale-105 transition-all duration-200 ease-in-out"
              >
                {/* Top Half - Image */}
                <div className="h-1/2 relative">
                  <Link href={`${pathname}/${itemData.slug}`}>
                    <Image
                      src={uniimg}
                      width={400}
                      height={400}
                      alt="University Image"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </Link>
                </div>

                {/* Bottom Half - Details */}
                <div className="flex flex-col justify-start p-4 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-800">{itemData.title}</h2>
                  <p className="text-sm text-gray-600 font-medium">{itemData.university.name}</p>

                  <div className="space-y-2">
                    {itemData.qualification && (
                      <div className="flex items-center space-x-2">
                        <FaGraduationCap className="text-blue-500" />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Qualification:</span> {itemData.qualification}
                        </p>
                      </div>
                    )}
                    {itemData.duration && (
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-blue-500" />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Duration:</span> {itemData.duration}
                        </p>
                      </div>
                    )}
                    {itemData.fee && (
                      <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-blue-500" />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Fee:</span> {itemData.fee}
                        </p>
                      </div>
                    )}
                    {itemData.earliestIntake && (
                      <div className="flex items-center space-x-2">
                        <FaRegCalendarAlt className="text-blue-500" />
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Earliest Intake:</span> {itemData.earliestIntake}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default CourseCarousel;