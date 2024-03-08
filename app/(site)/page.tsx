import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import Enroll from "@/components/Enroll";
import { Accordion } from "@/components/Accordion/Accordion";
// import FeaturesTab from "@/components/FeaturesTab/FeaturesTab";

export const metadata: Metadata = {
  title: "Camp-Addis",
  description: "Welcome to Camp Addis",
  // other metadata
};

export default async function Home() {
  return (
    <main>
      <Hero />

      <About />
      {/* <Accordion /> */}
      <Feature />
      {/* <FeaturesTab /> */}
      {/* <FunFact /> */}
      {/* <Integration /> */}
      {/* <CTA />
      <FAQ />
       */}
      <Testimonial />
      {/* <Pricing /> */}
      <Contact />
      <Brands />
      {/* <Enroll /> */}
      {/* <Blog /> */}
    </main>
  );
}
