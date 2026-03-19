import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CoursesSection from "@/components/home/CoursesSection";
import TeachersSection from "@/components/home/TeachersSection";

import VideoTestimonialsSection from "@/components/home/VideoTestimonialsSection";
import LocationSection from "@/components/home/LocationSection";
import CTASection from "@/components/home/CTASection";
import AboutSection from "@/components/home/AboutSection";
import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CoursesSection />
        <AboutSection />
        <TeachersSection />
        <VideoTestimonialsSection />
        <BlogSection preview={true} />
        <LocationSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};
export default Index;