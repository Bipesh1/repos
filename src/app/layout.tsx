import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./(website)/globals.css";
import ProgressBar from "@/components/progressbar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nepal Abroad Consultancy | Study, Work, and Settle Abroad",
  description:
    "Top-rated consultancy in Nepal for studying, working, and settling abroad. Get expert guidance for visas, scholarships, and career opportunities worldwide.",
  keywords: [
    "Nepal abroad consultancy",
    "study abroad Nepal",
    "work abroad Nepal",
    "settle abroad Nepal",
    "visa consultancy Nepal",
    "scholarship abroad Nepal",
  ],
  authors: [{ name: "GoingCollege", url: "https://goingcollege.com" }],
  openGraph: {
    title: "Nepal Abroad Consultancy | Study, Work, and Settle Abroad",
    description:
      "Top-rated consultancy in Nepal for studying, working, and settling abroad. Get expert guidance for visas, scholarships, and career opportunities worldwide.",
    type: "website",
    url: "https://goingcollege.com",
    images: [
      {
        url: "https://goingcollege.com/og-image.jpg", // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "Nepal Abroad Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepal Abroad Consultancy | Study, Work, and Settle Abroad",
    description:
      "Top-rated consultancy in Nepal for studying, working, and settling abroad. Get expert guidance for visas, scholarships, and career opportunities worldwide.",
    images: ["https://goingcollege.com/og-image.jpg"], // Replace with your OG image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Nepal Abroad Consultancy",
            url: "https://goingcollege.com",
            logo: "https:/goingcollege/logo.png", // Replace with your logo URL
            description:
              "Top-rated consultancy in Nepal for studying, working, and settling abroad.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Your Street Address",
              addressLocality: "Kathmandu",
              addressRegion: "Bagmati",
              postalCode: "44600",
              addressCountry: "Nepal",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+977-1234567890",
              contactType: "customer service",
              email: "info@yourwebsite.com",
            },
          })}
        </script>
      </head>
      <body className={poppins.className}>
        <ProgressBar/>
        {children}
      </body>
    </html>
  );
}