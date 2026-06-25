import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Logo from "./Logo";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "AI Advisory Chat", to: "/chat" },
      { label: "Disease Detection", to: "/disease-detection" },
      { label: "Crop Recommendation", to: "/crop-recommendation" },
      { label: "Weather Insights", to: "/weather" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Help Center", to: "/help-center" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
    ],
  },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-100">
      <div className="h-1.5 w-full bg-furrow text-primary-700" />
      <div className="container-page py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo textClassName="text-white" iconClassName="bg-secondary-500" />
            <p className="text-sm text-primary-200 mt-4 max-w-xs leading-relaxed">
              Bringing instant, reliable, and region-specific farming guidance
              to every farmer, in their own language.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="h-9 w-9 rounded-lg bg-primary-900 flex items-center justify-center text-primary-200 hover:bg-secondary-500 hover:text-white transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-200 hover:text-secondary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-200">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary-400" />{" "}
                Pune, Maharashtra, India
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-secondary-400" /> +91
                1800-123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-secondary-400" />{" "}
                support@agriai.in
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-primary-900 text-xs text-primary-300">
          <p>
            &copy; {new Date().getFullYear()} AgriAI Advisory System. All rights
            reserved.
          </p>
          <p>Built to help every farmer grow smarter.</p>
        </div>
      </div>
    </footer>
  );
}
