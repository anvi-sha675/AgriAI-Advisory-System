import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { BookmarksProvider } from "./context/BookmarksContext";
import ProtectedRoute from "./components/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import ChatHistory from "./pages/ChatHistory";
import DiseaseDetection from "./pages/DiseaseDetection";
import CropRecommendation from "./pages/CropRecommendation";
import SoilHealth from "./pages/SoilHealth";
import Weather from "./pages/Weather";
import VoiceAssistant from "./pages/VoiceAssistant";
import Analytics from "./pages/Analytics";
import Bookmarks from "./pages/Bookmarks";
import NotificationCenter from "./pages/NotificationCenter";
import GovernmentSchemes from "./pages/GovernmentSchemes";

import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsConditions from "./pages/static/TermsConditions";
import HelpCenter from "./pages/static/HelpCenter";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminChats from "./pages/admin/AdminChats";
import AdminReports from "./pages/admin/AdminReports";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BookmarksProvider>
            <BrowserRouter>
              <Routes>
                {/* Public marketing + static pages */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route
                    path="/terms-and-conditions"
                    element={<TermsConditions />}
                  />
                  <Route path="/help-center" element={<HelpCenter />} />
                </Route>

                {/* Auth pages */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

                {/* Authenticated dashboard pages */}
                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/history" element={<ChatHistory />} />
                  <Route
                    path="/disease-detection"
                    element={<DiseaseDetection />}
                  />
                  <Route
                    path="/crop-recommendation"
                    element={<CropRecommendation />}
                  />
                  <Route path="/soil-health" element={<SoilHealth />} />
                  <Route path="/weather" element={<Weather />} />
                  <Route path="/voice-assistant" element={<VoiceAssistant />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/bookmarks" element={<Bookmarks />} />
                  <Route
                    path="/notifications"
                    element={<NotificationCenter />}
                  />
                  <Route
                    path="/government-schemes"
                    element={<GovernmentSchemes />}
                  />
                </Route>

                {/* Admin pages */}
                <Route
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/chats" element={<AdminChats />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </BookmarksProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
