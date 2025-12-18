import { Bebas_Neue, Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "@/components/home/header/Navbar";
import LoadingProgressBar from "@/components/LoadingProgress";
import { Suspense } from "react";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"]
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"]

})

const fontClasses = `${bebas.variable} ${inter.variable} ${playfair.variable} ${poppins.variable}`;


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fontClasses} text-[#E6F6FE] antialiased`} suppressHydrationWarning>
        <Suspense fallback={null}>
          <LoadingProgressBar />
        </Suspense>
        <header>
          <Navbar />
        </header>

        <main className="pt-[75px]">{children}</main>
      </body>
    </html>
  );
}
