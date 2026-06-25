import { Link } from "react-router-dom";
import { Sprout, Home, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-3xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mx-auto mb-6">
          <Sprout className="h-10 w-10 text-primary-700 dark:text-secondary-400" />
        </div>
        <p className="font-mono text-sm font-semibold text-secondary-600 tracking-widest mb-2">
          ERROR 404
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-gray-100">
          This field hasn't been planted yet
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to solid ground.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link to="/">
            <Button icon={Home}>Return Home</Button>
          </Link>
          <button onClick={() => window.history.back()} className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
