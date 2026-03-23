import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Send, UserCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If a specific course ID is passed, we know what they're enquiring about
  courseId?: string;
}

const EnquireModal = ({ isOpen, onClose, courseId }: EnquireModalProps) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    // In a real app, you would send this to your backend
    setIsSubmitted(true);
  };

  const handleEnrollNow = () => {
    if (courseId) {
      sessionStorage.setItem("pendingCourseToEnroll", courseId);
    } else {
      // If no specific course, use a generic one or just route to login
      sessionStorage.setItem("pendingCourseToEnroll", "GenEnroll"); 
    }
    onClose();
    navigate("/student-login");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card border shadow-2xl rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-bold mb-2 font-heading">Enquire Now</h2>
              <p className="text-muted-foreground mb-6">
                Have questions? Send us a message and our academic counselors will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="Enter your name" 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea 
                    placeholder="How can we help you?" 
                    rows={4} 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                  />
                </div>

                <Button type="submit" className="w-full mt-4 gap-2">
                  <Send className="w-4 h-4" /> Submit Enquiry
                </Button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 text-center"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2 font-heading">Thank You!</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Your enquiry has been received. Our team will contact you soon. 
                Would you like to fast-track your journey and enroll right now?
              </p>

              <div className="space-y-3">
                <Button onClick={handleEnrollNow} variant="hero" className="w-full gap-2 text-lg h-12">
                  <GraduationCap className="w-5 h-5" /> Yes, Enroll Now!
                </Button>
                <Button onClick={onClose} variant="ghost" className="w-full">
                  Maybe Later
                </Button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquireModal;
