import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Dashboard
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-8">
            The dashboard will provide AI interaction history, user activity,
            crop insights, and analytics to help users monitor and manage
            agricultural recommendations effectively.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;