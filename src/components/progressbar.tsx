"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    // Use a timeout to simulate route load completion.
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // Adjust this delay (in ms) based on your app’s average load time

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
