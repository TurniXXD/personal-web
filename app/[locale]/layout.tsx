import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { AppShell } from "@/components/app-shell";
import { HtmlLang } from "@/components/html-lang";
import { routing } from "@/i18n/routing";
import type { ChildrenProps } from "@/components/scene/types";

type LocaleLayoutProps = Readonly<
  ChildrenProps & {
    params: Promise<{
      locale: string;
    }>;
  }
>;

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
  params,
}: LocaleLayoutProps): Promise<Metadata> => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
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

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <HtmlLang locale={locale} />
      <AppShell>{children}</AppShell>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
