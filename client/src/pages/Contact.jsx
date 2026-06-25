import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@agriai.in" },
  { icon: Phone, label: "Phone", value: "+91 1800-123-4567" },
  { icon: MapPin, label: "Office", value: "Pune, Maharashtra, India" },
  { icon: Clock, label: "Support Hours", value: "Mon – Sat, 9am – 7pm IST" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    addToast("Message sent! We'll get back to you within 24 hours.", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container-page py-16 lg:py-24">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="section-eyebrow">Get in touch</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink dark:text-gray-100 mt-3">
          We'd love to hear from you
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Questions, partnership ideas, or feedback — reach out and our team
          will respond shortly.
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          {contactInfo.map((info) => (
            <div key={info.label} className="card p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0">
                <info.icon className="h-4.5 w-4.5 text-primary-700 dark:text-secondary-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{info.label}</p>
                <p className="text-sm font-medium text-ink dark:text-gray-100">
                  {info.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              id="contact-name"
              label="Full name"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              id="contact-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <Input
            id="contact-subject"
            label="Subject"
            placeholder="How can we help?"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
          <div>
            <label className="label-text" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              className="input-field resize-none"
              placeholder="Tell us more..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <Button type="submit" size="lg" icon={Send} isLoading={isSubmitting}>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
