import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/helpers";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-2">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-4 text-left group"
            >
              <span className="font-medium text-ink dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180 text-primary-600",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 pb-4 pr-8 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
