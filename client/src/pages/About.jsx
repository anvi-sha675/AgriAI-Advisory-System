import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About AgriAI
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-8">
            AgriAI is an AI-powered advisory platform designed to provide
            farmers with instant crop guidance, disease management
            recommendations, and practical farming support through an
            intelligent chatbot experience.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;