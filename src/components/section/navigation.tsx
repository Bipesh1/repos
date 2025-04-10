import { useState, useEffect } from "react";
import MobileSidebar from "./mobile-sidebar";
import { SearchBar } from "../search";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { getActiveCountries } from "@/app/(protected)/actions/country";
import { checkUser } from "@/app/(protected)/actions/user";
import { Button } from "../ui/button";
import AdBanner from "./advertisement-banner";
import { Menu, X, Search } from "lucide-react";

export async function Navigation() {
  // Fetch data server-side
  const countriesResponse = await getActiveCountries().catch(error => {
    console.error("Error fetching countries:", error);
    return { data: [] };
  });
  
  const countries = countriesResponse.data || [];
  
  const userResponse = await checkUser().catch(() => {
    return { data: null };
  });
  
  const user = userResponse.data;

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      {/* <AdBanner /> */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src={logo} 
                alt="Logo" 
                width={100} 
                height={100} 
                className="h-10 w-auto md:h-12" 
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                {/* Countries dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-gray-800 text-base font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200">
                    Countries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="grid grid-cols-2 gap-6 w-[650px]">
                      {countries?.length > 0 ? (
                        countries.map((country: any) => (
                          <div key={country._id} className="flex items-center space-x-3 group p-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                              <Image 
                                src={country.image.url} 
                                alt={country.name} 
                                width={40} 
                                height={40} 
                                className="object-cover w-full h-full" 
                              />
                            </div>
                            <div>
                              <Link 
                                href={`/${country.name.toLowerCase()}?id=${country._id}`} 
                                className="text-gray-900 font-medium group-hover:text-primary transition-colors"
                              >
                                {country.name}
                              </Link>
                              <p className="text-gray-500 text-xs">See universities in {country.name}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No countries available</p>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-gray-800 text-base font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="grid grid-cols-2 gap-6 w-[500px]">
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-sm">About</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/about" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link href="/article/edupilot-nepal-for-self-apply-to-usa~67eec22bf2e1824c806fb309" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              EduPilot
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/faq" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              FAQ
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/why-self-apply~67eba2fd755e391784ebcddc" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Why Self Apply?
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-base">Resources</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/why-us" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Why Us?
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/media-coverage~67eba33c755e391784ebce20" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Media Coverage
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Blog
                            </Link>
                          </li>
                          <li>
                            <Link href="/pricing" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Pricing
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Apply USA dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-gray-800 text-base font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200">
                    Apply USA
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="grid grid-cols-3 gap-8 w-[800px]">
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-sm uppercase tracking-wide">Guide</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/#top-universities" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Top Universities
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/scholarship~67dfbf97b3691ca0b847fa70" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Scholarships
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/for-working-professional~67e510195644b83ab5a2920e" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              For Working Professionals
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/visa-guide~67dfc007b3691ca0b847faf2" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Visa Guide
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-sm uppercase tracking-wide">Universities</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/blog/bachelor~67dfc18bb3691ca0b847fb43" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Bachelor
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/masters-section~67dfc239b3691ca0b847fb96" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Masters
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/dba~67dfc053b3691ca0b847fb05" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              DBA
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/phd~67dfc32fb3691ca0b847fbca" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              PhD
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-sm uppercase tracking-wide">Living In USA</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/blog/job-opportunities~67dfc8acb3691ca0b847fd51" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Job Opportunities
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/postal-study-work~67dfc397b3691ca0b847fc1b" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Post Study Work
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/apply-for-greencard~67e10c80318f258e0d32c274" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Apply for Greencard
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/on-campus-job~67e10cd8318f258e0d32c295" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              On Campus Job
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-gray-800 text-base font-medium hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="grid grid-cols-2 gap-6 w-[600px]">
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-sm uppercase tracking-wide">Resources</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/blog/course-advice~67e50dc45644b83ab5a29086" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Course Advice
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/education-loan~67e50e105644b83ab5a290b4" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Education Loan
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/meet-alumni~67e50e7c5644b83ab5a290e8" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Meet Alumni
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/assured-scholarship~67e50ebf5644b83ab5a29120" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Assured Scholarship
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-3 text-sm uppercase tracking-wide">Programs</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/blog/express-admission~67e50ef75644b83ab5a2915d" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              Express Admission
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/mbbs~67e50f365644b83ab5a29197" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              MBBS
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/for-working-professional~67e510195644b83ab5a2920e" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              For Working Professionals
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/nursing~67e50f6d5644b83ab5a291d2" className="text-sm text-gray-600 hover:text-primary flex items-center hover:translate-x-1 transition-all duration-200">
                              For Nursing
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and User Profile - desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <SearchBar />
            </div>
            
            {/* User Menu - Based on user role */}
            <div>
              {user?.role === "user" && (
                user?.category === "none" ? (
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-4">
                    <Link href="/payment">Payment For Dashboard</Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-4">
                    <Link href="/studentdashboard">Your Dashboard</Link>
                  </Button>
                )
              )}
              {user?.role === "super-admin" && (
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-4">
                  <Link href="/dashboard">Your Dashboard</Link>
                </Button>
              )}
              {user?.role === "admin" && (
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-full px-4">
                  <Link href="/admindashboard">Your Dashboard</Link>
                </Button>
              )}
              {user == null && (
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile menu button & search */}
          <div className="flex lg:hidden items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <Search size={20} className="text-gray-600" />
            </button>
            <MobileSidebar  />
          </div>
        </div>
      </div>
    </nav>
  );
}