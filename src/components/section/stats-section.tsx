"use client";
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedNumber = ({ value }:any) => {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2000
  });
  
  const rounded = useTransform(springValue, (latest) => Math.round(latest));
  
  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  return <motion.span>{rounded}</motion.span>;
};

const stats = [
  { value: 3000, label: "Students", suffix: "+" },
  { value: 99, label: "Success Rate", suffix: "%" },
  { value: 15, label: "Average Response Time", suffix: "min" },
  { value: 50, label: "Counselors", suffix: "+" }
];

export function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold  mb-2">
                {inView ? (
                  <>
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </>
                ) : "0"}
              </div>
              <div className="text-muted-foreground text-primary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;