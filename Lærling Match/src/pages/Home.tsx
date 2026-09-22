
{/*import Footer from "../components/layout/Footer";*/}

import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import GoalsSection from "../components/home/GoalsSection"
import HowItWorksSection from "../components/home/HowItWorksSection"
import CTASection from "../components/home/CTASection";
import Navbar from "../components/home/Navbar";

const Home = () => {
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

      {/*<Footer />*/}
    </>
  );
};

export default Home;
