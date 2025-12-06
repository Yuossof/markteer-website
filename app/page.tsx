import Footer from "@/components/footer/Footer";
import Hero from "@/components/home/Hero";
import OurClients from "@/components/home/our-clients/OurClients";
import OurServices from "@/components/home/our-services/OurServices";
import HomeProjects from "@/components/home/projects/Projects";

export default function Home() {
  return (
    <div className="h-[500vh] w-full">
      <Hero />
      <OurServices />
      <HomeProjects />
      <OurClients />
      <Footer />
    </div>  
  );
}
