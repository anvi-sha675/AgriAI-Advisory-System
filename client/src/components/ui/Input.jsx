import { cn } from "../../utils/helpers";

/**
 * Input
 * @typedef {Object} InputProps
 * @property {string} [label] - Optional label text rendered above the field.
 * @property {string} id - Element id, also used to associate the label and error message.
 * @property {string} [error] - Validation error message. When set, renders red helper text and red border.
 * @property {React.ComponentType} [icon] - Optional Lucide icon rendered inside the field, left-aligned.
 * @property {string} [type="text"] - Native input type (text, email, password, number, etc.).
 * @property {string} [className] - Additional class names merged onto the <input> element.
 * @property {string} [containerClassName] - Additional class names merged onto the outer wrapper <div>.
 * @param {InputProps} props
 */

export default function Input({
  label,
  id,
  error,
  icon: Icon,
  type = "text",
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className="label-text">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "input-field",
            Icon && "pl-10",
            error && "border-red-400 focus:border-red-500 focus:ring-red-100",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
