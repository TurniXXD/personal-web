import {
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ActionLink } from "@vantuch/ui";
import { CookiePreferencesButton } from "@/components/cookie-consent";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServicesDropdown } from "@/components/services-dropdown";
import { copy, localizedPath, type Locale } from "@/lib/content";
import { contactMailto, contactTel, siteConfig } from "@/lib/site-config";

const ContactOrbit = dynamic(() =>
  import("@/components/contact-orbit").then((module) => module.ContactOrbit),
);
const ContactForm = dynamic(() =>
  import("@/components/contact-form").then((module) => module.ContactForm),
);

export function SiteHeader({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: string;
}) {
  const t = copy[locale];
  const otherLocale = locale === "cs" ? "en" : "cs";
  const servicesActive =
    path === "/automatizace" || path.startsWith("/sluzby/");
  const serviceLinks = [
    {
      href: "/sluzby/webove-aplikace",
      label: locale === "cs" ? "Weby a aplikace" : "Websites and apps",
      description:
        locale === "cs"
          ? "Weby, portály a aplikace na míru"
          : "Custom websites, portals and applications",
    },
    {
      href: "/automatizace",
      label: locale === "cs" ? "Automatizace procesů" : "Process automation",
      description:
        locale === "cs"
          ? "Méně ruční práce a propojené systémy"
          : "Less manual work and connected systems",
    },
    {
      href: "/sluzby/ai-reseni",
      label: locale === "cs" ? "AI řešení" : "AI solutions",
      description:
        locale === "cs"
          ? "Praktická práce s daty a dokumenty"
          : "Practical work with data and documents",
    },
    {
      href: "/sluzby/vernostni-programy",
      label:
        locale === "cs"
          ? "Digitální věrnostní programy"
          : "Digital loyalty programmes",
      description:
        locale === "cs"
          ? "Odměny a návraty zákazníků"
          : "Rewards and returning customers",
    },
    {
      href: "/sluzby/darkove-poukazy",
      label: locale === "cs" ? "Dárkové poukazy" : "Gift vouchers",
      description:
        locale === "cs"
          ? "Online prodej, PDF a uplatnění"
          : "Online sales, PDFs and redemption",
    },
    {
      href: "/sluzby/audit-ai-aplikaci",
      label:
        locale === "cs"
          ? "Audit vibecoded aplikací"
          : "Vibecoded application audit",
      description:
        locale === "cs"
          ? "Bezpečnost, výkon a dokončení AI aplikací"
          : "Security, performance and AI app completion",
      icon: "shield" as const,
    },
  ];

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <a
          className="site-logo"
          href={localizedPath(locale)}
          aria-label="Jakub Vantuch — Digital Solutions Consultant"
        >
          <span className="site-logo__copy">
            <span className="site-logo__name">
              Jakub Vantuch<span className="site-logo__dot">.</span>
            </span>
            <span className="site-logo__subtitle">
              Digital Solutions Consultant
            </span>
          </span>
        </a>
        <nav
          className="site-header__nav"
          aria-label={locale === "cs" ? "Hlavní navigace" : "Main navigation"}
        >
          <ServicesDropdown
            active={servicesActive}
            label={t.nav.services}
            links={serviceLinks.map((item) => ({
              ...item,
              href: localizedPath(locale, item.href),
            }))}
          />
          <a href={localizedPath(locale, "#work")}>{t.nav.work}</a>
          <a href={localizedPath(locale, "#process")}>{t.nav.process}</a>
          <a href={localizedPath(locale, "#about")}>{t.nav.about}</a>
          <a
            href={localizedPath(locale, "/kontakt")}
            aria-current={path === "/kontakt" ? "page" : undefined}
          >
            {t.nav.contact}
          </a>
        </nav>
        <div className="site-header__actions">
          <a
            className="site-header__lang"
            href={localizedPath(otherLocale, path)}
            lang={otherLocale}
            hrefLang={otherLocale}
          >
            {t.nav.language}
          </a>
          <ActionLink
            href={localizedPath(locale, "#contact")}
            className="site-header__cta ui-action--icon-message"
          >
            {t.nav.consultation} <MessageCircle size={16} aria-hidden="true" />
          </ActionLink>
        </div>
        <details className="site-header__mobile">
          <summary aria-label={locale === "cs" ? "Otevřít menu" : "Open menu"}>
            <Menu size={21} aria-hidden="true" />
          </summary>
          <nav
            aria-label={
              locale === "cs" ? "Mobilní navigace" : "Mobile navigation"
            }
          >
            <details className="site-header__mobile-services">
              <summary>
                {t.nav.services}
                <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
              </summary>
              <div>
                {serviceLinks.map((item) => (
                  <a href={localizedPath(locale, item.href)} key={item.href}>
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.description}</small>
                    </span>
                  </a>
                ))}
              </div>
            </details>
            <a href={localizedPath(locale, "#work")}>{t.nav.work}</a>
            <a href={localizedPath(locale, "#process")}>{t.nav.process}</a>
            <a href={localizedPath(locale, "#about")}>{t.nav.about}</a>
            <a
              href={localizedPath(locale, "/kontakt")}
              aria-current={path === "/kontakt" ? "page" : undefined}
            >
              {t.nav.contact}
            </a>
            <a
              href={localizedPath(otherLocale, path)}
              lang={otherLocale}
              hrefLang={otherLocale}
            >
              {t.nav.language}
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function ContactBlock({
  locale,
  title,
  topic,
}: {
  locale: Locale;
  title?: string;
  topic?: string;
}) {
  const t = copy[locale].contact;

  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <ContactOrbit />
      <div className="site-container contact-section__inner">
        <ScrollReveal className="contact-section__intro">
          <p className="eyebrow eyebrow--light">{t.eyebrow}</p>
          <h2 id="contact-title">{title ?? t.title}</h2>
          <p>{t.text}</p>
        </ScrollReveal>
        <ScrollReveal className="contact-section__form-reveal" delay={60}>
          <ContactForm locale={locale} initialTopic={topic} />
        </ScrollReveal>
        <ScrollReveal className="contact-section__actions" delay={120}>
          <a href={contactMailto()}>
            {t.email}: {siteConfig.contact.email}{" "}
            <Send size={16} aria-hidden="true" />
          </a>
          <a href={contactTel()}>
            {t.phone}: {siteConfig.contact.phoneDisplay}{" "}
            <PhoneCall size={16} aria-hidden="true" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

type SiteFooterProps = { locale: Locale };

export const SiteFooter = ({ locale }: SiteFooterProps) => {
  const t = copy[locale].footer;
  const nav = copy[locale].nav;
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <div className="site-footer__brand">
          <a className="site-footer__name" href={localizedPath(locale)}>
            Jakub Vantuch<span>.</span>
          </a>
          <p>{t.line}</p>
          <a className="site-footer__email" href={contactMailto()}>
            <Mail size={16} aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
          <div className="site-footer__social">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} aria-hidden="true" /> LinkedIn
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} aria-hidden="true" /> Instagram
            </a>
          </div>
        </div>
        <nav
          className="site-footer__nav"
          aria-label={
            locale === "cs" ? "Navigace v patičce" : "Footer navigation"
          }
        >
          <a href={localizedPath(locale, "#services")}>{nav.services}</a>
          <a href={localizedPath(locale, "#work")}>{nav.work}</a>
          <a href={localizedPath(locale, "#process")}>{nav.process}</a>
          <a href={localizedPath(locale, "#about")}>{nav.about}</a>
          <a href={localizedPath(locale, "/kontakt")}>{nav.contact}</a>
        </nav>
        <div className="site-footer__bottom">
          <span>
            © {new Date().getFullYear()} Jakub Vantuch. {t.copyright}
          </span>
          <div className="site-footer__secondary">
            <a href={localizedPath(locale, "/privacy")}>{t.privacy}</a>
            <CookiePreferencesButton locale={locale} />
            <a href={localizedPath(locale, "/doporuceni")}>{t.referral}</a>
            <a href={localizedPath(locale, "#newsletter")}>
              {locale === "cs" ? "Newsletter" : "Newsletter"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
