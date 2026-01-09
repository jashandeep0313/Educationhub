import { useState } from "react";
import { motion } from "framer-motion";
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
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { sampleStudents, courses, teachers, instituteInfo, Student } from "@/lib/data";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingFees = students.filter((s) => s.feeStatus === "pending" || s.feeStatus === "overdue");
  const totalRevenue = students
    .filter((s) => s.feeStatus === "paid")
    .reduce((acc, s) => acc + s.feeAmount, 0);

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getFeeStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "overdue":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  // Check for fee notifications (5 days before due)
  const getUpcomingDues = () => {
    const today = new Date();
    return students.filter((student) => {
      const dueDate = new Date(student.nextDueDate);
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 5 && diffDays > 0 && student.feeStatus !== "paid";
    });
  };

  const upcomingDues = getUpcomingDues();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold">{instituteInfo.name}</span>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {upcomingDues.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {upcomingDues.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">Admin</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Fee Due Alerts */}
        {upcomingDues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-warning/10 border border-warning/20"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning mb-1">Fee Due Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  {upcomingDues.length} student(s) have fee due within 5 days:
                  {upcomingDues.map((s) => ` ${s.name}`).join(",")}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage students, courses, teachers, and track fee payments.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <h3 className="text-sm text-muted-foreground">Total Students</h3>
                <p className="font-heading text-2xl font-bold">{students.length}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-success" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground">This Month Revenue</h3>
                <p className="font-heading text-2xl font-bold">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <Badge variant="secondary">{pendingFees.length}</Badge>
                </div>
                <h3 className="text-sm text-muted-foreground">Pending Fees</h3>
                <p className="font-heading text-2xl font-bold">
                  ₹{pendingFees.reduce((acc, s) => acc + s.feeAmount, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground">Active Courses</h3>
                <p className="font-heading text-2xl font-bold">{courses.length}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions & Students Table */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="font-heading font-semibold">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4" />
                Add New Student
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4" />
                Add New Course
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4" />
                Add Teacher
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4" />
                Schedule Class
              </Button>
            </div>

            {/* Teachers Summary */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Teachers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teachers.slice(0, 3).map((teacher) => (
                  <div key={teacher.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">{teacher.role}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View All Teachers
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Students Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>View and manage all enrolled students</CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Fee Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Due</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>
                            {new Date(student.joinDate).toLocaleDateString("en-IN")}
                          </TableCell>
                          <TableCell>₹{student.feeAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getFeeStatusColor(student.feeStatus)}>
                              {getFeeStatusIcon(student.feeStatus)}
                              <span className="ml-1 capitalize">{student.feeStatus}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(student.nextDueDate).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
