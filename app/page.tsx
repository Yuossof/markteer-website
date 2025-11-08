import Hero from "@/components/home/Hero";
import OurClients from "@/components/home/our-clients/OurClients";
import OurServices from "@/components/home/our-services/OurServices";

export default function Home() {
  return (
    <div className="h-[500vh] w-full">
      <Hero />
      <OurServices />
      <OurClients />
      <div className="h-[500px] "></div>
    </div>
  );
}
