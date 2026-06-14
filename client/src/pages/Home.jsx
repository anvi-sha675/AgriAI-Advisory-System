import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Hero />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="AI Crop Advisory"
              description="Get AI-powered recommendations for crop health and farming practices."
            />

            <Card
              title="Disease Detection"
              description="Identify crop diseases and receive preventive guidance."
            />

            <Card
              title="Weather Insights"
              description="Plan farming activities with weather-aware recommendations."
            />

            <Card
              title="Chat History"
              description="Access and manage your previous AI conversations."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;