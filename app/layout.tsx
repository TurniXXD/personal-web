import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import { AppShell } from "@/components/app-shell";
import type { ChildrenProps } from "@/components/scene/types";
import "@/app/globals.scss";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.svg",
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
