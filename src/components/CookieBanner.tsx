import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "heydt.cookies.consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let handle: number | undefined;
    let idle: number | undefined;
    const show = () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          handle = window.setTimeout(() => setVisible(true), 1200);
        }
      } catch {
        setVisible(true);
      }
    };
    // Adia para depois do primeiro paint / idle — não bloqueia LCP.
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) {
      idle = ric(show, { timeout: 2500 });
    } else {
      handle = window.setTimeout(show, 1500);
    }
    return () => {
      if (handle) window.clearTimeout(handle);
      if (idle) (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idle);
    };
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
      className={`fixed inset-x-3 bottom-3 z-[80] md:inset-x-auto md:left-6 md:right-6 md:bottom-6 md:mx-auto md:max-w-2xl transition-all duration-300 ${
        leaving ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-primary/75 text-primary-foreground shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => dismiss("dismissed")}
          aria-label="Fechar aviso de cookies"
          className="absolute right-2 top-2 rounded-full p-1 text-primary-foreground/60 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-5 md:px-5 md:py-4">
          <div className="flex-1 pr-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--accent)]/80">Privacidade</p>
            <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">
              Utilizamos cookies para melhorar sua experiência. Ao continuar, você aceita nossa{" "}
              <Link
                to="/politica-de-privacidade"
                className="underline decoration-[color:var(--accent)]/50 underline-offset-2 hover:text-white"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Link
              to="/politica-de-privacidade"
              className="text-[10px] tracking-[0.15em] uppercase text-primary-foreground/60 transition hover:text-white"
            >
              Ver política
            </Link>
            <button
              type="button"
              onClick={() => dismiss("accepted")}
              className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-[10px] font-medium tracking-[0.15em] uppercase text-primary transition hover:opacity-90 active:scale-[0.98]"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
