import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Star, ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData, Course } from "@/context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import CourseDetailsModal from "@/components/modals/CourseDetailsModal";

const CoursesSection = () => {
  const { courses } = useData();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState<Course | null>(null);

  const handleEnrollDirectly = (courseId: string) => {
    sessionStorage.setItem("pendingCourseToEnroll", courseId);
    navigate("/student-login");
  };

  useEffect(() => {
    if (!isAutoPlaying || courses.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, courses.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  if (!courses || courses.length === 0) {
    return (
      <section className="py-20 bg-muted/30 flex items-center justify-center">
         <p className="text-muted-foreground animate-pulse">Loading Catalog...</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Our Courses
          </Badge>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Explore Our <span className="text-gradient-primary">Popular Courses</span>
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold animate-pulse">
              <Zap className="w-3 h-3" /> Live
            </span>
          </div>
          <p className="text-muted-foreground">
            Choose from our expertly designed courses to achieve your educational and career goals.
          </p>
        </motion.div>

        {/* Featured Course Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`grid ${courses[currentIndex]?.image?.trim() ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 bg-card p-8 rounded-2xl shadow-lg`}
              >
                {courses[currentIndex]?.image && courses[currentIndex].image.trim() !== "" && (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                    <img
                      src={courses[currentIndex].image}
                      alt={courses[currentIndex].title}
                      className="w-full h-full object-cover object-center transition-opacity duration-500 opacity-0"
                      onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">
                        {courses[currentIndex].category}
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="flex flex-col justify-center space-y-4">
                  {(!courses[currentIndex]?.image || courses[currentIndex].image.trim() === "") && (
                    <Badge className="w-fit bg-accent text-accent-foreground mb-1">
                      {courses[currentIndex].category}
                    </Badge>
                  )}
                  <h3 className="font-heading text-2xl md:text-3xl font-bold">
                    {courses[currentIndex].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {courses[currentIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{courses[currentIndex].duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{courses[currentIndex].students} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span>{courses[currentIndex].rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courses[currentIndex].features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-2xl font-bold text-primary">
                      ₹{courses[currentIndex].price.toLocaleString()}
                    </div>
                    <Button variant="hero" onClick={() => handleEnrollDirectly(courses[currentIndex].id)}>
                      Enroll Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full card-hover overflow-hidden flex flex-col">
                {course.image && course.image.trim() !== "" && (
                  <CardHeader className="p-0">
                    <div className="relative w-full h-[200px] overflow-hidden bg-muted">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover object-center transition-opacity duration-500 opacity-0"
                        onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      />
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        {course.category}
                      </Badge>
                    </div>
                  </CardHeader>
                )}
                <CardContent className={`p-4 space-y-3 flex-1 ${(!course.image || course.image.trim() === "") ? 'pt-6' : ''}`}>
                  {(!course.image || course.image.trim() === "") && (
                    <Badge className="bg-accent text-accent-foreground w-fit mb-2">
                      {course.category}
                    </Badge>
                  )}
                  <h3 className="font-heading font-semibold line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="font-bold text-primary">
                    ₹{course.price.toLocaleString()}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setSelectedCourseDetails(course)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Get More Courses CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/portal-login">
            <Button variant="hero" className="w-full gap-2">
              Enroll via Portal
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <CourseDetailsModal 
        isOpen={!!selectedCourseDetails} 
        onClose={() => setSelectedCourseDetails(null)} 
        course={selectedCourseDetails} 
      />
    </section>
  );
};
export default CoursesSection;