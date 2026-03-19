// Course data
export const courses = [
  {
    id: "1",
    title: "IELTS/PTE Preparation",
    description: "Comprehensive coaching for IELTS & PTE exams with expert trainers and proven strategies for band 7+.",
    image: "https://as1.ftcdn.net/v2/jpg/05/74/89/40/1000_F_574894019_FMqo4TOH4b37PBL5ySjmedQWKE1NBPJ3.jpg",
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
    image: "http://www.7oceans.in/img/visa-guid.jpg",
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
    image: "https://www.khskillacademy.in/wp-content/uploads/2020/02/SP-b3x2-v0.1.png",
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
    image: "https://cdn.vysokeskoly.cz/czech-universities/uploads/2020/08/czech_University_Students.jpg",
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
    name: "Vikrant Rana",
    role: "IELTS Expert",
    image: "/images/vikrant.jpg",
    experience: "10+ Years",
    students: 500,
    rating: 4.9,
    bio: "Certified IELTS trainer with expertise in all four modules.",
    phone: "+91 98765 43220",
    email: "vikrant@iqeducationhub.com",
    address: "Sector 10, Chandigarh",
  },
  {
    id: "2",
    name: "Kashmir Singh",
    role: "Visa Consultant",
    image: "/images/kashmir.jpg",
    experience: "10+ Years",
    students: 1000,
    rating: 4.9,
    bio: "Immigration expert with successful visa applications worldwide.",
    phone: "+91 98765 43221",
    email: "kashmir@iqeducationhub.com",
    address: "Phase 3, Mohali",
  },
  {
    id: "3",
    name: "jashan Singh",
    role: "English Faculty",
    image: "/images/jashan.jpg",
    experience: "6+ Years",
    students: 300,
    rating: 4.7,
    bio: "Dynamic teacher specializing in spoken English and communication.",
    phone: "+91 98765 43222",
    email: "jashan.faculty@iqeducationhub.com",
    address: "Dera Bassi, Punjab",
  },
  {
    id: "4",
    name: "Mrs. Sunita Verma",
    role: "Academic Head",
    image: "/images/woman.jpg",
    experience: "15+ Years",
    students: 800,
    rating: 4.9,
    bio: "Senior educator with expertise in CBSE curriculum and board preparation.",
    phone: "+91 98765 43223",
    email: "sunita@iqeducationhub.com",
    address: "Zirakpur, Punjab",
  },
];

