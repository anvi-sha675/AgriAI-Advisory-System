import { createContext, useContext, useEffect, useState } from "react";
import { getApiBaseUrl, normalizeIds } from "../utils/api";

const AuthContext = createContext(null);

const API_BASE = getApiBaseUrl();
const TOKEN_KEY = "agriai-token";
const USER_KEY = "agriai-auth";

const DEMO_USER = {
  id: "u_001",
  name: "Ramesh Joshi",
  email: "ramesh@example.com",
  phone: "+91 98765 43210",
  location: "Nashik, Maharashtra",
  preferredLanguage: "Hindi",
  primaryCrops: ["Wheat", "Onion", "Sugarcane"],
  farmSize: "4.5 acres",
  role: "farmer",
  joinedOn: "2025-11-03",
};

async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return { ok: true, data: normalizeIds(data.data) };
  } catch (err) {
    if (err.message === "Failed to fetch" || err.name === "TypeError") {
      return { ok: false, offline: true };
    }
    return { ok: false, message: err.message };
  }
}

async function apiGet(path, token) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return { ok: true, data: normalizeIds(data.data) };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

async function apiPatch(path, body, token) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return normalizeIds(data.data);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    const result = await apiPost("/auth/login", { email, password });
    if (result.ok) {
      window.localStorage.setItem(TOKEN_KEY, result.data.token);
      setUser(result.data.user);
      return result.data.user;
    }
    if (!result.offline) throw new Error(result.message || "Login failed");
    await new Promise((r) => setTimeout(r, 600));
    const demoUser =
      email === "admin@agriai.in"
        ? {
            ...DEMO_USER,
            name: "Admin User",
            email: "admin@agriai.in",
            role: "admin",
          }
        : DEMO_USER;
    window.localStorage.setItem(TOKEN_KEY, "demo_token");
    setUser(demoUser);
    return demoUser;
  };

  const register = async (formData) => {
    const result = await apiPost("/auth/register", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    if (result.ok) {
      window.localStorage.setItem(TOKEN_KEY, result.data.token);
      setUser(result.data.user);
      return result.data.user;
    }
    if (!result.offline)
      throw new Error(result.message || "Registration failed");
    await new Promise((r) => setTimeout(r, 600));
    const newUser = {
      ...DEMO_USER,
      name: formData.fullName || DEMO_USER.name,
      email: formData.email,
    };
    window.localStorage.setItem(TOKEN_KEY, "demo_token");
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  const loginWithToken = async (token) => {
    const result = await apiGet("/auth/me", token);
    if (!result.ok) throw new Error(result.message || "Google sign-in failed");
    window.localStorage.setItem(TOKEN_KEY, token);
    setUser(result.data.user);
    return result.data.user;
  };

  const updateProfile = async (partial) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token && token !== "demo_token") {
      const data = await apiPatch("/auth/me", partial, token);
      if (data?.user) {
        setUser((prev) => ({ ...prev, ...data.user }));
        return;
      }
    }
    setUser((prev) => ({ ...prev, ...partial }));
  };

  // Real password change
  const changePassword = async (currentPassword, newPassword) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (!token || token === "demo_token") {
      throw new Error(
        "Password changes aren't available in demo mode — the backend isn't reachable.",
      );
    }
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Couldn't change password.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginWithToken,
        updateProfile,
        changePassword,
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
