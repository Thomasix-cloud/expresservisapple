import HeroSection from './components/HeroSection';
import TrustStrip from './components/TrustStrip';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import GallerySection from './components/GallerySection';
import SalesSection from './components/SalesSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <GallerySection />
      <SalesSection />
      <ContactSection />
    </>
  );
}
