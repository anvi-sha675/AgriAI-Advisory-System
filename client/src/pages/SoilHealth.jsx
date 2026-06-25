import { useState } from "react";
import { FlaskConical, ArrowRight, Sprout, Beaker } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { getSoilHealthAdvisory } from "../services/aiService";

const fields = [
  { key: "ph", label: "Soil pH", placeholder: "e.g. 6.5", min: 0, max: 14 },
  { key: "nitrogen", label: "Nitrogen (kg/ha)", placeholder: "e.g. 45" },
  { key: "phosphorus", label: "Phosphorus (kg/ha)", placeholder: "e.g. 30" },
  { key: "potassium", label: "Potassium (kg/ha)", placeholder: "e.g. 50" },
];

const conditionColor = {
  Acidic: "earth",
  Alkaline: "accent",
  Balanced: "secondary",
};

export default function SoilHealth() {
  const [form, setForm] = useState({
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await getSoilHealthAdvisory(form);
    setResult(data);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl grid lg:grid-cols-[380px_1fr] gap-6">
      <form onSubmit={handleSubmit} className="card p-6 space-y-5 h-fit">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary-700 dark:text-secondary-400" />{" "}
            Soil Test Readings
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter your latest soil test values.
          </p>
        </div>

        {fields.map((field) => (
          <Input
            key={field.key}
            id={field.key}
            label={field.label}
            type="number"
            step="0.1"
            placeholder={field.placeholder}
            value={form[field.key]}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            required
          />
        ))}

        <Button
          type="submit"
          fullWidth
          size="lg"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Analyze Soil Health
        </Button>
      </form>

      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-5">
          Soil Health Report
        </h3>

        {!result && !isLoading && (
          <EmptyState
            icon={Beaker}
            title="No analysis yet"
            description="Enter your soil test readings to get fertilizer and crop guidance."
          />
        )}

        {isLoading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6 animate-fadeUp">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                  Soil Condition
                </p>
                <h4 className="font-display text-2xl font-semibold text-ink dark:text-gray-100 mt-0.5">
                  {result.condition}
                </h4>
              </div>
              <Badge variant={conditionColor[result.condition]}>
                {result.condition}
              </Badge>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {result.summary}
            </p>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2.5">
                Recommended Fertilizers
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {result.fertilizers.map((fert) => (
                  <div
                    key={fert}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-ink dark:text-gray-100"
                  >
                    <FlaskConical className="h-4 w-4 text-primary-600 dark:text-secondary-400 shrink-0" />{" "}
                    {fert}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary-50 dark:bg-secondary-950/30 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary-700 dark:text-secondary-400 flex items-center gap-1.5 mb-2.5">
                <Sprout className="h-3.5 w-3.5" /> Suitable Crops
              </p>
              <div className="flex flex-wrap gap-2">
                {result.suitableCrops.map((crop) => (
                  <Badge key={crop} variant="secondary">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
