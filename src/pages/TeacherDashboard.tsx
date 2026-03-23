import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Users, Star, LogOut, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { instituteInfo } from "@/lib/data";
import { useData } from "@/context/DataContext";

const TeacherDashboard = () => {
  const { currentUser, teachers, logout } = useData();
  const navigate = useNavigate();

  const currentTeacher = teachers.find(t => t.email === currentUser?.email);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "teacher" || !currentTeacher) {
      if (!currentUser) navigate("/portal-login");
    }
  }, [currentUser, navigate, currentTeacher]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/portal-login");
  };

  if (!currentTeacher) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold hidden sm:inline">
                {instituteInfo.name}
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-card border border-border shadow-sm"
        >
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary/20 overflow-hidden bg-muted">
              <img
                src={currentTeacher.image}
                alt={currentTeacher.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">
              Welcome back, {currentTeacher.name.split(" ")[0]}! 📚
            </h1>
            <p className="text-muted-foreground font-medium mb-2">
              Faculty ID: {currentTeacher.id} | {currentTeacher.role}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {currentTeacher.experience}
              </Badge>
              <Badge variant="outline" className="border-border">
                {currentTeacher.email || "No Email"}
              </Badge>
              <Badge variant="outline" className="border-border">
                {currentTeacher.phone || "No Phone"}
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <h3 className="text-sm text-muted-foreground">Department / Role</h3>
                <p className="font-heading font-semibold">{currentTeacher.role}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-success" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground">Students Mentored</h3>
                <p className="font-heading font-semibold">{currentTeacher.students}+ Enrolled</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-warning" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground">Average Rating</h3>
                <p className="font-heading font-semibold">{currentTeacher.rating} / 5.0</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default TeacherDashboard;
