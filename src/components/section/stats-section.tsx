"use client";
import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GiDuration } from "react-icons/gi";
import { FaPerson } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";


const AnimatedNumber = ({ value }: { value: number }) => {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2000,
  });

  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  return <motion.span>{rounded}</motion.span>;
};

const stats = [
  {
    value: 2,
    label: "Years",
    suffix: "+",
    description: "Helping Students Achieve Their Global Dreams",
    icon: <GiDuration size={40} />,
  },
  {
    value: 100,
    label: "Students",
    suffix: "+",
    description: "Successfully Placed in Top Universities",
    icon: <FaPerson size={40} />,
  },
  {
    value: 200,
    label: "Partnerships",
    suffix: "+",
    description: "Collaborating with Universities Worldwide",
    icon:<FaHandshake size={40} />,
  },
  {
    value: 98,
    label: "Success Rate",
    suffix: "%",
    description: "Guiding Students to Their Ideal Institutions",
    icon: "✨",
  },
];

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nepal's <span className="text-primary">1<sup>st</sup></span> Self Apply Platform
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-semibold text-primary">GoingCollege</span> empowers students in Nepal to apply directly to top global universities. Discover scholarships and colleges tailored to your academic profile — no consultancy dependency required.
        </motion.p>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.15 
              }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {stat.icon}
              </div>
              <div className="text-5xl font-extrabold text-primary mb-3 flex justify-center items-end">
                {inView ? (
                  <>
                    <AnimatedNumber value={stat.value} />
                    <span className="text-3xl ml-1">{stat.suffix}</span>
                  </>
                ) : (
                  "0"
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      
      </div>
    </section>
  );
}