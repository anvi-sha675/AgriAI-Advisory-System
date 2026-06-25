import { Quote } from "lucide-react";
import { initialsFromName } from "../../utils/helpers";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card p-6 h-full flex flex-col">
      <Quote className="h-7 w-7 text-secondary-300 dark:text-secondary-700 mb-3" />
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
        <div className="h-10 w-10 rounded-full bg-primary-700 text-white flex items-center justify-center text-sm font-semibold shrink-0">
          {initialsFromName(testimonial.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink dark:text-gray-100">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
