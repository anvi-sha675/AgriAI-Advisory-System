import { useState } from "react";
import {
  Landmark,
  Calendar,
  IndianRupee,
  CheckCircle2,
  ExternalLink,
  Search,
} from "lucide-react";
import Badge from "../components/ui/Badge";
import { EmptyState } from "../components/ui/EmptyState";
import { governmentSchemes } from "../utils/mockData";
import { useToast } from "../context/ToastContext";

export default function GovernmentSchemes() {
  const [query, setQuery] = useState("");
  const { addToast } = useToast();

  const filtered = governmentSchemes.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleLearnMore = (name) => {
    addToast(
      `More details for "${name}" would open here once connected to a real schemes database.`,
      "info",
    );
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink dark:text-gray-100 flex items-center gap-2">
          <Landmark className="h-5 w-5 text-primary-700 dark:text-secondary-400" />{" "}
          Government Schemes &amp; Subsidies
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Central schemes relevant to Indian farmers — income support,
          insurance, credit, and equipment subsidies.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          className="input-field pl-10"
          placeholder="Search schemes by name or category..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={Landmark}
            title="No schemes found"
            description="Try a different search term."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((scheme) => (
            <div key={scheme.id} className="card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {scheme.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 leading-snug">
                    {scheme.name}
                  </h3>
                </div>
                <Badge
                  variant={scheme.status === "open" ? "secondary" : "gray"}
                  className="shrink-0"
                >
                  {scheme.status === "open"
                    ? "Open for applications"
                    : "Closed this cycle"}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                {scheme.summary}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-secondary-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                      Eligibility
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                      {scheme.eligibility}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <IndianRupee className="h-4 w-4 text-secondary-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                      Benefit
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                      {scheme.benefit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3.5 w-3.5" /> {scheme.deadline}
                </span>
                <button
                  onClick={() => handleLearnMore(scheme.name)}
                  className="flex items-center gap-1 text-sm font-medium text-primary-700 dark:text-secondary-400 hover:gap-1.5 transition-all"
                >
                  Learn more <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center pt-2">
        Scheme details shown are illustrative. Always verify current eligibility
        and deadlines on the official government portal before applying.
      </p>
    </div>
  );
}
