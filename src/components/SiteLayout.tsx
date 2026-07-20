import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

interface SiteLayoutProps {
  children: ReactNode;
  hideNavOverHero?: boolean;
}

export function SiteLayout({ children, hideNavOverHero = false }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar hideOverHero={hideNavOverHero} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
