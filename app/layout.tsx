import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import { AppShell } from "@/components/app-shell";
import type { ChildrenProps } from "@/components/scene/types";
import "@/app/globals.scss";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Metadata");
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    icons: {
      icon: "/favicon.svg",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
};

type RootLayoutProps = Readonly<ChildrenProps>;

const RootLayout = async ({ children }: RootLayoutProps) => {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <Script
          id="cloudflare-web-analytics"
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a3aed3e49da84a789c911037547a662a"}'
        />
        <div className="site-bg">
          <div className="site-bg__blur site-bg__blur--primary" />
          <div className="site-bg__blur site-bg__blur--secondary" />
        </div>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              borderRadius: "1rem",
            },
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
