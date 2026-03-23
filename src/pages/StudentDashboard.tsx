import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  CreditCard,
  Bell,
  Calendar,
  User,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Clock,
  IndianRupee,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
// LINKED DATA: Importing your 1st code exports
import { instituteInfo, courses } from "@/lib/data";
import { useData } from "@/context/DataContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, students, logout, isLoading, isError, refreshData } = useData();
  
  const currentStudent = students.find((s) => s.id === currentUser?.id);

  useEffect(() => {
    if (!currentUser || currentUser.role !== "student" || !currentStudent) {
      if (!currentUser) navigate("/portal-login");
    }
  }, [currentUser, navigate, currentStudent]);

  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: "warning" | "info" | "success" }[]
  >([]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/portal-login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-pulse">
           <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
           <p className="text-muted-foreground">Loading Student Portal...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle>Connection Error</CardTitle>
            <CardDescription>
              We couldn't connect to the server. Please check if the backend is running and try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button onClick={() => refreshData()} className="gap-2">
              <Clock className="w-4 h-4" /> Retry Connection
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-warning" />
            </div>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>
              We couldn't find a student profile associated with your account ({currentUser?.email}).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              If you just registered, please wait a moment or try refreshing. If the problem persists, contact support.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => refreshData()} variant="outline">
                Refresh Data
              </Button>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Find the specific course details from the courses array
  const courseDetails = courses.find((c) => c.title === currentStudent.course);

  const daysUntilDue = () => {
    if (!currentStudent.nextDueDate) return 0;
    const today = new Date();
    const dueDate = new Date(currentStudent.nextDueDate);
    if (isNaN(dueDate.getTime())) return 0;
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    const days = daysUntilDue();
    const newNotifications = [];
    if (currentStudent.feeStatus === "overdue") {
      newNotifications.push({
        id: "1",
        message: `Your fee payment is overdue! Please pay ₹${currentStudent.feeAmount.toLocaleString()} immediately.`,
        type: "warning" as const,
      });
    } else if (days <= 5 && days > 0) {
      newNotifications.push({
        id: "2",
        message: `Fee payment reminder: ₹${currentStudent.feeAmount.toLocaleString()} due in ${days} days.`,
        type: "info" as const,
      });
    } else if (currentStudent.feeStatus === "paid" && currentStudent.nextDueDate) {
      newNotifications.push({
        id: "3",
        message: `Your fee for this month is paid. Next due: ${new Date(
          currentStudent.nextDueDate
        ).toLocaleDateString()}`,
        type: "success" as const,
      });
    }
    setNotifications(newNotifications);
  }, [currentStudent]);

  // handleLogout moved up to fix scoping

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
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

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
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Image & Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-card border border-border shadow-sm"
        >
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary/20 overflow-hidden bg-muted">
              <img
                // LINKED: Using currentStudent.image from your 1st code
                src={currentStudent.image}
                alt={currentStudent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-1 right-1 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"></button>
          </div>

          <div className="text-center md:text-left">
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">
              Welcome back, {currentStudent.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground font-medium mb-2">
              ID: {currentStudent.id} | {currentStudent.course}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {courseDetails?.duration || "N/A Duration"}
              </Badge>
              <Badge variant="outline" className="border-border">
                {currentStudent.phone}
              </Badge>
              <Badge variant="outline" className="border-border">
                {currentStudent.email}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* ... Cards for Current Course, Join Date, Monthly Fee, and Next Due Date remain the same ... */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <h3 className="text-sm text-muted-foreground">
                  Current Course
                </h3>
                <p className="font-heading font-semibold">
                  {currentStudent.course}
                </p>
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
                    <Calendar className="w-6 h-6 text-success" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground">Join Date</h3>
                <p className="font-heading font-semibold">
                  {new Date(currentStudent.joinDate).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short", year: "numeric" }
                  )}
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
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-accent" />
                  </div>
                  <Badge
                    className={getFeeStatusColor(currentStudent.feeStatus)}
                  >
                    {getFeeStatusIcon(currentStudent.feeStatus)}
                    <span className="ml-1 capitalize">
                      {currentStudent.feeStatus}
                    </span>
                  </Badge>
                </div>
                <h3 className="text-sm text-muted-foreground">Monthly Fee</h3>
                <p className="font-heading font-semibold">
                  ₹{currentStudent.feeAmount.toLocaleString()}
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
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                </div>
                <h3 className="text-sm text-muted-foreground">Next Due Date</h3>
                <p className="font-heading font-semibold">
                  {new Date(currentStudent.nextDueDate).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short", year: "numeric" }
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fee Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Fee Details
              </CardTitle>
              <CardDescription>
                Your payment history for the academic year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Current Month Status</h4>
                    <Badge
                      className={getFeeStatusColor(currentStudent.feeStatus)}
                    >
                      {getFeeStatusIcon(currentStudent.feeStatus)}
                      <span className="ml-1 capitalize">
                        {currentStudent.feeStatus}
                      </span>
                    </Badge>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Amount:</span>
                      <p className="font-semibold">
                        ₹{currentStudent.feeAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Last Payment:
                      </span>
                      <p className="font-semibold">
                        {currentStudent.lastPaymentDate
                          ? new Date(
                              currentStudent.lastPaymentDate
                            ).toLocaleDateString("en-IN")
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Due:</span>
                      <p className="font-semibold">
                        {new Date(
                          currentStudent.nextDueDate
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Recent Payments</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { month: "December 2024", date: "01 Dec 2024" },
                      { month: "November 2024", date: "28 Nov 2024" },
                      { month: "October 2024", date: "01 Oct 2024" },
                    ].map((payment) => (
                      <div
                        key={payment.month}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          <div>
                            <p className="font-medium">{payment.month}</p>
                            <p className="text-sm text-muted-foreground">
                              Paid on {payment.date}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          ₹{currentStudent.feeAmount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
