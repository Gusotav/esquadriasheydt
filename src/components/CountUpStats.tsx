import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Stat = { n: string; label: string };

function parseStat(raw: string) {
  const match = raw.match(/^([\d.,]+)(.*)$/);
  if (!match) return { target: 0, suffix: raw, useThousands: false, decimals: 0 };
  const numericStr = match[1];
  const suffix = match[2];
  const useThousands = numericStr.includes(".") || numericStr.includes(",");
  const target = parseInt(numericStr.replace(/[.,]/g, ""), 10);
  return { target, suffix, useThousands, decimals: 0 };
}

function format(value: number, useThousands: boolean) {
  const rounded = Math.round(value);
  return useThousands ? rounded.toLocaleString("pt-BR") : String(rounded);
}

const DURATION_MS = 1500;
const GAP_MS = 250;

export function CountUpStats({ items }: { items: Stat[] }) {
  const parsed = items.map((it) => ({ ...it, parsed: parseStat(it.n) }));
  const [values, setValues] = useState<number[]>(() => items.map(() => 0));
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));
  const ref = useRef<HTMLUListElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            runSequence();
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animateOne(index: number): Promise<void> {
    return new Promise((resolve) => {
      const target = parsed[index].parsed.target;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = target * eased;
        setValues((prev) => {
          const next = prev.slice();
          next[index] = current;
          return next;
        });
        if (t < 1) requestAnimationFrame(step);
        else {
          setDone((prev) => {
            const next = prev.slice();
            next[index] = true;
            return next;
          });
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  async function runSequence() {
    for (let i = 0; i < parsed.length; i++) {
      await animateOne(i);
      await new Promise((r) => setTimeout(r, GAP_MS));
    }
  }

  return (
    <ul ref={ref} className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
      {parsed.map((x, i) => {
        const isActive = !done[i] && values[i] > 0;
        return (
          <Reveal as="li" key={x.label} delay={i * 100}>
            <p
              className={[
                "font-display text-[clamp(2.6rem,4.5vw,4rem)] text-champagne transition-transform duration-500",
                isActive ? "scale-[1.06]" : "scale-100",
              ].join(" ")}
            >
              {format(values[i], x.parsed.useThousands)}
              {x.parsed.suffix}
            </p>
            <span
              className={[
                "mt-3 block h-px origin-left bg-white/40 transition-all duration-700",
                done[i] ? "w-16 bg-champagne/80" : isActive ? "w-16" : "w-10",
              ].join(" ")}
            />
            <p className="mt-4 text-sm text-white/80">{x.label}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}
