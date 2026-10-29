const fromEnv = (name: string, fallback: string) =>
  process.env[name]?.trim() || fallback;

const phoneDisplay = fromEnv("SITE_CONTACT_PHONE_DISPLAY", "+420 735 023 812");

export const siteConfig = {
  contact: {
    email: fromEnv("SITE_CONTACT_EMAIL", "contact@vantuch.dev"),
    phoneDisplay,
    phoneHref: fromEnv(
      "SITE_CONTACT_PHONE_HREF",
      phoneDisplay.replace(/(?!^\+)[^\d]/g, ""),
    ),
  },
  business: {
    registrationNumber: "19462590",
    registry: "Živnostenský rejstřík",
    authority: "Frýdek-Místek",
    address: "M. Chasáka 3142, Frýdek-Místek, 738 01",
  },
  social: {
    linkedin: fromEnv(
      "SITE_LINKEDIN_URL",
      "https://www.linkedin.com/in/jakub-vantuch-552514197/",
    ),
    github: fromEnv("SITE_GITHUB_URL", "https://github.com/TurniXXD"),
    instagram: fromEnv(
      "SITE_INSTAGRAM_URL",
      "https://www.instagram.com/vantuch.dev/",
    ),
    telegram: fromEnv("SITE_TELEGRAM_URL", "https://t.me/turnix"),
  },
} as const;

export const contactMailto = (subject?: string) =>
  `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export const contactTel = () => `tel:${siteConfig.contact.phoneHref}`;
