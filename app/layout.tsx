import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { AppShell } from "@/components/app-shell";
import type { ChildrenProps } from "@/components/pipeline/types";
import messages from "@/messages/en.json";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: messages.Metadata.title,
  description: messages.Metadata.description,
};

type RootLayoutProps = Readonly<ChildrenProps>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="site-bg">
          <div className="site-bg__blur site-bg__blur--primary" />
          <div className="site-bg__blur site-bg__blur--secondary" />
        </div>
        <NextIntlClientProvider locale="en" messages={messages}>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
