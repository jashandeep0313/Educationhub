import { motion } from "framer-motion";
import { ArrowRight, Play, Award, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { stats } from "@/lib/data";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Award className="w-4 h-4" />
              <span>GOVT APPROVED LIC# 535/I.C.</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock Your{" "}
              <span className="text-gradient-primary">Potential</span> With
              <span className="text-gradient-accent"> IQ Education</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Your gateway to success! Expert coaching for IELTS, PTE, Spoken English, 
              and comprehensive visa guidance. Online classes available.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button variant="hero" size="xl">
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="hero-outline" size="xl">
                <Play className="w-5 h-5" />
                Watch Success Stories
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading text-3xl font-bold text-primary">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Main circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse-glow" />
              <div className="absolute inset-4 rounded-full bg-card shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?h=1000&w=1500&fit=crop&mark=https:%2F%2Fassets.imgix.net%2F~text%3Ftxtclr%3Dfff%26txt%3DFree+Education+Photos%26txtsize%3D120%26txtpad%3D20%26bg%3D80000000%26txtfont%3DAvenir-Heavy%26txtalign%3Dcenter%26w%3D1300&markalign=center%2Cmiddle&txt=pexels.com&txtalign=center&txtsize=60&txtclr=eeffffff&txtfont=Avenir-Heavy&txtshad=10"
                  alt=" Hero Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-1/4 glass rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold">2500+</div>
                    <div className="text-sm text-muted-foreground">Happy Students</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-8 top-1/3 glass rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <div className="font-semibold">4.9/5</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute left-1/4 -bottom-4 glass rounded-2xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
