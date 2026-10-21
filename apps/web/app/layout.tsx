import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import "@vantuch/ui/styles.css";
import "@/app/globals.css";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
