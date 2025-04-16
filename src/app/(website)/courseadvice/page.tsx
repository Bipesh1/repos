"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Globe, ArrowRight, Check } from "lucide-react"
import InquiryForm from "@/components/inquiryform"

export default function CourseAdvicePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 md:mb-16 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
          <span>Course Matching</span>
          <ArrowRight className="w-4 h-4" />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Find Your Perfect Course
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Let our experts analyze your profile and recommend the best programs for your academic goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Inquiry Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary/90 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span>Personalized Recommendations</span>
              </h2>
              <p className="text-white/90 mt-1">
                Complete this form to receive your custom course matches
              </p>
            </div>
            <div className="p-6 border flex justify-center">
              <InquiryForm />
            </div>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          {/* How It Works */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Our Matching Process
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg mt-1 flex-shrink-0">
                  <BookOpen className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">1. Profile Analysis</h3>
                  <p className="text-muted-foreground">
                    We evaluate your academic background, test scores, and preferences to understand your profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg mt-1 flex-shrink-0">
                  <GraduationCap className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">2. University Matching</h3>
                  <p className="text-muted-foreground">
                    Our system compares your profile against thousands of programs worldwide.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-2.5 rounded-lg mt-1 flex-shrink-0">
                  <Globe className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">3. Scholarship Optimization</h3>
                  <p className="text-muted-foreground">
                    We identify all financial aid opportunities you qualify for.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="bg-gradient-to-br from-secondary/10 to-background p-6 rounded-2xl border border-border">
            <h3 className="font-semibold text-xl mb-4 text-primary">Your Custom Report Will Include:</h3>
            <ul className="space-y-3">
              {[
                "Top 5-8 course recommendations",
                "Admission probability for each program",
                "Scholarship estimates",
                "Application deadlines",
                "Career outcome statistics",
                "Next steps checklist"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}