import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import PageTransition from "../components/layout/PageTransition";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
