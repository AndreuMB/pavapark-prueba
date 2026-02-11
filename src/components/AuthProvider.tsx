import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../api/auth";

type AuthContextType = {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<User | null>;
  logoutUser: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loginUser = async (email: string, password: string) => {
    console.log("enter login user");

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();
    console.log(data.email);
    setUser(data.email);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  };

  useEffect(() => {
    setLoading(true);
    const fetchMe = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data.user.email);

        setUser(data.user.email);
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };
    fetchMe();
  }, []);

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
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
