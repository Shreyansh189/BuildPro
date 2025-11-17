import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhyChooseSection from "../components/WhyChooseSection";
import ProjectsSection from "../components/ProjectsSection";
import HappyClientsSection from "../components/HappyClientsSection";
import ContactForm from "../components/ContactForm";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div id="top">
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <ProjectsSection />
      <HappyClientsSection />
      <ContactForm />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
