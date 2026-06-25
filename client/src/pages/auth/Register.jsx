import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { cn } from "../../utils/helpers";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const passwordChecks = [
    { label: "At least 8 characters", valid: form.password.length >= 8 },
    { label: "One number", valid: /\d/.test(form.password) },
  ];

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.phone) next.phone = "Phone number is required";
    else if (!/^\+?\d{10,13}$/.test(form.phone.replace(/\s/g, "")))
      next.phone = "Enter a valid phone number";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 8)
      next.password = "Password must be at least 8 characters";
    if (form.confirmPassword !== form.password)
      next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await register(form);
      addToast("Account created! Welcome to AgriAI.", "success");
      navigate("/dashboard");
    } catch {
      addToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeUp">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100">
        Create your account
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
        Join AgriAI and start getting instant farming guidance.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <Input
          id="fullName"
          label="Full name"
          icon={User}
          placeholder="Ramesh Patil"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          error={errors.fullName}
        />
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
        <Input
          id="phone"
          label="Phone number"
          type="tel"
          icon={Phone}
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
        />

        <div className="relative">
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Create a password"
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

        {form.password && (
          <div className="flex gap-4 -mt-2">
            {passwordChecks.map((c) => (
              <span
                key={c.label}
                className={cn(
                  "flex items-center gap-1 text-xs",
                  c.valid ? "text-secondary-600" : "text-gray-400",
                )}
              >
                <Check className="h-3 w-3" /> {c.label}
              </span>
            ))}
          </div>
        )}

        <Input
          id="confirmPassword"
          label="Confirm password"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
        />

        <p className="text-xs text-gray-500 dark:text-gray-400">
          By signing up, you agree to AgriAI's{" "}
          <Link
            to="/terms-and-conditions"
            className="text-primary-700 dark:text-secondary-400 hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-primary-700 dark:text-secondary-400 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-7">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary-700 dark:text-secondary-400 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
