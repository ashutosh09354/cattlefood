import SEO from "../components/SEO.jsx";
import Hero from "../components/Hero.jsx";
import BenefitsBar from "../components/BenefitsBar.jsx";
import CategoryCards from "../components/CategoryCards.jsx";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import PromoBanner from "../components/PromoBanner.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQ from "../components/FAQ.jsx";
import Newsletter from "../components/Newsletter.jsx";

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <BenefitsBar />
      <CategoryCards />
      <FeaturedProducts />
      <PromoBanner />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