// Achievements/Reviews
export const achievements = [
  {
    id: "1",
    type: "video",
    title: "Success Story",
    thumbnail: "/images/sstory.jpg",
    videoUrl: "https://www.instagram.com/p/CxdDax7PhHj/",
    description: "Achieved IELTS band 8.0 in just 2 months of preparation.",
  },
  {
    id: "2",
    type: "video",
    title: "Canada Study Visa Approved",
    thumbnail: "/images/IQ education Hub.jpg",
    videoUrl: "https://www.instagram.com/iq.the.education.hub/reels/",
    description: "Successfully received Canada study visa for University of Toronto.",
  },
  {
    id: "3",
    type: "review",
    student: "Harjot Singh",
    rating: 5,
    review: "IQ Education Hub transformed my English skills. The teachers are incredibly supportive and the study material is excellent.",
    course: "IELTS Preparation",
    image: "/images/jashan reva.jpg",
  },
  {
    id: "4",
    type: "review",
    student: "Simran Kaur",
    rating: 5,
    review: "Best coaching institute for visa guidance. They handled everything from documentation to interview prep perfectly.",
    course: "Study Visa",
    image: "/images/LinkedIn.jpg",
  },
  {
    id: "5",
    type: "review",
    student: "Rajveer Brar",
    rating: 5,
    review: "My child scored 95% in board exams thanks to the dedicated faculty here. Highly recommended!",
    course: "10th Board Prep",
    image: "/images/photo.jpg",
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
  image: string;
  phone: string;
  course: string;
  joinDate: string;
  feeAmount: number;
  feeStatus: "paid" | "pending" | "overdue";
  lastPaymentDate: string | null;
  nextDueDate: string;
  address?: string;
}

export const sampleStudents: Student[] = [
  {
    id: "STU001",
    name: "Gurpreet Singh",
    email: "gurpreet@email.com",
    image: "/images/gurpreet.jpg",
    phone: "+91 98765 43210",
    course: "IELTS Preparation",
    joinDate: "2024-01-15",
    feeAmount: 15000,
    feeStatus: "paid",
    lastPaymentDate: "2025-01-01",
    nextDueDate: "2025-02-01",
    address: "Zirakpur, Punjab",
  },
  {
    id: "STU002",
    name: "jashan Singh",
    email: "jashan@email.com",
    image: "/images/photo.jpg",
    phone: "+91 98765 43211",
    course: "Study Visa Guidance",
    joinDate: "2024-02-20",
    feeAmount: 5000,
    feeStatus: "pending",
    lastPaymentDate: "2024-12-01",
    nextDueDate: "2025-01-10",
    address: "Dera Bassi, Punjab",
  },
  {
    id: "STU003",
    name: "Harjot Singh",
    email: "harjot@email.com",
    image: "/images/harjot.jpg",
    phone: "+91 98765 43212",
    course: "Spoken English",
    joinDate: "2024-03-10",
    feeAmount: 8000,
    feeStatus: "overdue",
    lastPaymentDate: "2024-11-15",
    nextDueDate: "2024-12-15",
    address: "Ambala City, Haryana",
  },
];

// Blog posts
export const blogPosts = [
  {
    id: "1",
    title: "How to Achieve Band 7+ in IELTS: Expert Tips",
    summary: "Discover proven strategies from our certified IELTS trainers to push your band score beyond 7 with targeted practice and smart study habits.",
    date: "March 10, 2026",
    category: "IELTS",
    image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?w=600&h=400&fit=crop",
    slug: "ielts-band-7-tips",
  },
  {
    id: "2",
    title: "Canada Study Visa 2026: Complete Process Guide",
    summary: "A step-by-step walkthrough of everything you need — from university selection and required documents to SOP writing and visa interview preparation.",
    date: "February 28, 2026",
    category: "Visa",
    image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?w=600&h=400&fit=crop",
    slug: "canada-study-visa-2026",
  },
  {
    id: "3",
    title: "5 Common Spoken English Mistakes and How to Fix Them",
    summary: "Indian students often make the same grammatical and pronunciation slip-ups. Our English faculty breaks down each mistake and gives you simple, practical fixes.",
    date: "February 15, 2026",
    category: "English",
    image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?w=600&h=400&fit=crop",
    slug: "spoken-english-mistakes",
  },
  {
    id: "4",
    title: "Board Exam Preparation: A Month-by-Month Plan",
    summary: "Structured study schedule for Class 10 and 12 students. Learn how to manage time, revise effectively, and walk into the exam hall with confidence.",
    date: "January 30, 2026",
    category: "Academic",
    image: "https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg?w=600&h=400&fit=crop",
    slug: "board-exam-preparation",
  },
  {
    id: "5",
    title: "PTE vs IELTS: Which Exam Should You Take?",
    summary: "Both tests open doors abroad, but they suit different learners. We compare format, scoring, acceptance, and cost so you can make the right choice.",
    date: "January 12, 2026",
    category: "IELTS",
    image: "https://images.pexels.com/photos/3755760/pexels-photo-3755760.jpeg?w=600&h=400&fit=crop",
    slug: "pte-vs-ielts",
  },
];

// Institute info
export const instituteInfo = {
  name: "IQ Education Hub",
  tagline: "Unlock Your Potential",
  license: "GOVT APPROVED LIC# 535/I.C.",
  address: "Dera Bassi, Near Chandigarh, Punjab 140507",
  phone: "+91 82830 24818",
  email: "info@iqeducationhub.com",
  instagram: "https://www.instagram.com/iq.the.education.hub/",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.0000000000005!2d76.8!3d30.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDQyJzAwLjAiTiA3NsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  workingHours: "Mon-Sat: 9:00 AM - 7:00 PM",
};
