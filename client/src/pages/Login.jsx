import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          <p className="text-gray-600 text-center mb-8">
            Secure authentication functionality will be integrated in the
            upcoming development phases.
          </p>

          <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition">
            Coming Soon
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;