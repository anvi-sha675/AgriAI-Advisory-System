import { useEffect, useState } from "react";

export default function ApiDemo() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/queries")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setQueries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          AgriAI Backend API Demo
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Demonstrating successful frontend-backend integration.
        </p>

        {loading && (
          <div className="text-center text-lg">
            Loading crop advisory data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 bg-white rounded-xl shadow p-5">
              <h2 className="text-xl font-semibold mb-2">
                API Statistics
              </h2>

              <p>
                Total Queries Retrieved:{" "}
                <span className="font-bold text-green-700">
                  {queries.length}
                </span>
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {queries.map((query) => (
                <div
                  key={query.id}
                  className="bg-white rounded-xl shadow p-5 border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-green-700 mb-3">
                    {query.crop}
                  </h2>

                  <p className="mb-2">
                    <strong>Issue:</strong> {query.issue}
                  </p>

                  <p>
                    <strong>Advice:</strong> {query.advice}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}