import React, { createContext, useContext, useState, useEffect } from 'react';

interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  createdAt: string;
}

interface StudentAuthContextType {
  student: Student | null;
  isLoading: boolean;
  login: (email: string, accessCode: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<Student>) => Promise<void>;
  refreshStudent: () => Promise<void>;
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(undefined);

export function StudentAuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedStudent = localStorage.getItem('student');
    if (savedStudent) {
      try {
        setStudent(JSON.parse(savedStudent));
      } catch (e) {
        localStorage.removeItem('student');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, accessCode: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/student-login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, accessCode }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login fehlgeschlagen');
    }

    setStudent(data.student);
    localStorage.setItem('student', JSON.stringify(data.student));

    await updateStreak(data.student.id);
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('student');
  };

  const updateProfile = async (updates: Partial<Student>) => {
    if (!student) throw new Error('Nicht eingeloggt');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-student-profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          studentId: student.id,
          ...updates,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Profil-Update fehlgeschlagen');
    }

    const updatedStudent = data.student;
    setStudent(updatedStudent);
    localStorage.setItem('student', JSON.stringify(updatedStudent));
  };

  const refreshStudent = async () => {
    if (!student) return;

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/student-login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email: student.email, accessCode: 'refresh' }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setStudent(data.student);
      localStorage.setItem('student', JSON.stringify(data.student));
    }
  };

  const updateStreak = async (studentId: string) => {
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/update-streak`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ studentId }),
        }
      );
    } catch (error) {
      console.error('Streak update failed:', error);
    }
  };

  return (
    <StudentAuthContext.Provider
      value={{
        student,
        isLoading,
        login,
        logout,
        updateProfile,
        refreshStudent,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  const context = useContext(StudentAuthContext);
  if (context === undefined) {
    throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  }
  return context;
}
