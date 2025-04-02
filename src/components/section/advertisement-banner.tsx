"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-muted py-2 px-4 flex items-center justify-between text-sm md:text-base shadow-md">
      <div className="flex items-center gap-3">
        {/* Small Image */}
        <Image
          src="/promo-icon.png"
          alt="Ad"
          width={30}
          height={30}
          className="w-8 h-8"
        />

        {/* Ad Text */}
        <p className="text-primary font-semibold">
          Special Offer!{" "}
          <span className="text-secondary">Get 50% off on your first purchase.</span>
        </p>
      </div>

      {/* Close Button */}
      <button onClick={() => setIsVisible(false)}>
        <X className="h-5 w-5 text-secondary hover:text-primary" />
      </button>
    </div>
  );
}