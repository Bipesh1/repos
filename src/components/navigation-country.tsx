"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // Import usePathname

export function NavigationCountry() {
 
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className=" w-full bg-white shadow-md backdrop-blur-md z-50"
    >
      <div className="container  md:px-12 py-8 mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button className={`btn`}>
              <Link
                href="#topuniversities"
                className={`text-black/90 hover:text-secondary transition-colors }`}
              >
                Top Universities
              </Link>
            </button>

            <button className={`btn`}>
              <Link
                href="#faq"
                className={`text-black/90 hover:text-secondary transition-colors }`}
              >
                Faq
              </Link>
            </button>
            <button className={`btn`}>
              <Link
                href="#finances"
                className={`text-black/90 hover:text-secondary transition-colors 
                    
                }`}
              >
                Finances
              </Link>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
