import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CoursesSection from "@/components/home/CoursesSection";
import TeachersSection from "@/components/home/TeachersSection";
import AchievementsSection from "@/components/home/AchievementsSection";
import LocationSection from "@/components/home/LocationSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CoursesSection />
        <TeachersSection />
        <AchievementsSection />
        <LocationSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};
export default Index;