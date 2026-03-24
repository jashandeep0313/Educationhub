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
  Eye,
  Edit,
  Trash2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import axios from "axios";
import { ImageUpload } from "@/components/ui/ImageUpload";
// Reference to your data structure
import { instituteInfo } from "@/lib/data";
import { useData } from "@/context/DataContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { courses: allCourses, teachers: allTeachers, students, blogs, addCourse, updateCourse, deleteCourse, addTeacher, updateTeacher, deleteTeacher, deleteStudent, addBlog, deleteBlog } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"students" | "courses" | "teachers" | "blogs">(
    "students"
  );

  // Modal States
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Selected Data for Viewing/Editing
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);

  // Edit Forms State
  const [editPrice, setEditPrice] = useState("");
  const [editTeacherData, setEditTeacherData] = useState<any>(null);

  // Add Forms State
  const [newCourseData, setNewCourseData] = useState({ title: "", category: "", description: "", image: "", price: "" });
  const [newTeacherData, setNewTeacherData] = useState({ name: "", role: "", image: "", phone: "", email: "", address: "", experience: "", studentsHandled: "" });
  const [newBlogData, setNewBlogData] = useState({ title: "", category: "", summary: "", image: "", achievement: false });

  // Uploaded Image Files State
  const [courseImageFile, setCourseImageFile] = useState<File | null>(null);
  const [teacherImageFile, setTeacherImageFile] = useState<File | null>(null);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Submit Handlers
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseData.title || !newCourseData.category || !newCourseData.price) {
      toast.error("Please fill in all required fields!");
      return;
    }
    
    setIsSyncing(true);
    
    try {
      let finalImageUrl = newCourseData.image || "";

      if (courseImageFile) {
        const formData = new FormData();
        formData.append("image", courseImageFile);
        const uploadRes = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        finalImageUrl = "http://localhost:5000" + uploadRes.data.url;
      }
      
      addCourse({
        title: newCourseData.title,
        category: newCourseData.category,
        description: newCourseData.description,
        image: finalImageUrl,
        price: Number(newCourseData.price) || 0,
        rating: 5.0,
        students: 0,
        duration: "Variable",
        features: []
      });
      
      toast.success("Successfully Published & Synced to Homepage!");
      setIsAddingCourse(false);
      setNewCourseData({ title: "", category: "", description: "", image: "", price: "" });
      setCourseImageFile(null);
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to publish course. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherData.name || !newTeacherData.role) {
      toast.error("Please provide both the Name and Role of the teacher!");
      return;
    }
    
    setIsSyncing(true);
    
    try {
      let finalImageUrl = newTeacherData.image || "";

      if (teacherImageFile) {
        const formData = new FormData();
        formData.append("image", teacherImageFile);
        const uploadRes = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        finalImageUrl = "http://localhost:5000" + uploadRes.data.url;
      }
      
      addTeacher({
        name: newTeacherData.name,
        role: newTeacherData.role,
        image: finalImageUrl,
        experience: newTeacherData.experience || "0 Years",
        students: Number(newTeacherData.studentsHandled) || 0,
        rating: 5.0,
        bio: "Newly onboarded faculty member.",
        phone: newTeacherData.phone || "N/A",
        email: newTeacherData.email || "N/A",
        address: newTeacherData.address || "N/A"
      });
      
      toast.success("Successfully Published & Synced to Homepage!");
      setIsAddingTeacher(false);
      setNewTeacherData({ name: "", role: "", image: "", phone: "", email: "", address: "", experience: "", studentsHandled: "" });
      setTeacherImageFile(null);
    } catch (error) {
      console.error("Error adding teacher:", error);
      toast.error("Failed to onboard teacher. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogData.title || !newBlogData.summary) {
      toast.error("Please fill in required fields!");
      return;
    }
    setIsSyncing(true);
    
    try {
      let finalImageUrl = newBlogData.image || "";

      if (blogImageFile) {
        const formData = new FormData();
        formData.append("image", blogImageFile);
        const uploadRes = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        finalImageUrl = "http://localhost:5000" + uploadRes.data.url;
      }
      
      addBlog({
        title: newBlogData.title,
        category: newBlogData.category || "General",
        summary: newBlogData.summary,
        image: finalImageUrl,
        achievement: newBlogData.achievement
      });
      toast.success("Successfully Published Blog!");
      setIsAddingBlog(false);
      setNewBlogData({ title: "", category: "", summary: "", image: "", achievement: false });
      setBlogImageFile(null);
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to publish blog.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Edit/Delete Handlers
  const handleUpdateCoursePrice = () => {
    if (!selectedCourse) return;
    setIsSyncing(true);
    setTimeout(() => {
      updateCourse(selectedCourse.id, { price: Number(editPrice) || 0 });
      setSelectedCourse({ ...selectedCourse, price: Number(editPrice) || 0 });
      toast.success("Course price updated & synced!");
      setIsSyncing(false);
    }, 600);
  };

  const handleDeleteCourse = (id: string) => {
    if(!confirm("Are you sure you want to delete this course?")) return;
    deleteCourse(id);
    toast.success("Course deleted & removed from Homepage!");
  };

  const handleDeleteStudent = (id: string) => {
    if(!confirm("Are you sure you want to delete this student?")) return;
    deleteStudent(id);
    toast.success("Student record deleted successfully!");
  };

  const handleDeleteTeacher = (id: string) => {
    if(!confirm("Are you sure you want to delete this teacher?")) return;
    deleteTeacher(id);
    toast.success("Teacher removed & synced from Homepage!");
  };

  const handleUpdateTeacher = () => {
    if (!selectedTeacher || !editTeacherData) return;
    setIsSyncing(true);
    setTimeout(() => {
      updateTeacher(selectedTeacher.id, editTeacherData);
      setSelectedTeacher({ ...selectedTeacher, ...editTeacherData });
      toast.success("Faculty details updated & synced!");
      setIsSyncing(false);
    }, 600);
  };

  const handleDeleteBlog = (id: string) => {
    if(!confirm("Are you sure you want to delete this post?")) return;
    deleteBlog(id);
    toast.success("Blog deleted successfully!");
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
              <Button
                className={`w-full justify-start gap-2 ${
                  viewMode === "blogs" ? "bg-primary text-white" : ""
                }`}
                variant={viewMode === "blogs" ? "default" : "outline"}
                onClick={() => setViewMode("blogs")}
              >
                <FileText className="w-4 h-4" /> Manage Blogs
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
              <Button
                className="w-full justify-start gap-2 text-primary border-primary/20 hover:bg-primary/5"
                variant="outline"
                onClick={() => setIsAddingBlog(true)}
              >
                <Plus className="w-4 h-4" /> Add New Blog Post
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
                      : viewMode === "teachers"
                      ? "Faculty List"
                      : "Blog Posts & Achievements"}
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
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    )}
                    {viewMode === "courses" && (
                      <TableRow>
                        <TableHead>Course Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    )}
                    {viewMode === "teachers" && (
                      <TableRow>
                        <TableHead>Teacher Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    )}
                    {viewMode === "blogs" && (
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                          <TableCell className="text-right flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(s)}>
                              <Eye className="w-4 h-4 mr-2" /> View Details
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteStudent(s.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {viewMode === "courses" &&
                      allCourses
                        .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">
                            {c.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{c.category}</Badge>
                          </TableCell>
                          <TableCell>₹{c.price.toLocaleString()}</TableCell>
                          <TableCell className="text-right flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setSelectedCourse(c); setEditPrice(c.price.toString()); }}>
                              <Edit className="w-4 h-4 mr-2" /> Details & Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteCourse(c.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {viewMode === "teachers" &&
                      allTeachers
                        .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">
                            {t.name}
                          </TableCell>
                          <TableCell>{t.role}</TableCell>
                          <TableCell>{t.students}+</TableCell>
                          <TableCell className="text-right flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setSelectedTeacher(t); setEditTeacherData({...t}); }}>
                              <Edit className="w-4 h-4 mr-2" /> Details & Edit
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteTeacher(t.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {viewMode === "blogs" &&
                      blogs
                        .filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((b) => (
                        <TableRow key={b.id}>
                          <TableCell className="font-medium max-w-[200px] truncate">
                            {b.achievement && <Award className="inline-block w-4 h-4 text-warning mr-1" />}
                            {b.title}
                          </TableCell>
                          <TableCell><Badge variant="outline">{b.category}</Badge></TableCell>
                          <TableCell>{b.date}</TableCell>
                          <TableCell className="text-right flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteBlog(b.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* NEW/EXTENDED MODALS */}
      <AnimatePresence>
        
        {/* ADD COURSE MODAL */}
        {isAddingCourse && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={() => setIsAddingCourse(false)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4">Publish New Course</h2>
              <form className="space-y-4" onSubmit={handleCourseSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label>Course Title</Label>
                    <Input required value={newCourseData.title} onChange={e => setNewCourseData({...newCourseData, title: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <Input placeholder="e.g. Language or IELTS Expert" required value={newCourseData.category} onChange={e => setNewCourseData({...newCourseData, category: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Description</Label>
                    <Textarea placeholder="Enter course details..." required value={newCourseData.description} onChange={e => setNewCourseData({...newCourseData, description: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Price (₹)</Label>
                    <Input type="number" required value={newCourseData.price} onChange={e => setNewCourseData({...newCourseData, price: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Image URL (Optional)</Label>
                    <Input placeholder="https://..." value={newCourseData.image} onChange={e => setNewCourseData({...newCourseData, image: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Or Upload Local Image</Label>
                    <ImageUpload 
                      onImageCropped={(file) => setCourseImageFile(file)} 
                      aspectRatio={16/9} 
                      label="Upload Course Image" 
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 gap-2" disabled={isSyncing}>
                  {isSyncing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Publishing & Syncing...</>
                  ) : (
                    "Publish & Sync Homepage"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

        {/* ADD TEACHER MODAL — Advanced Form */}
        {isAddingTeacher && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={() => setIsAddingTeacher(false)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-1">Onboard New Teacher</h2>
              <p className="text-sm text-muted-foreground mb-5">Fill in all faculty details. The profile will sync to the homepage automatically.</p>
              <form className="space-y-5" onSubmit={handleTeacherSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Full Name *</Label>
                    <Input placeholder="e.g. Vikrant Rana" required value={newTeacherData.name} onChange={e => setNewTeacherData({...newTeacherData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Role / Designation *</Label>
                    <Input placeholder="e.g. IELTS Expert" required value={newTeacherData.role} onChange={e => setNewTeacherData({...newTeacherData, role: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone Number</Label>
                    <Input placeholder="+91 98765 43210" type="tel" value={newTeacherData.phone} onChange={e => setNewTeacherData({...newTeacherData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input placeholder="teacher@iqeducationhub.com" type="email" value={newTeacherData.email} onChange={e => setNewTeacherData({...newTeacherData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label>Address</Label>
                    <Input placeholder="City, State" value={newTeacherData.address} onChange={e => setNewTeacherData({...newTeacherData, address: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Experience</Label>
                    <Input placeholder="e.g. 5+ Years" value={newTeacherData.experience} onChange={e => setNewTeacherData({...newTeacherData, experience: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Students Handled</Label>
                    <Input type="number" placeholder="0" value={newTeacherData.studentsHandled} onChange={e => setNewTeacherData({...newTeacherData, studentsHandled: e.target.value})} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label>Profile Image URL (Optional)</Label>
                    <Input placeholder="https://..." value={newTeacherData.image} onChange={e => setNewTeacherData({...newTeacherData, image: e.target.value})} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Or Upload Local Image</Label>
                    <ImageUpload 
                      onImageCropped={(file) => setTeacherImageFile(file)} 
                      aspectRatio={1} 
                      label="Upload Faculty Picture" 
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 gap-2" disabled={isSyncing}>
                  {isSyncing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Publishing & Syncing...</>
                  ) : (
                    "Publish & Sync Homepage"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

        {/* STUDENT DETAILS MODAL */}
        {selectedStudent && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-md w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={() => setSelectedStudent(null)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-6">Student Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Full Name</span>
                  <div className="font-medium text-base">{selectedStudent.name}</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Phone Number</span>
                  <div className="font-medium">{selectedStudent.phone}</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Email</span>
                  <div className="font-medium">{selectedStudent.email}</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Address</span>
                  <div className="font-medium">{selectedStudent.address || "N/A"}</div>
                </div>
                <hr className="my-2 border-border" />
                <div>
                  <span className="text-muted-foreground block mb-1">Enrolled Course</span>
                  <div className="font-medium">{selectedStudent.course}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground block mb-1">Fee Status</span>
                    <Badge variant={selectedStudent.feeStatus === "paid" ? "default" : "destructive"}>
                      {selectedStudent.feeStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground block mb-1">Fee Amount</span>
                    <div className="font-medium">₹{selectedStudent.feeAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* COURSE DETAILS & EDIT MODAL */}
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={() => setSelectedCourse(null)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-6">Course Administration</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Title</span>
                  <div className="font-medium text-base">{selectedCourse.title}</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Category</span>
                  <div className="font-medium">{selectedCourse.category}</div>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Description</span>
                  <div className="font-medium text-muted-foreground">{selectedCourse.description}</div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="font-semibold text-primary mb-3">Admin Controls</h3>
                  <div className="space-y-3">
                    <Label>Update Price (₹)</Label>
                    <div className="flex gap-3">
                      <Input 
                        type="number" 
                        value={editPrice} 
                        onChange={(e) => setEditPrice(e.target.value)} 
                      />
                      <Button onClick={handleUpdateCoursePrice} disabled={isSyncing}>
                        {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Price"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* TEACHER DETAILS & EDIT MODAL */}
        {selectedTeacher && editTeacherData && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={() => setSelectedTeacher(null)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-6">Faculty Management</h2>
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input value={editTeacherData.name} onChange={e => setEditTeacherData({...editTeacherData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Role</Label>
                    <Input value={editTeacherData.role} onChange={e => setEditTeacherData({...editTeacherData, role: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone Number</Label>
                    <Input value={editTeacherData.phone || ""} onChange={e => setEditTeacherData({...editTeacherData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input value={editTeacherData.email || ""} onChange={e => setEditTeacherData({...editTeacherData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label>Address</Label>
                    <Input value={editTeacherData.address || ""} onChange={e => setEditTeacherData({...editTeacherData, address: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Experience</Label>
                    <Input value={editTeacherData.experience} onChange={e => setEditTeacherData({...editTeacherData, experience: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Students Handled</Label>
                    <Input type="number" value={editTeacherData.students} onChange={e => setEditTeacherData({...editTeacherData, students: Number(e.target.value)})} />
                  </div>
                </div>
                <Button className="w-full mt-2" onClick={handleUpdateTeacher} disabled={isSyncing}>
                  {isSyncing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ADD BLOG MODAL */}
        {isAddingBlog && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border shadow-2xl rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={() => setIsAddingBlog(false)}>
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4">Publish New Blog Post</h2>
              <form className="space-y-4" onSubmit={handleBlogSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label>Blog Title *</Label>
                    <Input required value={newBlogData.title} onChange={e => setNewBlogData({...newBlogData, title: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <Input placeholder="e.g. Tips, News, Success Story" required value={newBlogData.category} onChange={e => setNewBlogData({...newBlogData, category: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Summary / Content *</Label>
                    <Textarea placeholder="Enter blog content summary..." required value={newBlogData.summary} onChange={e => setNewBlogData({...newBlogData, summary: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <Label>Cover Image URL (Optional)</Label>
                    <Input placeholder="https://..." value={newBlogData.image} onChange={e => setNewBlogData({...newBlogData, image: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Or Upload Local Image</Label>
                    <ImageUpload 
                      onImageCropped={(file) => setBlogImageFile(file)} 
                      aspectRatio={16/9} 
                      label="Upload Blog Cover" 
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="checkbox" 
                      id="achievementCheck"
                      checked={newBlogData.achievement}
                      onChange={e => setNewBlogData({...newBlogData, achievement: e.target.checked})}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <Label>Mark this post as an Achievement (will display special badges)</Label>
                  </div>
                </div>
                <Button className="w-full mt-4 gap-2" disabled={isSyncing}>
                  {isSyncing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
                  ) : (
                    "Publish Blog Post"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}

      </AnimatePresence>
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium leading-none mb-1 inline-block text-muted-foreground">{children}</label>
);

export default AdminDashboard;
