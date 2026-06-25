import { Link } from "react-router-dom";
import { Target, Users, Heart, Sprout, ArrowRight } from "lucide-react";
import SectionHeading from "../components/feature/SectionHeading";
import Button from "../components/ui/Button";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To close the information gap for farmers in remote and underserved regions through accessible AI.",
  },
  {
    icon: Heart,
    title: "Farmer First",
    text: "Every feature is designed around real field conditions — low connectivity, low literacy, regional languages.",
  },
  {
    icon: Users,
    title: "Built With Farmers",
    text: "Our advisory logic is shaped by feedback from FPOs, extension officers, and farmers across India.",
  },
];

export default function About() {
  return (
    <div>
      <section className="bg-primary-50/60 dark:bg-primary-950/20 py-16 lg:py-24">
        <div className="container-page text-center">
          <span className="section-eyebrow">About AgriAI</span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink dark:text-gray-100 mt-3 max-w-3xl mx-auto leading-tight">
            Helping every farmer make confident decisions, faster
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            AgriAI was built to bridge the gap between farmers and timely
            agricultural expertise — using AI to deliver advice that used to
            take days, in minutes.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <SectionHeading eyebrow="What drives us" title="Our values" />
        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-6 w-6 text-primary-700 dark:text-secondary-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-800 text-white py-16">
        <div className="container-page grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display text-3xl font-semibold">50,000+</p>
            <p className="text-sm text-primary-200 mt-1">Farmers supported</p>
          </div>
          <div className="sm:border-x border-primary-700 sm:px-8">
            <p className="font-display text-3xl font-semibold">28</p>
            <p className="text-sm text-primary-200 mt-1">
              States and regions covered
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold">200K+</p>
            <p className="text-sm text-primary-200 mt-1">Questions answered</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24 text-center">
        <Sprout className="h-10 w-10 text-secondary-500 mx-auto mb-4" />
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-gray-100 max-w-xl mx-auto">
          Join the community of farmers growing smarter with AgriAI
        </h2>
        <Link to="/register" className="inline-block mt-7">
          <Button size="lg" icon={ArrowRight} iconPosition="right">
            Get Started Free
          </Button>
        </Link>
      </section>
    </div>
  );
}
