'use client'
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Globe, Award, MapPin } from "lucide-react";
import Image from "next/image";

export function UniversityPartnersSection() {
  const [activeTab, setActiveTab] = useState("all");
  
  const universities = [
    {
      name: "University of Toronto",
      logo: "/api/placeholder/120/80",
      country: "Canada",
      region: "North America",
      ranking: "#18 QS World Rankings",
      featured: true
    },
    {
      name: "University of Melbourne",
      logo: "/api/placeholder/120/80",
      country: "Australia",
      region: "Oceania",
      ranking: "#33 QS World Rankings",
      featured: true
    },
    {
      name: "ETH Zurich",
      logo: "/api/placeholder/120/80",
      country: "Switzerland",
      region: "Europe",
      ranking: "#9 QS World Rankings",
      featured: true
    },
    {
      name: "National University of Singapore",
      logo: "/api/placeholder/120/80",
      country: "Singapore",
      region: "Asia",
      ranking: "#11 QS World Rankings",
      featured: true
    },
    {
      name: "University of British Columbia",
      logo: "/api/placeholder/120/80",
      country: "Canada",
      region: "North America",
      ranking: "#34 QS World Rankings",
      featured: false
    },
    {
      name: "Technical University of Munich",
      logo: "/api/placeholder/120/80",
      country: "Germany",
      region: "Europe",
      ranking: "#50 QS World Rankings",
      featured: false
    },
    {
      name: "University of Sydney",
      logo: "/api/placeholder/120/80",
      country: "Australia",
      region: "Oceania",
      ranking: "#38 QS World Rankings",
      featured: false
    },
    {
      name: "Tsinghua University",
      logo: "/api/placeholder/120/80",
      country: "China",
      region: "Asia",
      ranking: "#14 QS World Rankings",
      featured: false
    }
  ];

  const regions = ["all", "North America", "Europe", "Asia", "Oceania"];
  
  const filteredUniversities = activeTab === "all" 
    ? universities 
    : universities.filter(uni => uni.region === activeTab);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our University Partners</h2>
          <p className="text-base md:text-lg text-gray-700 opacity-90 max-w-2xl mx-auto">
            We have established partnerships with top universities around the world to provide you with the best opportunities.
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveTab(region)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === region
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region === "all" ? "All Regions" : region}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredUniversities.map((university, index) => (
            <motion.div
              key={university.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all relative"
            >
              {university.featured && (
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full">
                  Featured
                </div>
              )}
              
              <div className="flex justify-center mb-4">
                <Image
                  src={university.logo}
                  width={120}
                  height={60}
                  alt={university.name}
                  className="object-contain h-16"
                />
              </div>
              
              <h3 className="text-lg font-bold text-center mb-4">{university.name}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-600">{university.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-600">{university.region}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-600">{university.ranking}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UniversityPartnersSection;