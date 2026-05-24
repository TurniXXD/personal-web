import Script from "next/script";
import { Toaster } from "sonner";
import type { ChildrenProps } from "@/components/scene/types";
import "@/app/globals.scss";

type RootLayoutProps = Readonly<ChildrenProps>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Script
          id="cloudflare-web-analytics"
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "a3aed3e49da84a789c911037547a662a"}'
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jakub Vantuch",
              url: "https://www.vantuch.dev",
              sameAs: [
                "https://github.com/TurniXXD",
                "https://www.linkedin.com/in/jakub-vantuch-552514197/",
                "https://t.me/turnix",
              ],
            }),
          }}
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
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
