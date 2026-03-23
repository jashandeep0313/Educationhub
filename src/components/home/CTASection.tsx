import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { instituteInfo } from "@/lib/data";

const CTASection = () => {
  const navigate = useNavigate();
  
  const handleGenericEnroll = () => {
    sessionStorage.setItem("pendingCourseToEnroll", "GenEnroll");
    navigate("/portal-login");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-primary" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-background/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-primary-foreground"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey to Success?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Join thousands of successful students who have achieved their dreams with IQ Education Hub. 
            Enroll now and get a free counseling session!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="xl"
                onClick={handleGenericEnroll}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            <a href={`tel:${instituteInfo.phone}`}>
              <Button
                size="xl"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
