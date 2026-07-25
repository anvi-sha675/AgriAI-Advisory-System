import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return; // StrictMode-safe: only run the exchange once
    ranOnce.current = true;

    const token = searchParams.get("token");
    if (!token) {
      setError("No sign-in token was returned. Please try again.");
      return;
    }

    (async () => {
      try {
        await loginWithToken(token);
        addToast("Signed in with Google.", "success");
        navigate("/dashboard", { replace: true });
      } catch {
        setError("We couldn't complete Google sign-in. Please try again.");
      }
    })();
  }, [searchParams, loginWithToken, addToast, navigate]);

  if (error) {
    return (
      <div className="animate-fadeUp text-center">
        <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-3" />
        <h1 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
          Sign-in failed
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
          {error}
        </p>
        <Link
          to="/login"
          className="inline-block mt-6 text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeUp text-center py-10">
      <Loader2 className="h-8 w-8 text-primary-700 dark:text-secondary-400 mx-auto mb-3 animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Completing sign-in...
      </p>
    </div>
  );
}
