import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Award, Users, Star, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { stats, courses } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EnquireModal from "@/components/modals/EnquireModal";

const HeroSection = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enquireCourseId, setEnquireCourseId] = useState<string | null>(null);

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
              <Button variant="hero" size="xl" onClick={() => setShowAllCourses(true)}>
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
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

          {/* Image/Visual with Floating Badges */}
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
                  src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?h=1000&w=1500&fit=crop"
                  alt="Hero Image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge: Happy Students */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-1/4 glass rounded-2xl p-4 shadow-lg z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">250+</div>
                    <div className="text-sm text-muted-foreground">Happy Students</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge: Rating */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-8 top-1/3 glass rounded-2xl p-4 shadow-lg z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-warning fill-warning" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">4.9/5</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge: Success Rate */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute left-1/4 -bottom-4 glass rounded-2xl p-4 shadow-lg z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Explore Courses Modal */}
      <AnimatePresence>
        {showAllCourses && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md overflow-y-auto pt-24 pb-12 px-4"
          >
            <div className="container mx-auto max-w-6xl">
              <div className="flex justify-between items-center mb-10 border-b pb-6">
                <div>
                  <h2 className="text-3xl font-bold font-heading">Our <span className="text-primary">Programs</span></h2>
                  <p className="text-muted-foreground">Detailed view of all available courses</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-muted" onClick={() => setShowAllCourses(false)}>
                  <X className="w-8 h-8" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden card-hover">
                    <div className="flex flex-col sm:flex-row h-full">
                      <div className="sm:w-2/5 h-48 sm:h-auto relative">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <Badge className="absolute top-2 left-2">{course.category}</Badge>
                      </div>
                      <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                          <div className="flex flex-wrap gap-4 text-xs font-medium mb-4">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary"/> {course.duration}</span>
                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning"/> {course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t pt-4">
                          <span className="text-xl font-bold text-primary">₹{course.price.toLocaleString()}</span>
                          <Button size="sm" onClick={() => { setEnquireCourseId(course.id); setShowAllCourses(false); }}>Enquire</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <EnquireModal 
        isOpen={!!enquireCourseId} 
        onClose={() => setEnquireCourseId(null)} 
        courseId={enquireCourseId || undefined} 
      />
    </section>
  );
};

export default HeroSection;