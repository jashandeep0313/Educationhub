import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  LogOut,
  Shield,
  Bell,
  X,
  UserCheck,
  Star,
  FileText,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
// Reference to your data structure
import {
  sampleStudents,
  courses as initialCourses,
  teachers as initialTeachers,
  instituteInfo,
  Student,
} from "@/lib/data";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students] = useState<Student[]>(sampleStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [allCourses, setAllCourses] = useState(initialCourses);
  const [allTeachers, setAllTeachers] = useState(initialTeachers);
  const [viewMode, setViewMode] = useState<"students" | "courses" | "teachers">(
    "students"
  );

  // Modal States
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isViewingTeachers, setIsViewingTeachers] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Course synced! It will now appear in the Homepage Carousel."
    );
    setIsAddingCourse(false);
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Teacher profile published to IQ Education Hub!");
    setIsAddingTeacher(false);
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold">
                  {instituteInfo.name}
                </span>
                <p className="text-xs text-muted-foreground">Master Admin</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className="hidden md:flex gap-1 items-center border-primary/30 text-primary"
              >
                <Shield className="w-3 h-3" /> System Secure
              </Badge>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* WELCOME SECTION ON TOP */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-background to-accent/5 border border-primary/10 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Welcome to the <span className="text-primary">Admin Portal</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Hello Admin! Manage your students, faculty, and course catalog
              from one central hub. All changes sync in real-time with the main
              website.
            </p>
          </div>
          <Shield className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-primary/5 -rotate-12" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <Users className="w-6 h-6 text-primary mb-2" />
              <h3 className="text-sm text-muted-foreground">Total Students</h3>
              <p className="text-2xl font-bold">{students.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <BookOpen className="w-6 h-6 text-accent mb-2" />
              <h3 className="text-sm text-muted-foreground">Live Courses</h3>
              <p className="text-2xl font-bold">{allCourses.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <UserCheck className="w-6 h-6 text-success mb-2" />
              <h3 className="text-sm text-muted-foreground">Active Faculty</h3>
              <p className="text-2xl font-bold">{allTeachers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <IndianRupee className="w-6 h-6 text-warning mb-2" />
              <h3 className="text-sm text-muted-foreground">
                Revenue Tracking
              </h3>
              <p className="text-2xl font-bold">Live</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Management */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Management</h3>
            <div className="grid gap-3">
              <Button
                className={`w-full justify-start gap-2 ${
                  viewMode === "students" ? "bg-primary text-white" : ""
                }`}
                variant={viewMode === "students" ? "default" : "outline"}
                onClick={() => setViewMode("students")}
              >
                <Users className="w-4 h-4" /> See Student Details
              </Button>
              <Button
                className={`w-full justify-start gap-2 ${
                  viewMode === "courses" ? "bg-primary text-white" : ""
                }`}
                variant={viewMode === "courses" ? "default" : "outline"}
                onClick={() => setViewMode("courses")}
              >
                <BookOpen className="w-4 h-4" /> See Course Details
              </Button>
              <Button
                className={`w-full justify-start gap-2 ${
                  viewMode === "teachers" ? "bg-primary text-white" : ""
                }`}
                variant={viewMode === "teachers" ? "default" : "outline"}
                onClick={() => setViewMode("teachers")}
              >
                <UserCheck className="w-4 h-4" /> Faculty Directory
              </Button>
              <hr className="my-2 border-border" />
              <Button
                className="w-full justify-start gap-2 text-primary border-primary/20 hover:bg-primary/5"
                variant="outline"
                onClick={() => setIsAddingCourse(true)}
              >
                <Plus className="w-4 h-4" /> Add New Course
              </Button>
              <Button
                className="w-full justify-start gap-2 text-primary border-primary/20 hover:bg-primary/5"
                variant="outline"
                onClick={() => setIsAddingTeacher(true)}
              >
                <Plus className="w-4 h-4" /> Add New Teacher
              </Button>
            </div>
          </div>

          {/* Main Table Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {viewMode === "students"
                      ? "Student Records"
                      : viewMode === "courses"
                      ? "Course Catalog"
                      : "Faculty List"}
                  </CardTitle>
                  <CardDescription>
                    Managing entries for your IQ Education Hub platform.
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    {viewMode === "students" && (
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Fee Status</TableHead>
                      </TableRow>
                    )}
                    {viewMode === "courses" && (
                      <TableRow>
                        <TableHead>Course Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                      </TableRow>
                    )}
                    {viewMode === "teachers" && (
                      <TableRow>
                        <TableHead>Teacher Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Students</TableHead>
                      </TableRow>
                    )}
                  </TableHeader>
                  <TableBody>
                    {viewMode === "students" &&
                      filteredStudents.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">
                            {s.name}
                          </TableCell>
                          <TableCell>{s.course}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                s.feeStatus === "paid"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {s.feeStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    {viewMode === "courses" &&
                      allCourses.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">
                            {c.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{c.category}</Badge>
                          </TableCell>
                          <TableCell>₹{c.price.toLocaleString()}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-warning text-warning" />{" "}
                            {c.rating}
                          </TableCell>
                        </TableRow>
                      ))}
                    {viewMode === "teachers" &&
                      allTeachers.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">
                            {t.name}
                          </TableCell>
                          <TableCell>{t.role}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-primary" />{" "}
                            {t.experience}
                          </TableCell>
                          <TableCell>{t.students}+</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* MODALS remain unchanged from your existing logic */}
      <AnimatePresence>
        {(isAddingCourse || isAddingTeacher) && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setIsAddingCourse(false);
                  setIsAddingTeacher(false);
                }}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4">
                {isAddingCourse ? "Publish New Course" : "Onboard New Teacher"}
              </h2>
              <form
                className="space-y-4"
                onSubmit={
                  isAddingCourse ? handleCourseSubmit : handleTeacherSubmit
                }
              >
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label>
                      {isAddingCourse ? "Course Title" : "Full Name"}
                    </Label>
                    <Input placeholder="Enter details..." required />
                  </div>
                  <div className="space-y-1">
                    <Label>
                      {isAddingCourse ? "Category" : "Role / Designation"}
                    </Label>
                    <Input
                      placeholder="e.g. Language or IELTS Expert"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Image URL</Label>
                    <Input placeholder="https://..." required />
                  </div>
                </div>
                <Button className="w-full mt-4">Publish & Sync Homepage</Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium leading-none">{children}</label>
);

export default AdminDashboard;
