import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import DigitalProducts from "@/components/DigitalProducts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Results />
      <About />
      <Testimonials />
      <DigitalProducts />
      <Contact />
      <Footer />
    </>
  );
}
