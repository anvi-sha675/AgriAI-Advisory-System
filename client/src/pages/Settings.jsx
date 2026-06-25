import { useState } from "react";
import {
  Lock,
  Bell,
  Languages,
  Moon,
  Sun,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";
import { cn } from "../utils/helpers";

const languageOptions = ["English", "Hindi", "Marathi", "Tamil", "Bengali"];

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-50 dark:border-gray-800/60 last:border-none">
      <div className="pr-4">
        <p className="text-sm font-medium text-ink dark:text-gray-100">
          {title}
        </p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        aria-label={title}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors shrink-0",
          checked ? "bg-primary-700" : "bg-gray-200 dark:bg-gray-700",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform",
            checked && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [showCurrent, setShowCurrent] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    rain: true,
    pest: true,
    schemes: false,
    weekly: true,
  });
  const [language, setLanguage] = useState("English");
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.next.length < 8) {
      addToast("New password must be at least 8 characters.", "error");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      addToast("Passwords do not match.", "error");
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSaving(false);
    setPasswords({ current: "", next: "", confirm: "" });
    addToast("Password changed successfully.", "success");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <form
        onSubmit={handlePasswordChange}
        className="card p-6 sm:p-8 space-y-5"
      >
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary-700 dark:text-secondary-400" />{" "}
          Change Password
        </h3>
        <div className="relative">
          <Input
            id="current-password"
            label="Current password"
            type={showCurrent ? "text" : "password"}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowCurrent((s) => !s)}
            className="absolute right-3.5 top-[2.35rem] text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showCurrent ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            id="new-password"
            label="New password"
            type="password"
            value={passwords.next}
            onChange={(e) =>
              setPasswords({ ...passwords, next: e.target.value })
            }
          />
          <Input
            id="confirm-password"
            label="Confirm new password"
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" icon={Save} isLoading={isSaving}>
            Update Password
          </Button>
        </div>
      </form>

      <div className="card p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-primary-700 dark:text-secondary-400" />{" "}
          Notification Preferences
        </h3>
        <div className="mt-3">
          <ToggleRow
            title="Rain alerts"
            description="Get notified before heavy rainfall in your area"
            checked={notifications.rain}
            onChange={(v) => setNotifications({ ...notifications, rain: v })}
          />
          <ToggleRow
            title="Pest outbreak warnings"
            description="Regional pest activity alerts"
            checked={notifications.pest}
            onChange={(v) => setNotifications({ ...notifications, pest: v })}
          />
          <ToggleRow
            title="Government scheme updates"
            description="New subsidies and schemes relevant to you"
            checked={notifications.schemes}
            onChange={(v) => setNotifications({ ...notifications, schemes: v })}
          />
          <ToggleRow
            title="Weekly summary email"
            description="A recap of your queries and recommendations"
            checked={notifications.weekly}
            onChange={(v) => setNotifications({ ...notifications, weekly: v })}
          />
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 flex items-center gap-2 mb-4">
          <Languages className="h-5 w-5 text-primary-700 dark:text-secondary-400" />{" "}
          Language
        </h3>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                language === lang
                  ? "bg-primary-700 text-white border-primary-700"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300",
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-4">
          Theme
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
            ) : (
              <Sun className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
            )}
            <div>
              <p className="text-sm font-medium text-ink dark:text-gray-100">
                Dark mode
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Switch between light and dark appearance
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              theme === "dark" ? "bg-primary-700" : "bg-gray-200",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform",
                theme === "dark" && "translate-x-5",
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
