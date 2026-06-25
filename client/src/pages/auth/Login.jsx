import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const next = {};
    if (!form.email) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await login(form.email, form.password);
      addToast("Welcome back! Logged in successfully.", "success");
      navigate(location.state?.from?.pathname || "/dashboard");
    } catch {
      addToast("Login failed. Please check your details.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeUp">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100">
        Welcome back
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
        Log in to continue getting farming advice from AgriAI.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <Input
          id="email"
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-[2.35rem] text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-700 focus:ring-primary-500"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Log In
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-7">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary-700 dark:text-secondary-400 hover:underline"
        >
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
