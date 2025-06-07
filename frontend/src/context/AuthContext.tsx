// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosClient";

interface UserInfo {
  name: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: UserInfo | null;
  role: string | null;
  setUser: (user: UserInfo | null) => void;
  setRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        const parsed = JSON.parse(stored);
        if (parsed?.name && parsed?.avatarUrl) {
          setUser(parsed);
        } else {
          throw new Error("Invalid user shape");
        }
      }
    } catch (err) {
      console.warn("Failed to load user from localStorage. Clearing corrupted data.");
      localStorage.removeItem("user");
      setUser(null);
    }

    const fetchRole = async () => {
      try {
        const res = await axios.get("/users/role", { withCredentials: true });
        setRole(res.data.DT.GroupUsers.name);
      } catch {
        setRole(null);
      }
    };

    fetchRole();
  }, []);


  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}