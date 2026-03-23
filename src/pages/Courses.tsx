import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import EnquireModal from "@/components/modals/EnquireModal";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  Language: "bg-primary/10 text-primary",
  Visa: "bg-accent/10 text-accent",
  Academic: "bg-success/10 text-success",
};

const Courses = () => {
  const { courses } = useData();
  const [enquireCourseId, setEnquireCourseId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="py-16 bg-muted/30 border-b border-border text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Our <span className="text-gradient-primary">Courses</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert-designed programmes to help you succeed in exams, language
            skills, and international admissions.
          </p>
        </div>

        {/* Course cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover overflow-hidden flex flex-col">
                    {/* Image */}
                    <CardHeader className="p-0">
                      <div className="relative aspect-video bg-muted overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <span
                          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                            categoryColors[course.category] ??
                            "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {course.category}
                        </span>
                      </div>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="p-5 flex-1 space-y-3">
                      <h2 className="font-heading font-bold text-lg leading-snug">
                        {course.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-primary" />
                          {course.students} Students
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                          {course.rating}
                        </span>
                      </div>

                      {/* Feature badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {course.features.map((f) => (
                          <Badge key={f} variant="outline" className="text-xs">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border mt-auto">
                      <span className="font-heading font-bold text-primary text-xl">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <Button size="sm" variant="hero" className="gap-1.5" onClick={() => setEnquireCourseId(course.id)}>
                        Enquire
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <EnquireModal 
        isOpen={!!enquireCourseId} 
        onClose={() => setEnquireCourseId(null)} 
        courseId={enquireCourseId || undefined} 
      />
    </div>
  );
};

export default Courses;
