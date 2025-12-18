"use client"
import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import Innovation from "@/components/home/innovation/innovation";
import OurServicesWrapper from "@/components/home/our-services/OurServicesWrapper";
import FeaturedProjects from "@/components/home/featured-projects/FeaturedProjects";
import Spotlights from "@/components/home/spotlights/Spotlights";
import ContactUs from "@/components/home/contact-us/ContactUs";

export default function Home() {
  return (
    <div className=" w-full">
      <Hero />
      <Innovation />
      {/* <OurClients /> */}
      
      <div className="my-20"></div>
      <FeaturedProjects />
      <div className="my-20"></div>
      <OurServicesWrapper />
      <Spotlights />
      <ContactUs />
      <Footer />
    </div>
  );
}
