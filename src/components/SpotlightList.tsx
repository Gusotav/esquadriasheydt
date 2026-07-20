import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Item = { title: string; desc: string };

const HIGHLIGHT_MS = 3800;

export function SpotlightList({
  items,
  className = "",
  renderIndex,
}: {
  items: Item[];
  className?: string;
  renderIndex?: (i: number) => ReactNode;
}) {
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
      { threshold: 0.3 },
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
    <ul ref={ref} className={className}>
      {items.map((d, i) => {
        const isActive = i === active;
        const label = renderIndex ? renderIndex(i) : `0${i + 1}`;
        return (
          <Reveal
            as="li"
            key={d.title}
            delay={i * 90}
            className={[
              "relative rounded-2xl p-6 md:p-7 transition-all duration-700 ease-out",
              isActive
                ? "bg-primary text-primary-foreground shadow-[0_20px_50px_-25px_rgba(0,0,0,0.4)] -translate-y-1"
                : "bg-transparent translate-y-0",
            ].join(" ")}
          >
            <div className="mb-6 flex items-center gap-4">
              <span
                className={[
                  "font-display text-3xl transition-colors duration-700",
                  isActive ? "text-champagne" : "text-primary",
                ].join(" ")}
              >
                {label}
              </span>
              <span
                className={[
                  "block h-px flex-1 transition-colors duration-700",
                  isActive ? "bg-champagne/70" : "bg-border",
                ].join(" ")}
              />
            </div>
            <h3
              className={[
                "font-display text-xl transition-colors duration-700",
                isActive ? "text-primary-foreground" : "text-foreground",
              ].join(" ")}
            >
              {d.title}
            </h3>
            <p
              className={[
                "mt-3 text-sm transition-colors duration-700",
                isActive ? "text-primary-foreground/85" : "text-muted-foreground",
              ].join(" ")}
            >
              {d.desc}
            </p>
            <span
              aria-hidden
              className={[
                "pointer-events-none absolute inset-x-6 bottom-3 h-[2px] origin-left bg-champagne transition-transform ease-linear",
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
