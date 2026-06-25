import { Link } from "react-router-dom";
import {
  MessageCircle,
  ScanSearch,
  CloudSun,
  Sprout,
  FlaskConical,
  Mic,
  Languages,
  History,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Smartphone,
} from "lucide-react";
import Hero from "../components/feature/Hero";
import SectionHeading from "../components/feature/SectionHeading";
import FeatureCard from "../components/feature/FeatureCard";
import TestimonialCard from "../components/feature/TestimonialCard";
import FAQAccordion from "../components/ui/FAQAccordion";
import Button from "../components/ui/Button";
import { testimonials, faqs } from "../utils/mockData";

const features = [
  {
    icon: MessageCircle,
    title: "AI Advisory Chat",
    description:
      "Ask farming questions in plain language and get clear, practical answers in seconds.",
  },
  {
    icon: ScanSearch,
    title: "Disease Detection",
    description:
      "Upload a photo of an affected crop and get an instant diagnosis with a confidence score.",
  },
  {
    icon: Sprout,
    title: "Crop Recommendation",
    description:
      "Tell us your soil and season — we'll suggest the crops most likely to thrive.",
  },
  {
    icon: FlaskConical,
    title: "Soil Health Advisor",
    description:
      "Enter your soil readings and receive fertilizer guidance tailored to your field.",
  },
  {
    icon: CloudSun,
    title: "Weather Insights",
    description:
      "Stay ahead of rain, heat, and wind with forecasts built for farming decisions.",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description:
      "Speak your question instead of typing — ideal for low-literacy users in the field.",
  },
  {
    icon: Languages,
    title: "11 Indian Languages",
    description:
      "Get guidance in Hindi, Marathi, Tamil, Bengali, and more, not just English.",
  },
  {
    icon: History,
    title: "Chat History",
    description:
      "Every conversation is saved so you can revisit past advice whenever you need it.",
  },
];

const whyChoose = [
  {
    icon: Clock,
    title: "Instant, not next market day",
    text: "No more waiting for the next visit to town to ask an expert.",
  },
  {
    icon: ShieldCheck,
    title: "Built for real fields",
    text: "Recommendations consider your region, season, and soil — not generic advice.",
  },
  {
    icon: Users,
    title: "Made for every farmer",
    text: "Voice input and 11 languages mean literacy and typing speed are never a barrier.",
  },
  {
    icon: Smartphone,
    title: "Works on basic smartphones",
    text: "Lightweight by design, so a strong data connection isn't a requirement.",
  },
];

const steps = [
  {
    step: "01",
    title: "Ask a question",
    description:
      "Type, speak, or upload a photo describing the issue on your farm.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "AI analyzes it",
    description:
      "Our system checks the symptoms, season, and your region for context.",
    icon: ScanSearch,
  },
  {
    step: "03",
    title: "Get a recommendation",
    description:
      "Receive clear causes, treatment steps, and ways to prevent it next time.",
    icon: CheckCircle2,
  },
];

export default function Landing() {
  return (
    <div>
      <Hero />

      {/* Features */}
      <section id="features" className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow="What you get"
          title="Everything a farmer needs, in one place"
          description="From diagnosing a sick crop to planning the next season's planting, AgriAI covers the questions that come up every day in the field."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fadeUp"
            >
              <FeatureCard
                {...f}
                accent={
                  i % 3 === 0 ? "primary" : i % 3 === 1 ? "secondary" : "accent"
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-primary-50/60 dark:bg-primary-950/20 py-20 lg:py-28">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-eyebrow">Why AgriAI</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-gray-100 mt-3 leading-tight">
              Designed around the realities of farming, not a generic chatbot
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              Most digital tools assume reliable internet, strong literacy, and
              English fluency. AgriAI was built the other way around — starting
              from the farmer's actual conditions.
            </p>
            <Link to="/register" className="inline-block mt-7">
              <Button icon={ArrowRight} iconPosition="right">
                Join AgriAI Today
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {whyChoose.map((item) => (
              <div key={item.title} className="card p-5">
                <div className="h-10 w-10 rounded-xl bg-secondary-50 dark:bg-secondary-950/40 flex items-center justify-center mb-3">
                  <item.icon className="h-5 w-5 text-primary-700 dark:text-secondary-400" />
                </div>
                <h3 className="font-semibold text-sm text-ink dark:text-gray-100 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow="The process"
          title="From question to recommendation in three steps"
        />
        <div className="grid sm:grid-cols-3 gap-8 relative">
          <div
            className="hidden sm:block absolute top-10 left-0 right-0 h-px bg-gray-200 dark:bg-gray-800"
            style={{ marginLeft: "16.66%", marginRight: "16.66%" }}
          />
          {steps.map((s) => (
            <div key={s.step} className="relative text-center">
              <div className="relative z-10 h-20 w-20 rounded-2xl bg-white dark:bg-gray-900 border-2 border-primary-700 flex items-center justify-center mx-auto mb-5 shadow-soft">
                <s.icon className="h-8 w-8 text-primary-700 dark:text-secondary-400" />
              </div>
              <span className="font-mono text-xs font-semibold text-secondary-600">
                STEP {s.step}
              </span>
              <h3 className="font-display text-xl font-semibold text-ink dark:text-gray-100 mt-1.5">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits banner */}
      <section className="bg-primary-800 text-white">
        <div className="container-page py-14 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-3xl font-semibold">3x</p>
            <p className="text-sm text-primary-200 mt-1">
              Faster diagnosis vs. waiting for an expert visit
            </p>
          </div>
          <div className="sm:border-x border-primary-700 sm:px-8">
            <p className="font-display text-3xl font-semibold">11</p>
            <p className="text-sm text-primary-200 mt-1">
              Regional languages, with voice support
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold">24/7</p>
            <p className="text-sm text-primary-200 mt-1">
              Available any time, even at midnight in the field
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow="From the field"
          title="Trusted by farmers across India"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-20 lg:py-28">
        <div className="container-page max-w-3xl">
          <SectionHeading
            eyebrow="Questions"
            title="Frequently asked questions"
          />
          <div className="card px-6">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-primary-700 px-8 py-16 sm:px-16 text-center">
          <div className="absolute inset-0 bg-furrow text-primary-600 opacity-40" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Your next farming question is one message away
            </h2>
            <p className="text-primary-100 mt-4 max-w-lg mx-auto">
              Join thousands of farmers already getting instant, reliable
              answers from AgriAI.
            </p>
            <Link to="/register" className="inline-block mt-8">
              <Button
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
              >
                Get Started — It's Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
