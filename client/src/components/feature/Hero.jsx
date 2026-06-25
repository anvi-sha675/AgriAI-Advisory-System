import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  ScanSearch,
  CloudSun,
  Sprout,
} from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-surface to-surface dark:from-primary-950 dark:via-gray-950 dark:to-gray-950">
      <div className="absolute inset-0 bg-furrow text-primary-100 dark:text-primary-900 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="container-page relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fadeUp">
            <span className="section-eyebrow">
              <Sprout className="h-3.5 w-3.5" /> AI-Powered Smart Farming
              Advisory
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-ink dark:text-gray-100 leading-[1.1] mt-5">
              Ask your field a question.{" "}
              <span className="text-primary-700 dark:text-secondary-400">
                Get an answer in minutes
              </span>
              , not market days.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-6 max-w-xl">
              AgriAI connects every farmer to instant, region-aware guidance on
              crop diseases, pests, weather, and soil health — in their own
              language, day or night.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link to="/register">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" size="lg" icon={PlayCircle}>
                  Try the Chat
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200/70 dark:border-gray-800">
              <div>
                <p className="font-display text-2xl font-semibold text-ink dark:text-gray-100">
                  50K+
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Farmers helped
                </p>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
              <div>
                <p className="font-display text-2xl font-semibold text-ink dark:text-gray-100">
                  11
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Languages supported
                </p>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
              <div>
                <p className="font-display text-2xl font-semibold text-ink dark:text-gray-100">
                  24/7
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Availability
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-fadeUp [animation-delay:150ms]">
            <div className="relative card p-5 sm:p-6 max-w-md mx-auto">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
                <span className="h-8 w-8 rounded-full bg-primary-700 flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-white" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-gray-100">
                    AgriAI Assistant
                  </p>
                  <p className="text-xs text-secondary-600 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary-500" />{" "}
                    Online
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tr-sm px-4 py-2.5 ml-auto max-w-[80%] text-sm text-ink dark:text-gray-100">
                  मेरे गेहूं के पत्ते पीले हो रहे हैं
                </div>
                <div className="bg-primary-50 dark:bg-primary-950/40 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm text-ink dark:text-gray-100">
                  This usually means nitrogen deficiency or early rust. Check
                  the lower leaves —
                  <span className="font-medium">
                    {" "}
                    uniform yellowing suggests nitrogen shortage.
                  </span>
                </div>
                <div className="flex gap-1.5 pl-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 sm:-right-8 card p-3 flex items-center gap-2 animate-fadeUp [animation-delay:400ms] shadow-lift">
              <ScanSearch className="h-4 w-4 text-secondary-600" />
              <span className="text-xs font-medium text-ink dark:text-gray-100">
                Disease detected: 92%
              </span>
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-8 card p-3 flex items-center gap-2 animate-fadeUp [animation-delay:600ms] shadow-lift">
              <CloudSun className="h-4 w-4 text-accent-500" />
              <span className="text-xs font-medium text-ink dark:text-gray-100">
                Rain expected Wed — hold spraying
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
