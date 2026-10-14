import { PetProvider } from "@/components/PetContext";
import { BathSimulator } from "@/components/sections/BathSimulator";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { PetSelector } from "@/components/sections/PetSelector";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <PetProvider>
      <main>
        <Hero />
        <PetSelector />
        <Services />
        <BathSimulator />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </PetProvider>
  );
}
