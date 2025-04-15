"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default function MainCarousel({ data }: { data: any }) {
  const sortedData = [...data].sort((a, b) => (a.priority || 999) - (b.priority || 999));

  const carousel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0); // Track window width for responsiveness

  // Recalculate width on data change or window resize
  useEffect(() => {
    const handleResize = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
      setWindowWidth(window.innerWidth); // Update window width
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, [data]); // Recalculate when data changes

  return (
    <div className="w-full overflow-hidden">
      {sortedData.length > 0 ? (
        <motion.div
          ref={carousel}
          drag="x"
          whileDrag={{ scale: 0.95 }}
          dragElastic={windowWidth < 640 ? 0.8 : 0.2} // Adjust elasticity for mobile
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{ bounceDamping: 30 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex will-change-transform justify-center cursor-grab active:cursor-grabbing gap-4 px-4" // Add gap and padding
        >
          {sortedData.slice(0, 4)?.map((itemData) => (
            <motion.div
              key={itemData._id}
              className="min-w-[16rem] md:min-w-[20rem] max-w-[16rem] md:max-w-[20rem] min-h-[25rem] p-4 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden" // Responsive sizing
            >
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
                  {itemData.category === "gold" ? "Gold" : "Ivy"}
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
          <p className="text-gray-600">No universities match your filter criteria</p>
        </div>
      )}
    </div>
  );
}