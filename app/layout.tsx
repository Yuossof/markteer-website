import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/header/Navbar";
import LoadingProgressBar from "@/components/LoadingProgress";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable} text-[#E6F6FE] antialiased`}>
        <LoadingProgressBar />
        <header>
          <Navbar />
        </header>
        <main className="pt-[75px]">{children}</main>
      </body>
    </html>
  );
}
