import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      addToast("Please enter a valid email address.", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    addToast("OTP sent to your email.", "success");
    setStep(2);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      addToast("Enter the full 6-digit OTP.", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setStep(3);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      addToast("Password must be at least 8 characters.", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    addToast("Password reset successful! Please log in.", "success");
    setStep(4);
  };

  return (
    <div className="animate-fadeUp">
      <Link
        to="/login"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-700 dark:hover:text-secondary-400 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to log in
      </Link>

      {step === 1 && (
        <>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100">
            Forgot your password?
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Enter your email and we'll send you a one-time code to reset it.
          </p>
          <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
            <Input
              id="reset-email"
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Send OTP
            </Button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <div className="h-12 w-12 rounded-2xl bg-accent-50 dark:bg-accent-950/40 flex items-center justify-center mb-5">
            <ShieldCheck className="h-6 w-6 text-accent-500" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100">
            Enter verification code
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-ink dark:text-gray-200">
              {email}
            </span>
          </p>
          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">
            <Input
              id="otp"
              label="One-time code"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-lg tracking-[0.5em] font-mono"
            />
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Verify Code
            </Button>
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-sm text-primary-700 dark:text-secondary-400 hover:underline w-full text-center"
            >
              Resend code
            </button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100">
            Set a new password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Choose a strong password for your account.
          </p>
          <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
            <Input
              id="new-password"
              label="New password"
              type="password"
              icon={Lock}
              placeholder="Create a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Reset Password
            </Button>
          </form>
        </>
      )}

      {step === 4 && (
        <div className="text-center py-6">
          <div className="h-14 w-14 rounded-2xl bg-secondary-50 dark:bg-secondary-950/40 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="h-7 w-7 text-secondary-600" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink dark:text-gray-100">
            Password reset!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Your password has been updated successfully.
          </p>
          <Link to="/login" className="inline-block mt-7">
            <Button size="lg">Back to Log In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
