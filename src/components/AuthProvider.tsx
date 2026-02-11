import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../api/auth";

type AuthContextType = {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<User | null>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = async (email: string, password: string) => {
    const loggedUser = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    });

    setUser(loggedUser);
    return loggedUser;
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
