import { useState } from "react";
import {
  Search,
  MessageCircle,
  ScanSearch,
  CloudSun,
  User,
  Mic,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import FAQAccordion from "../../components/ui/FAQAccordion";
import { faqs } from "../../utils/mockData";

const categories = [
  {
    icon: MessageCircle,
    title: "Using the Chat",
    description: "How to ask questions and read AI responses",
  },
  {
    icon: ScanSearch,
    title: "Disease Detection",
    description: "Uploading photos and understanding results",
  },
  {
    icon: CloudSun,
    title: "Weather & Alerts",
    description: "Forecasts, alerts, and spraying recommendations",
  },
  {
    icon: User,
    title: "Account & Profile",
    description: "Managing your details and preferences",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description: "Speaking your questions instead of typing",
  },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <section className="bg-primary-50/60 dark:bg-primary-950/20 py-16">
        <div className="container-page text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-gray-100">
            How can we help?
          </h1>
          <div className="relative max-w-lg mx-auto mt-7">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              className="input-field pl-12 py-3.5 text-base"
              placeholder="Search for help articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
          {categories.map((c) => (
            <div
              key={c.title}
              className="card p-5 text-center hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="h-11 w-11 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mx-auto mb-3">
                <c.icon className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
              </div>
              <h3 className="text-sm font-semibold text-ink dark:text-gray-100">
                {c.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-ink dark:text-gray-100 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="card px-6">
            {filteredFaqs.length > 0 ? (
              <FAQAccordion items={filteredFaqs} />
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                No articles match "{query}".
              </p>
            )}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Still need help?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 dark:text-secondary-400 hover:underline"
            >
              Contact our support team <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
