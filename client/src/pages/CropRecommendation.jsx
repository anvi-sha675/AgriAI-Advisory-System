import { useState } from "react";
import {
  Sprout,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { getCropRecommendation } from "../services/aiService";
import { EmptyState } from "../components/ui/EmptyState";

const soilTypes = ["Loamy", "Sandy", "Clayey", "Black", "Red"];
const seasons = ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"];

export default function CropRecommendation() {
  const [form, setForm] = useState({
    soilType: "Loamy",
    season: "Kharif (Monsoon)",
    location: "",
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await getCropRecommendation(form);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl grid lg:grid-cols-[380px_1fr] gap-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-5 h-fit">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100">
            Tell us about your field
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            We'll recommend crops suited to your conditions.
          </p>
        </div>

        <div>
          <label className="label-text flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> Soil Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {soilTypes.map((soil) => (
              <button
                key={soil}
                type="button"
                onClick={() => setForm({ ...form, soilType: soil })}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  form.soilType === soil
                    ? "bg-primary-700 text-white border-primary-700"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300"
                }`}
              >
                {soil}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-text flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Season
          </label>
          <div className="space-y-2">
            {seasons.map((season) => (
              <button
                key={season}
                type="button"
                onClick={() => setForm({ ...form, season })}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                  form.season === season
                    ? "bg-primary-700 text-white border-primary-700"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300"
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        <Input
          id="location"
          label="Location"
          icon={MapPin}
          placeholder="District, State"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Get Recommendation
        </Button>
      </form>

      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-5">
          Recommended Crops
        </h3>

        {!result && !isLoading && (
          <EmptyState
            icon={Sprout}
            title="No recommendation yet"
            description="Fill in your field details to see crop suggestions here."
          />
        )}

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-4 animate-fadeUp">
            {result.recommendations.map((crop, i) => (
              <div
                key={crop.name}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-soft transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-secondary-50 dark:bg-secondary-950/40 flex items-center justify-center shrink-0">
                      <Sprout className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink dark:text-gray-100">
                        {crop.name}
                      </h4>
                      <span className="text-xs text-gray-400">
                        #{i + 1} recommended
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-secondary-600 font-mono">
                      {crop.suitability}%
                    </p>
                    <p className="text-xs text-gray-400">match</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                  {crop.benefits}
                </p>
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <CheckCircle2 className="h-4 w-4 text-secondary-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {crop.tips}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
