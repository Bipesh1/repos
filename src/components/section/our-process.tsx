'use client'
import React from 'react';
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Users, 
  FileText, 
  GraduationCap, 
  Plane, 
  UserCheck,
  ArrowRight
} from "lucide-react";

export function OurProcessSection() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Initial Consultation",
      description: "We start with understanding your academic background, interests, and career aspirations to provide tailored guidance."
    },
    {
      icon: Users,
      title: "University Selection",
      description: "Based on your profile, we help you shortlist universities that align with your academic goals and financial constraints."
    },
    {
      icon: FileText,
      title: "Application Assistance",
      description: "Our experts guide you through the application process, help with documentation, and review your personal statements and essays."
    },
    {
      icon: GraduationCap,
      title: "Scholarship Guidance",
      description: "We help you identify and apply for scholarships and financial aid opportunities to make your education affordable."
    },
    {
      icon: Plane,
      title: "Visa Assistance",
      description: "Our team assists with visa application procedures, interview preparation, and necessary documentation."
    },
    {
      icon: UserCheck,
      title: "Pre-Departure Support",
      description: "We provide comprehensive pre-departure orientation to prepare you for life in a new country."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-accent/10">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-base md:text-lg text-gray-700 opacity-90 max-w-2xl mx-auto">
            We follow a structured approach to ensure you get into your dream university. Here's how we make it happen:
          </p>
        </motion.div>

        <div className="relative">
          {/* <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2 z-0" /> */}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative bg-white rounded-xl shadow-lg p-6 z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-white rounded-full p-4 mb-4 relative">
                    <step.icon className="h-8 w-8" />
                    <div className="absolute -top-2 -right-2 bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurProcessSection;