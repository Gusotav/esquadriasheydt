import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "heydt.cookies.consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const t = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: "accepted" | "dismissed") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 280);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className={`fixed inset-x-3 bottom-3 z-[80] md:inset-x-auto md:left-6 md:right-6 md:bottom-6 md:mx-auto md:max-w-3xl transition-all duration-300 ${
        leaving ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-primary/95 text-primary-foreground shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => dismiss("dismissed")}
          aria-label="Fechar aviso de cookies"
          className="absolute right-3 top-3 rounded-full p-1.5 text-primary-foreground/70 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6 md:p-6">
          <div className="flex-1 pr-6">
            <p className="eyebrow text-[color:var(--accent)]">Privacidade</p>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              Utilizamos cookies para melhorar sua experiência, medir desempenho e
              otimizar campanhas. Ao continuar navegando, você concorda com nossa{" "}
              <Link
                to="/politica-de-privacidade"
                className="underline decoration-[color:var(--accent)]/60 underline-offset-4 hover:text-white"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center gap-3">
            <Link
              to="/politica-de-privacidade"
              className="text-xs tracking-[0.18em] uppercase text-primary-foreground/70 transition hover:text-white"
            >
              Ver política
            </Link>
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="group relative overflow-hidden rounded-full bg-[color:var(--accent)] px-6 py-2.5 text-xs font-medium tracking-[0.18em] uppercase text-primary transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">Aceitar</span>
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
