import { useState } from "react";
import { User, MapPin, Languages, Sprout, Camera, Save } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { initialsFromName, formatDate } from "../utils/helpers";

const languageOptions = [
  "English",
  "Hindi",
  "Marathi",
  "Tamil",
  "Bengali",
  "Telugu",
  "Kannada",
  "Gujarati",
  "Punjabi",
  "Malayalam",
  "Odia",
];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: user?.name || "",
    location: user?.location || "",
    preferredLanguage: user?.preferredLanguage || "English",
    farmSize: user?.farmSize || "",
  });
  const [crops, setCrops] = useState(user?.primaryCrops || []);
  const [cropInput, setCropInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const addCrop = (e) => {
    e.preventDefault();
    if (cropInput.trim() && !crops.includes(cropInput.trim())) {
      setCrops([...crops, cropInput.trim()]);
      setCropInput("");
    }
  };

  const removeCrop = (crop) => setCrops(crops.filter((c) => c !== crop));

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    updateProfile({ ...form, primaryCrops: crops });
    setIsSaving(false);
    addToast("Profile updated successfully.", "success");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-primary-700 text-white flex items-center justify-center text-2xl font-semibold">
              {initialsFromName(user?.name || "Farmer")}
            </div>
            <button
              type="button"
              aria-label="Change photo"
              className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-soft"
            >
              <Camera className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Member since {user?.joinedOn ? formatDate(user.joinedOn) : "—"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-6">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
          Personal Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            id="name"
            label="Full name"
            icon={User}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            id="location"
            label="Location"
            icon={MapPin}
            placeholder="District, State"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label-text">Preferred language</label>
            <div className="relative">
              <Languages className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                className="input-field pl-10 appearance-none"
                value={form.preferredLanguage}
                onChange={(e) =>
                  setForm({ ...form, preferredLanguage: e.target.value })
                }
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Input
            id="farmSize"
            label="Farm size"
            placeholder="e.g. 4.5 acres"
            value={form.farmSize}
            onChange={(e) => setForm({ ...form, farmSize: e.target.value })}
          />
        </div>

        <div>
          <label className="label-text">Primary crops</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {crops.map((crop) => (
              <Badge key={crop} variant="secondary">
                <Sprout className="h-3 w-3" /> {crop}
                <button
                  type="button"
                  onClick={() => removeCrop(crop)}
                  className="ml-1 hover:text-red-500"
                  aria-label={`Remove ${crop}`}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="input-field flex-1"
              placeholder="Add a crop (e.g. Wheat)"
              value={cropInput}
              onChange={(e) => setCropInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCrop(e)}
            />
            <Button type="button" variant="outline" onClick={addCrop}>
              Add
            </Button>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" icon={Save} isLoading={isSaving}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
