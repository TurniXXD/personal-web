import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { AutomationPage } from "@/components/automation-page";
import { routing } from "@/i18n/routing";
import { automationPageCopy } from "@/lib/automation-content";
import { localizedPath } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const content = automationPageCopy[locale];
  const canonical = localizedPath(locale, "/automatizace");

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        cs: "/automatizace",
        en: "/en/automatizace",
        "x-default": "/automatizace",
      },
    },
    openGraph: {
      title: content.meta.title,
      description: content.meta.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
    },
  };
}

export default async function AutomationRoute({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <AutomationPage locale={locale} />;
}
