import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { checkCookies, login, logout, type User } from "../api/auth";

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
    const data = await login(email, password);

    console.log(data.email);
    setUser(data.email);

    return data;
  };

  useEffect(() => {
    setLoading(true);
    const fetchMe = async () => {
      const user = await checkCookies();
      setUser(user);
      setLoading(false);
    };
    fetchMe();
  }, []);

  const logoutUser = async () => {
    const response = await logout();
    console.log(response);
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
