import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Users, Award, ChevronLeft, ChevronRight, ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useData, Teacher } from "@/context/DataContext";

const TeachersSection = () => {
  const { teachers } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (teachers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teachers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [teachers.length]);

  const getVisibleTeachers = () => {
    const visible: (Teacher & { position: number })[] = [];
    if (teachers.length === 0) return visible;
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % teachers.length;
      visible.push({ ...teachers[index], position: i });
    }
    return visible;
  };

  if (!teachers || teachers.length === 0) {
    return null;
  }

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Our Faculty
          </Badge>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Meet Our <span className="text-gradient-primary">Expert Teachers</span>
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold animate-pulse">
              <Zap className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-muted-foreground">
            Learn from industry experts with years of experience in their respective fields.
          </p>
        </motion.div>

        {/* Teachers Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 overflow-hidden py-8">
            <AnimatePresence mode="popLayout">
              {getVisibleTeachers().map((teacher, index) => (
                <motion.div
                  key={`${teacher.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === 1 ? 1 : 0.6,
                    scale: index === 1 ? 1 : 0.85,
                    zIndex: index === 1 ? 10 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className={`flex-shrink-0 w-72 ${
                    index === 1 ? "" : "hidden md:block"
                  }`}
                >
                  <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border flex flex-col h-full">
                    {teacher.image && teacher.image.trim() !== "" ? (
                      <div className="relative aspect-square bg-muted shrink-0">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-full h-full object-cover object-center transition-opacity duration-500 opacity-0"
                          onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-heading font-bold text-xl text-background">
                            {teacher.name}
                          </h3>
                          <p className="text-background/80">{teacher.role}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 pb-0">
                        <h3 className="font-heading font-bold text-xl text-foreground">
                          {teacher.name}
                        </h3>
                        <p className="text-muted-foreground">{teacher.role}</p>
                      </div>
                    )}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-end">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {teacher.bio}
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-muted">
                          <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <div className="text-xs font-medium">{teacher.experience}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-muted">
                          <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <div className="text-xs font-medium">{teacher.students}+</div>
                        </div>
                        <div className="p-2 rounded-lg bg-muted">
                          <Star className="w-4 h-4 mx-auto mb-1 text-warning fill-warning" />
                          <div className="text-xs font-medium">{teacher.rating}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % teachers.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {teachers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* See All Teachers CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/teachers">
            <Button variant="hero" size="lg" className="gap-2 px-8">
              See All Teachers
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default TeachersSection;