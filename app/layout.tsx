import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import AppShell from "@/components/AppShell";
import { UserProvider } from "@/lib/user-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGENT",
  description: "AGENT – dein Dashboard.",
};

// Zoomen bleibt bewusst erlaubt (Barrierefreiheit): kein maximum-scale, kein user-scalable=no.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={GeistSans.variable}>
      <body>
        <UserProvider>
          <AppShell>{children}</AppShell>
        </UserProvider>
      </body>
    </html>
  );
}
