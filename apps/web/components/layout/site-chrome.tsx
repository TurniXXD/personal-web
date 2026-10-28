import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ActionLink } from "@vantuch/ui";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactOrbit } from "@/components/contact/contact-orbit";
import { CookiePreferencesButton } from "@/components/layout/cookie-consent";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ScrollAwareHeader } from "@/components/layout/scroll-aware-header";
import { ServicesDropdown } from "@/components/layout/services-dropdown";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { copy, localizedPath, type Locale } from "@/lib/content";
import type { ContactRequestType } from "@/lib/contact-submission";
import { contactMailto, contactTel, siteConfig } from "@/lib/site-config";

const LazyContactOrbit = dynamic(() => Promise.resolve({ default: ContactOrbit }));
const LazyContactForm = dynamic(() => Promise.resolve({ default: ContactForm }));

export function SiteHeader({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: string;
}) {
  const t = copy[locale];
  const otherLocale = locale === "cs" ? "en" : "cs";
  const languageHref = localizedPath(otherLocale, path);
  const languageShortLabel = locale === "cs" ? "EN" : "CZ";
  const languageAriaLabel =
    locale === "cs" ? "EN – Přepnout do angličtiny" : "CZ – Switch to Czech";
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
    <ScrollAwareHeader>
      <div className="site-container site-header__inner flex min-h-[5.6rem] items-center justify-between gap-8">
        <a
          className="site-logo inline-flex shrink-0 items-center gap-[0.72rem] text-base font-extrabold tracking-[-0.04em]"
          href={localizedPath(locale)}
          aria-label="Jakub Vantuch — Digital Solutions Consultant"
        >
          <span className="site-logo__copy grid gap-[0.16rem]">
            <span className="site-logo__name leading-none">
              Jakub Vantuch
              <span className="site-logo__dot text-primary">.</span>
            </span>
            <span className="site-logo__subtitle text-[0.59rem] leading-[1.2] font-semibold tracking-[0.015em] text-[#56617f]">
              Digital Solutions Consultant
            </span>
          </span>
        </a>
        <nav
          className="site-header__nav flex items-center gap-[clamp(1.05rem,2.2vw,2rem)] [&_a]:text-[0.78rem] [&_a]:font-bold [&_a]:text-[#59617d] [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-primary [&_a[aria-current=page]]:text-primary"
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
        <div className="site-header__actions flex items-center gap-[1.2rem]">
          <a
            aria-label={languageAriaLabel}
            className="site-header__lang site-header__language-toggle"
            href={languageHref}
            lang={otherLocale}
            hrefLang={otherLocale}
          >
            {languageShortLabel}
          </a>
          <ActionLink
            href={localizedPath(locale, "#contact")}
            className="site-header__cta ui-action--icon-message min-h-[2.65rem] px-[0.95rem] text-[0.74rem]"
          >
            {t.nav.consultation} <MessageCircle size={16} aria-hidden="true" />
          </ActionLink>
        </div>
        <div className="site-header__mobile-controls">
          <a
            aria-label={languageAriaLabel}
            className="site-header__language-toggle"
            href={languageHref}
            lang={otherLocale}
            hrefLang={otherLocale}
          >
            {languageShortLabel}
          </a>
          <MobileNavigation
            menuButtonLabel={locale === "cs" ? "Otevřít menu" : "Open menu"}
            navigationLabel={
              locale === "cs" ? "Mobilní navigace" : "Mobile navigation"
            }
            servicesLabel={t.nav.services}
            serviceLinks={serviceLinks.map((item) => ({
              ...item,
              href: localizedPath(locale, item.href),
            }))}
            links={[
              { href: localizedPath(locale, "#work"), label: t.nav.work },
              {
                href: localizedPath(locale, "#process"),
                label: t.nav.process,
              },
              { href: localizedPath(locale, "#about"), label: t.nav.about },
              {
                href: localizedPath(locale, "/kontakt"),
                label: t.nav.contact,
                ariaCurrent: path === "/kontakt" ? "page" : undefined,
              },
            ]}
          />
        </div>
      </div>
    </ScrollAwareHeader>
  );
}

export function ContactBlock({
  locale,
  eyebrow,
  title,
  description,
  topic,
  requestType,
}: {
  locale: Locale;
  eyebrow?: string;
  title?: string;
  description?: string;
  topic?: string;
  requestType?: ContactRequestType;
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
          <p className="eyebrow eyebrow--light">{eyebrow ?? t.eyebrow}</p>
          <h2 id="contact-title">{title ?? t.title}</h2>
          <p>{description ?? t.text}</p>
        </ScrollReveal>
        <ScrollReveal className="contact-section__form-reveal" delay={60}>
          <ContactForm
            locale={locale}
            initialTopic={topic}
            requestType={requestType}
          />
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
    <footer className="site-footer border-t border-[rgba(188,196,255,0.16)] bg-[#171e3c] text-white">
      <div className="site-container site-footer__inner grid grid-cols-[minmax(12rem,1fr)_minmax(0,2fr)] gap-x-12 gap-y-8 pt-12 pb-[1.35rem] max-[900px]:grid-cols-1">
        <div className="site-footer__brand min-w-0">
          <a
            className="site-footer__name inline-block text-[1.3rem] font-extrabold tracking-[-0.05em] text-white"
            href={localizedPath(locale)}
          >
            Jakub Vantuch<span className="text-primary">.</span>
          </a>
          <p className="mt-3 max-w-[17rem] text-[0.82rem] leading-[1.65] text-[#b7bfdf]">
            {t.line}
          </p>
          <a
            className="site-footer__email mt-[1.15rem] inline-flex max-w-full items-center gap-2 text-[0.9rem] font-bold text-white underline decoration-[rgba(174,184,255,0.55)] underline-offset-[0.22em] [overflow-wrap:anywhere] hover:decoration-white"
            href={contactMailto()}
          >
            <Mail size={16} aria-hidden="true" />
            {siteConfig.contact.email}
          </a>
          <div className="site-footer__social mt-4 flex flex-wrap gap-x-[1.2rem] gap-y-[0.65rem] max-[600px]:mt-8 max-[600px]:mb-5 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-[0.4rem] [&_a]:text-[0.79rem] [&_a]:text-[#b7bfdf] [&_a:hover]:text-white">
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
          className="site-footer__nav flex flex-wrap items-start justify-end gap-x-6 gap-y-[0.9rem] max-[900px]:justify-start [&_a]:text-[0.79rem] [&_a]:leading-[1.45] [&_a]:text-[#b7bfdf] [&_a:hover]:text-white"
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
        <div className="site-footer__bottom col-span-full mt-[clamp(1.5rem,3vw,2.5rem)] flex justify-between gap-6 border-t border-[rgba(188,196,255,0.18)] pt-[1.35rem] text-[0.73rem] text-[#929cbd] max-[460px]:flex-col max-[460px]:gap-2">
          <span>
            © {new Date().getFullYear()} Jakub Vantuch. {t.copyright}
          </span>
          <div className="site-footer__secondary flex flex-wrap gap-x-[1.4rem] gap-y-[0.65rem] [&_a]:text-[0.73rem] [&_a]:leading-[1.45] [&_a]:text-[#b7bfdf] [&_a:hover]:text-white">
            <a href={localizedPath(locale, "/privacy")}>{t.privacy}</a>
            <CookiePreferencesButton locale={locale} />
            <a href={localizedPath(locale, "/doporuceni")}>{t.referral}</a>
            <a href={localizedPath(locale, "#newsletter")}>{t.community}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
