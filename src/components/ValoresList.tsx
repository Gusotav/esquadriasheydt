import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Valor = { n: string; t: string; d: string };

const HIGHLIGHT_MS = 4200;

export function ValoresList({ items }: { items: Valor[] }) {
  const [active, setActive] = useState<number>(-1);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    setActive(0);
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, HIGHLIGHT_MS);
    return () => clearInterval(id);
  }, [started, items.length]);

  return (
    <ul
      ref={ref}
      className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((v, i) => {
        const isActive = i === active;
        return (
          <Reveal
            as="li"
            key={v.n}
            delay={i * 80}
            className={[
              "relative p-8 md:p-10 transition-colors duration-700 ease-out",
              isActive ? "bg-primary text-primary-foreground" : "bg-background",
            ].join(" ")}
          >
            <span
              className={[
                "font-display text-2xl transition-colors duration-700",
                isActive ? "text-[hsl(var(--champagne))]" : "text-primary",
              ].join(" ")}
            >
              {v.n}
            </span>
            <h3
              className={[
                "mt-6 font-display text-lg leading-tight md:text-xl transition-colors duration-700",
                isActive ? "text-primary-foreground" : "text-foreground",
              ].join(" ")}
            >
              {v.t}
            </h3>
            <p
              className={[
                "mt-3 text-sm transition-colors duration-700",
                isActive ? "text-primary-foreground/85" : "text-muted-foreground",
              ].join(" ")}
            >
              {v.d}
            </p>
            <span
              aria-hidden
              className={[
                "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[hsl(var(--champagne))] transition-transform ease-linear",
                isActive ? "scale-x-100" : "scale-x-0",
              ].join(" ")}
              style={{ transitionDuration: isActive ? `${HIGHLIGHT_MS}ms` : "300ms" }}
            />
          </Reveal>
        );
      })}
    </ul>
  );
}
