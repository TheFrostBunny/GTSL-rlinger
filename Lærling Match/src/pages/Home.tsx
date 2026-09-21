import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HeroSection from "../components/home/"
import AboutSection from "../components/home/"
import GoalsSection from "../components/home/"
import HowItWorksSection from "../components/home/"
import CTASection from "../components/home/";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <GoalsSection />
        <HowItWorksSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}