import { Shield } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly, such as your name, phone number, email, location, and farming details, as well as usage data like queries and uploaded images used for AI analysis.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to provide personalized farming advisory, improve our AI models, send relevant alerts (weather, pest, schemes), and maintain your chat history for your convenience.",
  },
  {
    title: "Data Sharing",
    content:
      "We do not sell your personal data. Aggregated, anonymized data may be shared with agricultural research partners to improve advisory accuracy.",
  },
  {
    title: "Image and Voice Data",
    content:
      "Images uploaded for disease detection and voice recordings for the voice assistant are processed to generate recommendations and may be retained to improve model accuracy, unless you request deletion.",
  },
  {
    title: "Data Security",
    content:
      "We use industry-standard encryption and access controls to protect your data. However, no system is completely secure, and we encourage strong password practices.",
  },
  {
    title: "Your Rights",
    content:
      "You can access, update, or request deletion of your personal data at any time through your account settings or by contacting our support team.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this policy periodically. Continued use of AgriAI after changes constitutes acceptance of the revised policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="container-page py-16 lg:py-24 max-w-3xl">
      <div className="flex items-center gap-3 mb-3">
        <Shield className="h-7 w-7 text-primary-700 dark:text-secondary-400" />
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-gray-100">
          Privacy Policy
        </h1>
      </div>
      <p className="text-sm text-gray-400 mb-10">Last updated: June 1, 2026</p>

      <div className="space-y-8">
        {sections.map((s, i) => (
          <div key={s.title}>
            <h2 className="font-display text-lg font-semibold text-ink dark:text-gray-100 mb-2">
              {i + 1}. {s.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {s.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
