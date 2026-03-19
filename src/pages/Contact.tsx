import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/home/ContactSection";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Page hero */}
        <div className="py-16 bg-muted/30 border-b border-border text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Contact <span className="text-gradient-primary">Us</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We're here to help. Reach out with any questions about courses,
            admissions, or visa guidance.
          </p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
