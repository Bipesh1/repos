"use client";
import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const primaryColor = 'bg-blue-600';
  const secondaryColor = 'bg-purple-600';
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="pt-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
          Choose Your <span className="text-blue-600">GoingCollege</span> Package
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Start your international education journey with the right support package that fits your needs
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-16 pb-12 sm:mt-20 sm:pb-16 lg:pb-24">
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              
              {/* Starter Package */}
              <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden lg:ml-auto lg:mr-4">
                <div className={`px-6 py-8 ${primaryColor} sm:p-10 sm:pb-6`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-white" id="tier-standard">
                      Starter Package 🌱
                    </h3>
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide bg-white text-blue-600">
                      Save 60%
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline text-white">
                    <span className="text-4xl font-extrabold">
                      NRs. 999
                    </span>
                    <span className="ml-2 text-xl line-through text-blue-100">
                      NRs. 2,500
                    </span>
                  </div>
                  <p className="mt-5 text-lg text-blue-100">
                    Essential support for self-starters
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-white sm:p-10 sm:pt-6">
                  <div className="space-y-4">
                    <FeatureItem isIncluded={true} text="Self Apply" />
                    <FeatureItem isIncluded={true} text="Shortlist Universities" />
                    <FeatureItem isIncluded={true} text="24/7 Support" />
                    <FeatureItem isIncluded={true} text="EduPilot" />
                    <FeatureItem isIncluded={true} text="Access to University Listings" />
                    <FeatureItem isIncluded={true} text="Application to Unlimited Universities" />
                    <FeatureItem isIncluded={true} text="Access to Personal Dashboard" />
                    <FeatureItem isIncluded={true} text="WhatsApp + Email Verification" />
                    <FeatureItem isIncluded={true} text="Document Upload Capability" />
                    <FeatureItem isIncluded={false} text="Apply to Premium/IVY Universities" />
                    <FeatureItem isIncluded={false} text="Access to Premium-Only Universities" />
                    <FeatureItem isIncluded={false} text="Exclusive Premium Articles & Content" />
                    <FeatureItem isIncluded={false} text="Express Admission Support (24–48hr Processing)" />
                    <FeatureItem isIncluded={false} text="Priority Notifications & Alerts" />
                    <FeatureItem isIncluded={true} text="Visa & SOP Writing Templates" />
                    <FeatureItem isIncluded={false} text="Get Notified and Attend US Government Visa Info Sessions" />
                    <FeatureItem isIncluded={false} text="University Introduction Call (Subject to Availability)" />
                    <FeatureItem isIncluded={false} text="Connect with University Alumni" />
                    <FeatureItem isIncluded={false} text="Visa Interview Preparation" />
                    <FeatureItem isIncluded={false} text="Scholarship Assistance" />
                    <FeatureItem isIncluded={true} text="Visa Interview Guidelines eBooks" />
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      className={`w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${primaryColor} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      <Link href={"/register"}>Get Started</Link>
                    </button>
                  </div>
                </div>
              </div>

              {/* Achiever Package */}
              <div className="flex flex-col rounded-2xl shadow-lg overflow-hidden lg:mr-auto lg:ml-4">
                <div className={`px-6 py-8 ${secondaryColor} sm:p-10 sm:pb-6`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-extrabold text-white" id="tier-standard">
                      Achiever Package 🚀
                    </h3>
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide bg-white text-purple-600">
                      Save 40%
                    </span>
                  </div>
                  <div className="mt-4 flex items-baseline text-white">
                    <span className="text-4xl font-extrabold">
                      NRs. 14,999
                    </span>
                    <span className="ml-2 text-xl line-through text-purple-100">
                      NRs. 25,000
                    </span>
                  </div>
                  <p className="mt-5 text-lg text-purple-100">
                    Full-service support for serious applicants
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-white sm:p-10 sm:pt-6">
                  <div className="space-y-4">
                    <FeatureItem isIncluded={true} text="Self Apply" />
                    <FeatureItem isIncluded={true} text="Shortlist Universities" />
                    <FeatureItem isIncluded={true} text="24/7 Support" />
                    <FeatureItem isIncluded={true} text="EduPilot" />
                    <FeatureItem isIncluded={true} text="Access to University Listings" />
                    <FeatureItem isIncluded={true} text="Application to Unlimited Universities" />
                    <FeatureItem isIncluded={true} text="Access to Personal Dashboard" />
                    <FeatureItem isIncluded={true} text="WhatsApp + Email Verification" />
                    <FeatureItem isIncluded={true} text="Document Upload Capability" />
                    <FeatureItem isIncluded={true} text="Apply to Premium/IVY Universities" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Access to Premium-Only Universities" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Exclusive Premium Articles & Content" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Express Admission Support (24–48hr Processing)" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Priority Notifications & Alerts" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Visa & SOP Writing Templates" />
                    <FeatureItem isIncluded={true} text="Get Notified and Attend US Government Visa Info Sessions" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="University Introduction Call (Subject to Availability)" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Connect with University Alumni" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Visa Interview Preparation" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Scholarship Assistance" isHighlighted={true} />
                    <FeatureItem isIncluded={true} text="Visa Interview Guidelines eBooks" />
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      className={`w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${secondaryColor} hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                    >
                      <Link href={"/register"}>Get Premium Access</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-4">
            If you are from India or outside Nepal, please contact us at <a href="mailto:info@goingcollege.com" className="text-blue-600 hover:underline">info@goingcollege.com</a>
          </p>
          <p className="text-gray-600">
            For any queries regarding the packages, please write to us at <a href="mailto:info@goingcollege.com" className="text-blue-600 hover:underline">info@goingcollege.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ isIncluded, text, isHighlighted = false }:{
    isIncluded: boolean;
    text: string;
    isHighlighted?: boolean;
}) {
  return (
    <div className="flex items-start">
      {isIncluded ? (
        <CheckCircle className={`flex-shrink-0 h-6 w-6 ${isHighlighted ? 'text-purple-500' : 'text-green-500'}`} />
      ) : (
        <XCircle className="flex-shrink-0 h-6 w-6 text-red-400" />
      )}
      <p className={`ml-3 text-base text-gray-700 ${isHighlighted ? 'font-medium' : ''}`}>
        {text}
        {isHighlighted && (
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Premium
          </span>
        )}
      </p>
    </div>
  );
}