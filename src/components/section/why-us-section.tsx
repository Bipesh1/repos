"use client";

import { motion } from "framer-motion";
import {Eye, Search, FileQuestion, CircleCheckBig } from "lucide-react";
import Image from "next/image";
import aboutus from "@/assets/aboutus.png";

export function WhyUsSection() {
  return (
    <section className="py-24 bg-white ">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why to Choose <span className="text-primary">Going to College Abroad</span></h2>
          <p className="text-base md:text-lg text-gray-700 opacity-90 max-w-2xl mx-auto">Apply on your own <span className="text-secondary">track your admission on mobile, and secure scholarships</span>—all in your control, hassle-free!</p>
        </motion.div>

        <div className="grid xl:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/20 to-primary-foreground/5 rounded-3xl transform -rotate-3" />
              <Image
                src={aboutus}
                width={600}
                alt="Consultancy Services"
                className="relative rounded-2xl shadow-2xl mx-auto"
           
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 hidden xl:block lg:left-0 bg-accent text-foreground rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <CircleCheckBig className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Truly Self Apply</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 hidden xl:block right-0 bg-accent text-foreground rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
              <CircleCheckBig className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">Assured Scholarships Upto 100%</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8">
            {[
              {
                icon: FileQuestion,
                title: "Single Application, Multiple Universities",
                description: "Apply to your desired universities with a single application—and never miss out on scholarship opportunities. With single application, apply to multiple universities, grab scholarships and get accepted.",
              },
              {
                icon: Search,
                title: "Realtime Updates",
                description: "Easily track your application on your phone, get instant updates, and receive notifications when you're accepted or awarded a scholarship. 24 hours tracking and assistance available.",
              },
              {
                icon: Eye,
                title: "EduPilot",
                description: "EduPilot will assist you throughout your process on achieving admission to scholarships. EduPilot will also helps you to connect with University team to boost your confidence for the visa interview.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-primary text-white rounded-xl p-6">
                <div className="mt-1">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-base">{feature.title}</h3>
                  <p className="opacity-90 text-justify text-sm lg:text-base">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
