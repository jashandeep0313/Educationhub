import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  courses as defaultCourses,
  teachers as defaultTeachers,
  sampleStudents as defaultStudents,
  Student,
} from "@/lib/data";

// ── Types ───────────────────────────────────────────────────────
export interface Course {
  id: string;
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

interface DataContextType {
  // Data
  courses: Course[];
  teachers: Teacher[];
  students: Student[];

  // Course CRUD
  addCourse: (course: Omit<Course, "id">) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Teacher CRUD
  addTeacher: (teacher: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Student CRUD
  deleteStudent: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// ── Local‑Storage Helpers ───────────────────────────────────────
const STORAGE_KEYS = {
  courses: "iq_hub_courses",
  teachers: "iq_hub_teachers",
  students: "iq_hub_students",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ── Provider ────────────────────────────────────────────────────
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(() =>
    loadFromStorage(STORAGE_KEYS.courses, defaultCourses as Course[])
  );
  const [teachers, setTeachers] = useState<Teacher[]>(() =>
    loadFromStorage(STORAGE_KEYS.teachers, defaultTeachers as Teacher[])
  );
  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage(STORAGE_KEYS.students, defaultStudents)
  );

  // Persist on every change
  useEffect(() => { saveToStorage(STORAGE_KEYS.courses, courses); }, [courses]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.teachers, teachers); }, [teachers]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.students, students); }, [students]);

  // ── Course CRUD ─────────────────────────────────────────────
  const addCourse = useCallback((course: Omit<Course, "id">) => {
    const newCourse: Course = { ...course, id: crypto.randomUUID() };
    setCourses((prev) => [...prev, newCourse]);
  }, []);

  const updateCourse = useCallback((id: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // ── Teacher CRUD ────────────────────────────────────────────
  const addTeacher = useCallback((teacher: Omit<Teacher, "id">) => {
    const newTeacher: Teacher = { ...teacher, id: crypto.randomUUID() };
    setTeachers((prev) => [...prev, newTeacher]);
  }, []);

  const updateTeacher = useCallback((id: string, updates: Partial<Teacher>) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTeacher = useCallback((id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Student CRUD ────────────────────────────────────────────
  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <DataContext.Provider
      value={{
        courses,
        teachers,
        students,
        addCourse,
        updateCourse,
        deleteCourse,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        deleteStudent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ── Hook ────────────────────────────────────────────────────────
export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a <DataProvider>");
  return ctx;
};
