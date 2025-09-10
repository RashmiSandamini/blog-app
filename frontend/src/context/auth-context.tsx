import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'reader';
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const decodedUser = decodeToken(token);
    if (decodedUser) {
      setUser(decodedUser);
    } else {
      logout();
    }
    setLoading(false);
  }, [token]);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      const decodedUser = decodeToken(newToken);
      if (decodedUser) setUser(decodedUser);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<{
      id: number;
      username: string;
      email: string;
      role: 'admin' | 'editor' | 'reader';
    }>(token);
    console.log(decoded);
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      profilePicture: '',
    };
  } catch {
    return null;
  }
};
