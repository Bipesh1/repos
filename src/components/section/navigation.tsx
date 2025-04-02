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

export async function Navigation() {
  // Fetch data server-side instead of client-side
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
    <nav className="fixed w-full bg-white backdrop-blur-md z-50">
      {/* <AdBanner /> */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" height={100} width={100} />
          </Link>

          <div className="hidden md:flex items-center text-base space-x-10 ">
            <NavigationMenu>
              <NavigationMenuList className="space-x-10">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black text-base font-normal hover:text-primary transition-colors">
                    Countries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    <div className="container grid grid-cols-2 space-y-4 md:w-[650px]">
                      {countries?.length > 0 ? (
                        countries.map((country: any) => (
                          <div key={country._id} className="flex items-center gap-x-10">
                            <div className="w-10">
                              <Image src={country.image.url} alt={country.name} width={500} height={500} />
                            </div>
                            <div>
                              <Link href={`/${country.name.toLowerCase()}?id=${country._id}`} className="text-primary">
                                {country.name}
                              </Link>
                              <p className="text-secondary/70">See universities in {country.name}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-secondary/70">No countries available</p>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className="text-black text-base font-normal hover:text-primary transition-colors">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 absolute left-1/2 transform -translate-x-1/2">
                    <div className="container grid grid-cols-2 gap-6 md:w-[500px]">
                      <ul className="space-y-2">
                        <li>
                          <Link href="/company/about" className="text-sm text-secondary/80 hover:text-primary">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67eba2b3755e391784ebcd99" className="text-sm text-secondary/80 hover:text-primary">
                            EduPilot
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/faq" className="text-sm text-secondary/80 hover:text-primary">
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67eba2fd755e391784ebcddc" className="text-sm text-secondary/80 hover:text-primary">
                            Why Self Apply?
                          </Link>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/company/why-us" className="text-sm text-secondary/80 hover:text-primary">
                            Why Us?
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67eba33c755e391784ebce20" className="text-sm text-secondary/80 hover:text-primary">
                            Media Coverage
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog" className="text-sm text-secondary/80 hover:text-primary">
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link href="company/blog/67eba390755e391784ebcfaa" className="text-sm text-secondary/80 hover:text-primary">
                            Pricing
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black text-base font-normal hover:text-primary transition-colors">
                    Apply USA
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    <div className="container grid grid-cols-3 gap-6 md:w-[800px]">
                      <div>
                        <h3 className="font-medium text-primary mb-2">Guide</h3>
                        <ul className="space-y-2">
                          <li>
                          <Link href="/#top-universities" className="text-sm text-secondary/80 hover:text-primary">
                              Top Universities
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67dfbf97b3691ca0b847fa70" className="text-sm text-secondary/80 hover:text-primary">
                              Scholarships
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67e510195644b83ab5a2920e" className="text-sm text-secondary/80 hover:text-primary">
                              For Working Professionals
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67dfc007b3691ca0b847faf2" className="text-sm text-secondary/80 hover:text-primary">
                              Visa Guide
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-2">Universities</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/blog/67dfc18bb3691ca0b847fb43" className="text-sm text-secondary/80 hover:text-primary">
                              Bachelor
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67dfc239b3691ca0b847fb96" className="text-sm text-secondary/80 hover:text-primary">
                              Masters
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67dfc053b3691ca0b847fb05" className="text-sm text-secondary/80 hover:text-primary">
                              DBA
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67dfc32fb3691ca0b847fbca" className="text-sm text-secondary/80 hover:text-primary">
                              PhD
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-2">Living In USA</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/company/blog/67dfc8acb3691ca0b847fd51" className="text-sm text-secondary/80 hover:text-primary">
                              Job Opportunities
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67dfc397b3691ca0b847fc1b" className="text-sm text-secondary/80 hover:text-primary">
                              Post Study Work
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67e10c80318f258e0d32c274" className="text-sm text-secondary/80 hover:text-primary">
                              Apply for Greencard
                            </Link>
                          </li>
                          <li>
                            <Link href="/company/blog/67e10cd8318f258e0d32c295" className="text-sm text-secondary/80 hover:text-primary">
                              On Campus Job
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-black text-base font-normal hover:text-primary transition-colors">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4">
                    <div className="container grid grid-cols-2 gap-6 md:w-[600px]">
                      <ul className="space-y-2">
                        <li>
                          <Link href="/company/blog/67e50dc45644b83ab5a29086" className="text-sm text-secondary/80 hover:text-primary">
                            Course Advice
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67e50e105644b83ab5a290b4" className="text-sm text-secondary/80 hover:text-primary">
                            Education Loan
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67e50e7c5644b83ab5a290e8" className="text-sm text-secondary/80 hover:text-primary">
                            Meet Alumni
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67e50ebf5644b83ab5a29120" className="text-sm text-secondary/80 hover:text-primary">
                            Assured Scholarship
                          </Link>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/company/blog/67e50ef75644b83ab5a2915d" className="text-sm text-secondary/80 hover:text-primary">
                            Express Admission
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67e50f365644b83ab5a29197" className="text-sm text-secondary/80 hover:text-primary">
                            MBBS
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67e510195644b83ab5a2920e" className="text-sm text-secondary/80 hover:text-primary">
                            For Working Professionals
                          </Link>
                        </li>
                        <li>
                          <Link href="/company/blog/67e50f6d5644b83ab5a291d2" className="text-sm text-secondary/80 hover:text-primary">
                            For Nursing
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="block lg:hidden">
            <MobileSidebar />
          </div>
          
          <div className="hidden lg:block">
            {user?.role == "user" && (
              user?.category==="none"?
              <Button variant={"outline"}>
                <Link href={"/payment"} className="text-primary">
                    Payment For Dashboard
                </Link>
              </Button>:<Button variant={"outline"}>
                <Link href={"/studentdashboard"} className="text-primary">
                  Your Dashboard
                </Link>
              </Button>
            )}
            {user?.role == "super-admin" && (
              <Button variant={"outline"}>
                <Link href={"/dashboard"} className="text-primary">
                  Your Dashboard
                </Link>
              </Button>
            )}
            {user?.role == "admin" && (
              <Button variant={"outline"}>
                <Link href={"/admindashboard"} className="text-primary">
                  Your Dashboard
                </Link>
              </Button>
            )}
            {user == null && (
              <Button className="bg-primary hover:bg-primary/80 rounded-full w-32">
                <Link href={"/login"}>Login</Link>
              </Button>
            )}
          </div>

          <div className="hidden lg:block">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}