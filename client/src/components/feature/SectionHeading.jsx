export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12 lg:mb-16`}
    >
      {eyebrow && <span className="section-eyebrow mb-3">{eyebrow}</span>}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-gray-100 mt-2 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
