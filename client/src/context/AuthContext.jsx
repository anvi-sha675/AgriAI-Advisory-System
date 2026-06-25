import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USER = {
  id: "u_1029",
  name: "Ramesh Joshi",
  email: "ramesh.joshi@example.com",
  phone: "+91 98765 43210",
  location: "Nashik, Maharashtra",
  preferredLanguage: "Hindi",
  primaryCrops: ["Wheat", "Onion", "Sugarcane"],
  farmSize: "4.5 acres",
  role: "farmer",
  joinedOn: "2025-11-03",
  avatarColor: "primary",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem("agriai-auth");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("agriai-auth", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("agriai-auth");
    }
  }, [user]);

  const login = async (_email, _password) => {
    await new Promise((r) => setTimeout(r, 600));
    setUser(DEMO_USER);
    return DEMO_USER;
  };

  const register = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    const newUser = {
      ...DEMO_USER,
      name: data.fullName || DEMO_USER.name,
      email: data.email || DEMO_USER.email,
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  const updateProfile = (partial) => {
    setUser((prev) => ({ ...prev, ...partial }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
