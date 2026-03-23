import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Clock, Users, Star, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/context/DataContext";

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

const CourseDetailsModal = ({ isOpen, onClose, course }: CourseDetailsModalProps) => {
  const navigate = useNavigate();

  if (!isOpen || !course) return null;

  const handleEnrollNow = () => {
    sessionStorage.setItem("pendingCourseToEnroll", course.id);
    onClose();
    navigate("/student-login");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card border shadow-2xl rounded-2xl w-full max-w-4xl relative overflow-hidden flex flex-col md:flex-row max-h-[95vh]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 hover:bg-background text-foreground transition-all backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side: Image & Meta */}
          <div className="w-full md:w-5/12 relative aspect-video md:aspect-auto bg-muted">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-accent-foreground drop-shadow-md px-3 py-1">
                {course.category}
              </Badge>
            </div>
            {/* Gradient Overlay for desktop */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 md:from-background/20 to-transparent via-background/40" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg hidden md:block">
              <div className="text-3xl font-bold text-primary drop-shadow-xl bg-background/90 w-fit px-3 py-1 rounded-lg">
                ₹{course.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2 leading-tight">
              {course.title}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5 p-2 bg-muted/50 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5 p-2 bg-muted/50 rounded-lg">
                <Users className="w-4 h-4 text-primary" />
                {course.students}+ Enrolled
              </span>
              <span className="flex items-center gap-1.5 p-2 bg-muted/50 rounded-lg">
                <Star className="w-4 h-4 text-warning fill-warning" />
                {course.rating} Rating
              </span>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground mb-8">
              <h3 className="text-foreground font-semibold mb-2">Overview</h3>
              <p className="leading-relaxed">
                {course.description} This comprehensive program is expertly designed to provide you with the foundational knowledge and advanced techniques required to excel. Learn from industry professionals and gain hands-on experience that translates directly to your goals.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-foreground font-semibold mb-3">What You'll Learn / Features</h3>
              <div className="flex flex-wrap gap-2">
                {course.features.map((f, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1.5 border-primary/20 bg-primary/5 text-primary">
                    ✓ {f}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-3xl font-bold text-primary block md:hidden">
                ₹{course.price.toLocaleString()}
              </div>
              
              <Button onClick={handleEnrollNow} variant="hero" size="lg" className="w-full sm:w-auto md:w-full lg:w-auto gap-2 text-lg">
                <GraduationCap className="w-5 h-5" /> Enroll Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CourseDetailsModal;
