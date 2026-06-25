import { FileText } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By creating an account or using AgriAI, you agree to be bound by these Terms and Conditions and our Privacy Policy.",
  },
  {
    title: "Nature of Advisory Services",
    content:
      "AgriAI provides AI-generated agricultural guidance for informational purposes. It is not a substitute for professional agronomic, veterinary, or legal advice. Always consult a qualified expert for critical decisions.",
  },
  {
    title: "User Responsibilities",
    content:
      "You agree to provide accurate information, use the platform lawfully, and not misuse the disease detection or chat features to upload harmful or unrelated content.",
  },
  {
    title: "Limitation of Liability",
    content:
      "AgriAI and its team are not liable for crop losses, financial damages, or other outcomes resulting from reliance on AI-generated recommendations.",
  },
  {
    title: "Account Termination",
    content:
      "We reserve the right to suspend or terminate accounts that violate these terms or engage in abusive behavior toward the platform or other users.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, branding, and underlying technology of AgriAI are the property of AgriAI Advisory System and may not be reproduced without permission.",
  },
  {
    title: "Governing Law",
    content:
      "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Maharashtra, India.",
  },
];

export default function TermsConditions() {
  return (
    <div className="container-page py-16 lg:py-24 max-w-3xl">
      <div className="flex items-center gap-3 mb-3">
        <FileText className="h-7 w-7 text-primary-700 dark:text-secondary-400" />
        <h1 className="font-display text-3xl font-semibold text-ink dark:text-gray-100">
          Terms &amp; Conditions
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
