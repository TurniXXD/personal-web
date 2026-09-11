import Script from "next/script";
import { getLocale } from "next-intl/server";
import { AppToaster } from "@/components/app-toaster";
import type { ChildrenProps } from "@/components/scene/types";
import "@/app/globals.scss";

type RootLayoutProps = Readonly<ChildrenProps>;

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jakub Vantuch",
  url: "https://www.vantuch.dev",
  jobTitle: "Software Developer",
  description:
    "Software developer with 5+ years of experience building web applications and systems. Exploring data analysis, mathematical biology, biomedicine, IoT and physical prototyping.",
  email: "mailto:contact@vantuch.dev",
  telephone: "+420735023812",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Masaryk University",
  },
  knowsLanguage: ["cs", "en"],
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Full-Stack Development",
    "Data Analysis",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Go",
    "Python",
    "SQL",
    "PostgreSQL",
    "APIs",
    "System Design",
    "Integrations",
    "Docker",
    "Linux",
    "CI/CD",
    "IoT",
    "ESP32",
    "Electronics",
    "Sensors",
    "3D Printing",
    "CAD",
    "Mathematical Biology",
    "Biomedicine",
    "Biomedical Research",
    "Experimental Work",
  ],
  sameAs: [
    "https://github.com/TurniXXD",
    "https://www.linkedin.com/in/jakub-vantuch-552514197/",
    "https://t.me/turnix",
  ],
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <Script
          id="cloudflare-web-analytics"
          strategy="lazyOnload"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a3aed3e49da84a789c911037547a662a"}'
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <div className="site-bg">
          <div className="site-bg__blur site-bg__blur--primary" />
          <div className="site-bg__blur site-bg__blur--secondary" />
        </div>
        <AppToaster />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
