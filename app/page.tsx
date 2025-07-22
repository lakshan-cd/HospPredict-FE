import Image from "next/image";
import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/features-section";
import { KeyTechnology } from "@/components/home/key-technology";

export default function Home() {
  return (
    <>
    <Hero />
    <div className="my-12">
    <FeaturesSection />
    </div>
    <div className="my-12">
      <KeyTechnology />
    </div>
    </>
  );
}
