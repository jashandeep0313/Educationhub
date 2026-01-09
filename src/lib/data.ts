// Course data
export const courses = [
  {
    id: "1",
    title: "IELTS/PTE Preparation",
    description: "Comprehensive coaching for IELTS & PTE exams with expert trainers and proven strategies for band 7+.",
    image: "/placeholder.svg",
    duration: "3 Months",
    students: 250,
    rating: 4.9,
    price: 15000,
    category: "Language",
    features: ["Online Available", "Mock Tests", "Personal Mentoring"],
  },
  {
    id: "2",
    title: "Study Visa Guidance",
    description: "Complete guidance for Study Visa, Spouse Visa, Tourist Visa & PR applications with 95% success rate.",
    image: "/placeholder.svg",
    duration: "Consultation",
    students: 500,
    rating: 4.8,
    price: 5000,
    category: "Visa",
    features: ["Document Assistance", "Interview Prep", "University Selection"],
  },
  {
    id: "3",
    title: "Spoken English",
    description: "Master spoken English with our interactive classes. Build confidence and fluency in real conversations.",
    image: "/placeholder.svg",
    duration: "2 Months",
    students: 180,
    rating: 4.7,
    price: 8000,
    category: "Language",
    features: ["Online Available", "Group Sessions", "Daily Practice"],
  },
  {
    id: "4",
    title: "8th to 12th Classes",
    description: "Expert coaching for 8th to 12th standard students. All subjects covered with focus on board exams.",
    image: "/placeholder.svg",
    duration: "1 Year",
    students: 120,
    rating: 4.9,
    price: 20000,
    category: "Academic",
    features: ["All Subjects", "Doubt Sessions", "Test Series"],
  },
];

// Teacher data
export const teachers = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    role: "IELTS Expert",
    image: "/placeholder.svg",
    experience: "10+ Years",
    students: 500,
    rating: 4.9,
    bio: "Certified IELTS trainer with expertise in all four modules.",
  },
  {
    id: "2",
    name: "Ms. Priya Sharma",
    role: "Visa Consultant",
    image: "/placeholder.svg",
    experience: "8+ Years",
    students: 1000,
    rating: 4.8,
    bio: "Immigration expert with successful visa applications worldwide.",
  },
  {
    id: "3",
    name: "Mr. Amit Singh",
    role: "English Faculty",
    image: "/placeholder.svg",
    experience: "6+ Years",
    students: 300,
    rating: 4.7,
    bio: "Dynamic teacher specializing in spoken English and communication.",
  },
  {
    id: "4",
    name: "Mrs. Sunita Verma",
    role: "Academic Head",
    image: "/placeholder.svg",
    experience: "15+ Years",
    students: 800,
    rating: 4.9,
    bio: "Senior educator with expertise in CBSE curriculum and board preparation.",
  },
];

// Achievements/Reviews
export const achievements = [
  {
    id: "1",
    type: "video",
    title: "Band 8.0 Success Story",
    student: "Gurpreet Singh",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Achieved IELTS band 8.0 in just 2 months of preparation.",
  },
  {
    id: "2",
    type: "video",
    title: "Canada Study Visa Approved",
    student: "Manpreet Kaur",
    thumbnail: "/placeholder.svg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Successfully received Canada study visa for University of Toronto.",
  },
  {
    id: "3",
    type: "review",
    student: "Harjot Singh",
    rating: 5,
    review: "IQ Education Hub transformed my English skills. The teachers are incredibly supportive and the study material is excellent.",
    course: "IELTS Preparation",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    type: "review",
    student: "Simran Kaur",
    rating: 5,
    review: "Best coaching institute for visa guidance. They handled everything from documentation to interview prep perfectly.",
    course: "Study Visa",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    type: "review",
    student: "Rajveer Brar",
    rating: 5,
    review: "My child scored 95% in board exams thanks to the dedicated faculty here. Highly recommended!",
    course: "10th Board Prep",
    image: "/placeholder.svg",
  },
];

// Stats
export const stats = [
  { label: "Happy Students", value: 2500, suffix: "+" },
  { label: "Success Rate", value: 95, suffix: "%" },
  { label: "Expert Teachers", value: 15, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
];

// Sample student data for dashboard
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  joinDate: string;
  feeAmount: number;
  feeStatus: "paid" | "pending" | "overdue";
  lastPaymentDate: string | null;
  nextDueDate: string;
}

export const sampleStudents: Student[] = [
  {
    id: "STU001",
    name: "Gurpreet Singh",
    email: "gurpreet@email.com",
    phone: "+91 98765 43210",
    course: "IELTS Preparation",
    joinDate: "2024-01-15",
    feeAmount: 15000,
    feeStatus: "paid",
    lastPaymentDate: "2025-01-01",
    nextDueDate: "2025-02-01",
  },
  {
    id: "STU002",
    name: "Manpreet Kaur",
    email: "manpreet@email.com",
    phone: "+91 98765 43211",
    course: "Study Visa Guidance",
    joinDate: "2024-02-20",
    feeAmount: 5000,
    feeStatus: "pending",
    lastPaymentDate: "2024-12-01",
    nextDueDate: "2025-01-10",
  },
  {
    id: "STU003",
    name: "Harjot Singh",
    email: "harjot@email.com",
    phone: "+91 98765 43212",
    course: "Spoken English",
    joinDate: "2024-03-10",
    feeAmount: 8000,
    feeStatus: "overdue",
    lastPaymentDate: "2024-11-15",
    nextDueDate: "2024-12-15",
  },
];

// Institute info
export const instituteInfo = {
  name: "IQ Education Hub",
  tagline: "Unlock Your Potential",
  license: "GOVT APPROVED LIC# 535/I.C.",
  address: "123 Main Street, Sector 17, Chandigarh, Punjab 160017",
  phone: "+91 98765 43210",
  email: "info@iqeducationhub.com",
  instagram: "https://www.instagram.com/iq.the.education.hub/",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0000000000005!2d76.8!3d30.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzAwLjAiTiA3NsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  workingHours: "Mon-Sat: 9:00 AM - 7:00 PM",
};
