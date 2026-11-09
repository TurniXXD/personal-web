import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { createSocialImage, socialImageSize } from "@/lib/site/social-image";

export const alt = "Jakub Vantuch — Digital Solutions Consultant";
export const size = socialImageSize;
export const contentType = "image/png";

// Render at build time so the deployed function never reads font files at runtime.
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type OpenGraphImageProps = { params: Promise<{ locale: string }> };

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return createSocialImage(locale);
}
