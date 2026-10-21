import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/marketing-page";
import { routing } from "@/i18n/routing";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <MarketingPage locale={locale} />;
}
