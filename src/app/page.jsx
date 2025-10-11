import Features from "@/_components/page/home/Features";
import Hero from "@/_components/page/home/Hero";
import PresentationSection from "@/_components/page/home/PresentationSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PresentationSection />
    </>
  );
}
