export default function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "primary",
}) {
  const accentClasses = {
    primary:
      "bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-400",
    accent:
      "bg-accent-50 text-accent-600 dark:bg-accent-950/40 dark:text-accent-400",
    secondary:
      "bg-secondary-50 text-primary-700 dark:bg-secondary-950/40 dark:text-secondary-400",
  };
  return (
    <div className="card p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group">
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 ${accentClasses[accent]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
