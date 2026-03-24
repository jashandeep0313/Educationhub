import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Student } from "@/lib/data";

const API_URL = "http://localhost:5000/api";

// ── Types ───────────────────────────────────────────────────────
export interface Course {
  id: string;
  _id?: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  category: string;
  features: string[];
}

export interface Teacher {
  id: string;
  _id?: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  students: number;
  rating: number;
  bio: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface Blog {
  id: string;
  _id?: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  slug?: string;
  achievement?: boolean;
}

export interface User {
  id: string;
  email: string;
  role: "student" | "teacher" | "admin";
  name: string;
}

interface DataContextType {
  currentUser: User | null;
  login: (email: string, password?: string, role?: string) => Promise<User | null>;
  logout: () => void;
  courses: Course[];
  teachers: Teacher[];
  students: Student[];
  blogs: Blog[];
  isLoading: boolean;
  isError: boolean;
  refreshData: () => Promise<void>;
  addCourse: (course: Omit<Course, "id">) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addTeacher: (teacher: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  register: (userData: any) => Promise<User | null>;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addBlog: (blog: Omit<Blog, "id" | "date" | "slug">) => void;
  deleteBlog: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to normalize MongoDB _id to React id
const normalizeData = (dataArray: any[]) => {
  return dataArray.map(item => ({ ...item, id: item._id }));
};

// ── Provider ────────────────────────────────────────────────────
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("iq_hub_user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    // 1. Check for cached data (Stale-While-Revalidate pattern for better latency)
    const cachedCourses = sessionStorage.getItem("iq_courses");
    const cachedTeachers = sessionStorage.getItem("iq_teachers");
    const cachedBlogs = sessionStorage.getItem("iq_blogs");
    const cachedStudents = sessionStorage.getItem("iq_students");
    
    let hasCache = false;

    if (cachedCourses && cachedTeachers && cachedBlogs && cachedStudents) {
      setCourses(JSON.parse(cachedCourses));
      setTeachers(JSON.parse(cachedTeachers));
      setBlogs(JSON.parse(cachedBlogs));
      setStudents(JSON.parse(cachedStudents));
      setIsLoading(false);
      setIsError(false);
      hasCache = true;
    } else {
      setIsLoading(true);
    }

    try {
      // 2. Fetch fresh data in the background
      const [courseRes, teacherRes, blogRes, studentRes] = await Promise.all([
        axios.get(`${API_URL}/courses`),
        axios.get(`${API_URL}/teachers`),
        axios.get(`${API_URL}/blogs`),
        axios.get(`${API_URL}/students`)
      ]);
      
      const freshCourses = normalizeData(courseRes.data);
      const freshTeachers = normalizeData(teacherRes.data);
      const freshBlogs = normalizeData(blogRes.data);
      const freshStudents = normalizeData(studentRes.data);

      setCourses(freshCourses);
      setTeachers(freshTeachers);
      setBlogs(freshBlogs);
      setStudents(freshStudents);
      
      // Update Cache
      sessionStorage.setItem("iq_courses", JSON.stringify(freshCourses));
      sessionStorage.setItem("iq_teachers", JSON.stringify(freshTeachers));
      sessionStorage.setItem("iq_blogs", JSON.stringify(freshBlogs));
      sessionStorage.setItem("iq_students", JSON.stringify(freshStudents));
      
      setIsError(false);
    } catch (error) {
      console.error("Failed to fetch Node API data:", error);
      if (!hasCache) setIsError(true); // Only show error state if we have no cached data
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial data from Backend
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Persist CurrentUser Login locally so refresh doesn't drop auth
  useEffect(() => { 
    if (currentUser) localStorage.setItem("iq_hub_user", JSON.stringify(currentUser));
    else localStorage.removeItem("iq_hub_user");
  }, [currentUser]);

  // ── Auth Logic ─────────────────────────────────────────────
  const login = useCallback(async (email: string, password?: string, role: string = "student") => {
    if (email === "admin@iqeducationhub.com" && password === "admin123") {
      const user: User = { id: "admin-1", email, role: "admin", name: "Master Admin" };
      setCurrentUser(user);
      return user;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password, role });
      const userData = res.data;
      const user: User = { id: userData._id || userData.id, email: userData.email, role: userData.role, name: userData.name };
      setCurrentUser(user);
      return user;
    } catch (e) {
      toast.error("Invalid credentials or server error");
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // ── Course CRUD (REST) ──────────────────────────────────────
  const addCourse = useCallback(async (course: Omit<Course, "id">) => {
    try {
      const res = await axios.post(`${API_URL}/courses`, course);
      setCourses(prev => [...prev, { ...res.data, id: res.data._id }]);
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  const updateCourse = useCallback(async (id: string, updates: Partial<Course>) => {
    try {
      await axios.put(`${API_URL}/courses/${id}`, updates);
      setCourses(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  const deleteCourse = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  // ── Teacher CRUD (REST) ──────────────────────────────────────
  const addTeacher = useCallback(async (teacher: Omit<Teacher, "id">) => {
    try {
      const res = await axios.post(`${API_URL}/teachers`, teacher);
      setTeachers(prev => [...prev, { ...res.data, id: res.data._id }]);
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  const updateTeacher = useCallback(async (id: string, updates: Partial<Teacher>) => {
    try {
      await axios.put(`${API_URL}/teachers/${id}`, updates);
      setTeachers(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  const deleteTeacher = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/teachers/${id}`);
      setTeachers(prev => prev.filter(t => t.id !== id));
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  // ── Blog CRUD (REST) ─────────────────────────────────────────
  const addBlog = useCallback(async (blog: Omit<Blog, "id" | "date" | "slug">) => {
    try {
      const res = await axios.post(`${API_URL}/blogs`, blog);
      setBlogs(prev => [{ ...res.data, id: res.data._id }, ...prev]);
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (e) { toast.error("Database connection failed!"); }
  }, []);

  // ── Registration CRUD ─────────────────────────────────
  const register = useCallback(async (userData: any) => {
    try {
      // Register via Auth endpoint
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      const registeredUser = res.data;
      
      // Refresh all data to ensure new user shows up in Admin dashboard
      await fetchData();

      const user: User = { 
        id: registeredUser._id || registeredUser.id, 
        email: registeredUser.email, 
        role: registeredUser.role, 
        name: registeredUser.name 
      };
      
      setCurrentUser(user);
      return user;
    } catch (e: any) {
      const errorMsg = e.response?.data?.message || "Registration failed!";
      toast.error(errorMsg);
      return null;
    }
  }, [fetchData]);

  const updateStudent = useCallback(async (id: string, updates: Partial<Student>) => {
    try {
      await axios.put(`${API_URL}/students/${id}`, updates);
      setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    } catch (e) { toast.error("Update failed!"); }
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (e) { toast.error("Delete failed!"); }
  }, []);

  return (
    <DataContext.Provider
      value={{
        currentUser, login, logout,
        courses, teachers, students, blogs,
        isLoading, isError, refreshData: fetchData,
        addCourse, updateCourse, deleteCourse,
        addTeacher, updateTeacher, deleteTeacher,
        register, updateStudent, deleteStudent,
        addBlog, deleteBlog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a <DataProvider>");
  return ctx;
};
