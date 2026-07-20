import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

export type SolucaoItem = {
  n: string;
  tag: string;
  title: string;
  desc: string;
};

const INTERVAL_MS = 4200;

export function SolucoesGrid({ items }: { items: SolucaoItem[] }) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !inView) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, inView, items.length]);

  return (
    <div
      ref={containerRef}
      className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2"
    >
      {items.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.n}
            className={[
              "group relative overflow-hidden p-8 md:p-12",
              "transition-[background-color,color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              "hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)]",
              isActive
                ? "bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_-30px_rgba(0,0,0,0.6)] md:scale-[1.005]"
                : "bg-background text-foreground hover:bg-surface",
            ].join(" ")}
          >
            {/* subtle inner glow when active */}
            <span
              aria-hidden
              className={[
                "pointer-events-none absolute inset-0 transition-opacity duration-700",
                isActive ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={{
                background:
                  "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, white 10%, transparent), transparent 60%)",
              }}
            />

            <div className="relative flex items-baseline justify-between">
              <span
                className={[
                  "eyebrow transition-colors duration-700",
                  isActive ? "text-champagne" : "text-primary",
                ].join(" ")}
              >
                {s.tag}
              </span>
              <span
                className={[
                  "font-display text-2xl transition-colors duration-700",
                  isActive ? "text-white/70" : "text-muted-foreground/60",
                ].join(" ")}
              >
                {s.n}
              </span>
            </div>

            <h3
              className={[
                "relative mt-8 font-display text-2xl leading-tight md:text-3xl transition-colors duration-700",
                isActive ? "text-white" : "text-foreground",
              ].join(" ")}
            >
              {s.title}
            </h3>

            <p
              className={[
                "relative mt-4 max-w-md text-sm md:text-base transition-colors duration-700",
                isActive ? "text-white/85" : "text-muted-foreground",
              ].join(" ")}
            >
              {s.desc}
            </p>

            <Link
              to="/solucoes"
              className={[
                "relative mt-8 inline-flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.2em] transition-colors duration-700",
                isActive
                  ? "text-champagne"
                  : "text-primary link-underline",
              ].join(" ")}
            >
              Conhecer linha
              <span
                aria-hidden
                className={[
                  "inline-block transition-transform duration-500",
                  isActive ? "translate-x-1" : "translate-x-0",
                ].join(" ")}
              >
                →
              </span>
            </Link>

            {/* progress bar bottom */}
            <span
              aria-hidden
              className={[
                "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-champagne/80 transition-opacity duration-500",
                isActive && !reducedMotion ? "opacity-100" : "opacity-0",
              ].join(" ")}
              style={
                isActive && !reducedMotion
                  ? {
                      animation: `solucoes-progress ${INTERVAL_MS}ms linear forwards`,
                    }
                  : undefined
              }
            />
          </div>
        );
      })}

      <style>{`
        @keyframes solucoes-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
