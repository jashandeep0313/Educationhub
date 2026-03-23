import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, Eye, EyeOff, User, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { instituteInfo, courses } from "@/lib/data";
import { useData } from "@/context/DataContext";

const PortalLogin = () => {
  const navigate = useNavigate();
  const { login, register, updateStudent } = useData();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Forms state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    role: "student",
    teacherCode: "",
  });

  const completeEnrollmentPipeline = async (userId: string, userRole: string) => {
    const pendingCourseId = sessionStorage.getItem('pendingCourseToEnroll');
    
    if (pendingCourseId && userRole === "student") {
      const courseObj = courses.find(c => c.id === pendingCourseId);
      if (courseObj) {
        await updateStudent(userId, { 
          course: courseObj.title, 
          feeAmount: courseObj.price 
        });
        toast.success(`Successfully enrolled in ${courseObj.title}!`);
      }
      sessionStorage.removeItem('pendingCourseToEnroll');
    }

    if (userRole === "teacher") {
      navigate("/teacher-dashboard");
    } else if (userRole === "student") {
      navigate("/student-dashboard");
    } else if (userRole === "admin") {
      navigate("/admin-dashboard");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(formData.email, formData.password, formData.role);
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        await completeEnrollmentPipeline(user.id, user.role);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and selected role.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.role === "teacher" && !formData.teacherCode) {
      toast.error("Teacher Verification Code is required for faculty registration.");
      return;
    }

    setIsLoading(true);

    try {
      const pendingCourseId = sessionStorage.getItem('pendingCourseToEnroll');
      const initialCourse = (formData.role === "student" && pendingCourseId)
        ? courses.find(c => c.id === pendingCourseId)?.title 
        : "Not Enrolled";

      const newUser = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        teacherCode: formData.teacherCode,
        course: initialCourse,
      });

      if (newUser) {
        toast.success(`Registration successful! Welcome to IQ Hub, ${newUser.name}.`);
        await completeEnrollmentPipeline(newUser.id, newUser.role);
      }
    } catch (error) {
      // Error is already toasted in DataContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 py-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
            </Link>
            <CardTitle className="font-heading text-2xl">
              {isLoginView ? "Portal Login" : "Create Account"}
            </CardTitle>
            <CardDescription className="px-4">
              {isLoginView 
                ? "Access your dashboard based on your role."
                : "Join IQ Hub as a Student or Faculty member."}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* View Toggles */}
            <div className="w-full grid grid-cols-2 p-1 mb-6 bg-muted/50 rounded-lg">
              <button 
                type="button"
                className={`py-2 text-sm font-semibold rounded-md transition-all ${isLoginView ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setIsLoginView(true)}
              >
                Sign In
              </button>
              <button 
                type="button"
                className={`py-2 text-sm font-semibold rounded-md transition-all ${!isLoginView ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setIsLoginView(false)}
              >
                Register
              </button>
            </div>

            {/* Role Selection */}
            <div className="mb-6 space-y-3">
              <Label className="text-sm font-medium">Select Your Role</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "student" })}
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-4 transition-all hover:bg-accent ${
                    formData.role === "student" ? "border-primary bg-primary/5 text-primary" : "border-muted bg-popover"
                  }`}
                >
                  <User className={`mb-2 h-6 w-6 ${formData.role === "student" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "teacher" })}
                  className={`flex flex-col items-center justify-between rounded-md border-2 p-4 transition-all hover:bg-accent ${
                    formData.role === "teacher" ? "border-primary bg-primary/5 text-primary" : "border-muted bg-popover"
                  }`}
                >
                  <ShieldCheck className={`mb-2 h-6 w-6 ${formData.role === "teacher" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">Teacher</span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLoginView ? (
                <motion.form 
                   key="login"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   transition={{ duration: 0.2 }}
                   onSubmit={handleLoginSubmit} 
                   className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full shadow-md" size="lg" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : `Sign In as ${formData.role === 'teacher' ? 'Faculty' : 'Student'}`}
                  </Button>
                </motion.form>
              ) : (
                <motion.form 
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegisterSubmit} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {formData.role === "teacher" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <Label htmlFor="teacher-code" className="text-secondary-foreground font-bold">Teacher Verification Code</Label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                          id="teacher-code"
                          type="text"
                          placeholder="Enter special faculty code"
                          className="pl-10 border-primary/50 bg-primary/5"
                          value={formData.teacherCode}
                          onChange={(e) => setFormData({ ...formData, teacherCode: e.target.value })}
                          required
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Authorized faculty only.</p>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="At least 8 characters"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full shadow-md mt-6" size="lg" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : `Register as ${formData.role === 'teacher' ? 'Faculty' : 'Student'}`}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-border text-center">
               <p className="text-xs text-muted-foreground mb-2">Secure access provided by IQ Education Hub</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors flex justify-center items-center gap-2">
            ← Back to {instituteInfo.name} homepage
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default PortalLogin;
