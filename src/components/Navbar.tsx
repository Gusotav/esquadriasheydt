import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-heydt-branca.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/solucoes", label: "Soluções" },
  { to: "/fale-conosco", label: "Fale Conosco" },
] as const;

interface NavbarProps {
  /** When true, navbar stays hidden until the user scrolls past ~90vh (hero) */
  hideOverHero?: boolean;
}

export function Navbar({ hideOverHero = false }: NavbarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(!hideOverHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hideOverHero) {
      setVisible(true);
      return;
    }
    const onScroll = () => {
      const threshold = Math.max(window.innerHeight * 0.85, 500);
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOverHero]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${hideOverHero ? "fixed" : "sticky"} inset-x-0 top-0 z-50 border-b border-white/10 bg-primary/95 text-primary-foreground backdrop-blur-md transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" className="flex shrink-0 items-center" aria-label="HEYDT Esquadrias — Home">
          <img
            src={logo.url}
            alt="HEYDT Esquadrias"
            width={140}
            height={44}
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[13px] tracking-[0.16em] uppercase transition-colors link-underline ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/fale-conosco"
          className="hidden shrink-0 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-primary md:inline-flex"
        >
          Falar com Especialista
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-primary md:hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="border-b border-white/10 py-3 text-sm tracking-[0.14em] uppercase text-white/80"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/fale-conosco" className="mt-4 inline-flex justify-center rounded-full border border-white/30 bg-white px-5 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-primary transition-colors hover:bg-white/90">
            Falar com Especialista
          </Link>
        </nav>
      </div>
    </header>
  );
}
