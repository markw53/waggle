import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase";
import type { User } from "../types/user";

// --- Context type ---
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  updateUserData: (userData: Partial<User>) => Promise<void>;
  signUp?: (email: string, password: string, displayName: string) => Promise<void>;
}

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Map FirebaseUser to our User ---
function firebaseUserToUser(firebaseUser: FirebaseUser): User {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  };
}

// --- Provider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate(); // Removed unused variable

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUserToUser(firebaseUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will update our state
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
        throw err;
      } else {
        setError("Login failed. Please try again.");
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      // onAuthStateChanged will update our state
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Logout failed.");
        throw err;
      } else {
        setError("Logout failed.");
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (userData: Partial<User>): Promise<void> => {
    if (!auth.currentUser) return;
    // You need to implement the logic to update the user data here, e.g. using updateProfile from firebase/auth.
    // Example:
    // await updateProfile(auth.currentUser, userData);
    // Manually update context user
    setUser({
      ...firebaseUserToUser(auth.currentUser),
      ...userData,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        error,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;