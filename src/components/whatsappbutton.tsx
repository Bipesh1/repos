"use client"

import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function WhatsAppButton() {
  const phoneNumber = "9807438831"; // Replace with your actual WhatsApp number
  const message = "Hello! I have a question about university applications."; // Optional default message

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-10 h-10" />
      </Link>
    </div>
  );
}