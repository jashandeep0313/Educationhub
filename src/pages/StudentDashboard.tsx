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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { sampleStudents, courses, instituteInfo } from "@/lib/data";

// Mock current student - in real app, this would come from auth context
const currentStudent = sampleStudents[1]; // Manpreet with pending fee

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<
    { id: string; message: string; type: "warning" | "info" | "success" }[]
  >([]);

  // Calculate days until fee due
  const daysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(currentStudent.nextDueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Generate fee notifications
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
    } else if (currentStudent.feeStatus === "paid") {
      newNotifications.push({
        id: "3",
        message: `Your fee for this month is paid. Next due: ${new Date(currentStudent.nextDueDate).toLocaleDateString()}`,
        type: "success" as const,
      });
    }

    setNotifications(newNotifications);
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/student-login");
  };

  const enrolledCourse = courses.find((c) => c.title === currentStudent.course) || courses[0];

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
      {/* Header */}
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {currentStudent.name}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Notifications */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 mb-8"
          >
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  notif.type === "warning"
                    ? "bg-destructive/10 text-destructive"
                    : notif.type === "success"
                    ? "bg-success/10 text-success"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {notif.type === "warning" ? (
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                ) : notif.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <Bell className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{notif.message}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {currentStudent.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your learning journey.
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
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <h3 className="text-sm text-muted-foreground">Current Course</h3>
                <p className="font-heading font-semibold">{currentStudent.course}</p>
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
                  {new Date(currentStudent.joinDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
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
                  <Badge className={getFeeStatusColor(currentStudent.feeStatus)}>
                    {getFeeStatusIcon(currentStudent.feeStatus)}
                    <span className="ml-1 capitalize">{currentStudent.feeStatus}</span>
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
                  {new Date(currentStudent.nextDueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fee Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Fee Details
                </CardTitle>
                <CardDescription>Your payment history and upcoming dues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Status */}
                  <div className="p-6 rounded-xl bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Current Month Status</h4>
                      <Badge className={getFeeStatusColor(currentStudent.feeStatus)}>
                        {getFeeStatusIcon(currentStudent.feeStatus)}
                        <span className="ml-1 capitalize">{currentStudent.feeStatus}</span>
                      </Badge>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <p className="font-semibold">₹{currentStudent.feeAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Payment:</span>
                        <p className="font-semibold">
                          {currentStudent.lastPaymentDate
                            ? new Date(currentStudent.lastPaymentDate).toLocaleDateString("en-IN")
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Due:</span>
                        <p className="font-semibold">
                          {new Date(currentStudent.nextDueDate).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                    {currentStudent.feeStatus !== "paid" && (
                      <Button className="mt-4 w-full sm:w-auto" variant="hero">
                        Pay Now
                      </Button>
                    )}
                  </div>

                  {/* Payment History */}
                  <div>
                    <h4 className="font-semibold mb-4">Recent Payments</h4>
                    <div className="space-y-3">
                      {[
                        { month: "December 2024", status: "paid", date: "01 Dec 2024" },
                        { month: "November 2024", status: "paid", date: "28 Nov 2024" },
                        { month: "October 2024", status: "paid", date: "01 Oct 2024" },
                      ].map((payment) => (
                        <div
                          key={payment.month}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            <div>
                              <p className="font-medium">{payment.month}</p>
                              <p className="text-sm text-muted-foreground">Paid on {payment.date}</p>
                            </div>
                          </div>
                          <span className="font-semibold">₹{currentStudent.feeAmount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="aspect-video rounded-xl bg-muted overflow-hidden">
                    <img
                      src={enrolledCourse.image}
                      alt={enrolledCourse.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{enrolledCourse.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {enrolledCourse.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {enrolledCourse.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
