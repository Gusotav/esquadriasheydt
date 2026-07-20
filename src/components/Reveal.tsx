import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "figure" | "li" | "p" | "h2" | "h3" | "span";
  style?: CSSProperties;
}

// Shared IntersectionObserver — evita criar dezenas de observers.
type Meta = { delay: number };
const registry = new WeakMap<Element, Meta>();
let sharedIO: IntersectionObserver | null = null;
let reducedMotion = false;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (sharedIO) return sharedIO;
  reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  sharedIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const meta = registry.get(el);
        const delay = meta?.delay ?? 0;
        if (reducedMotion || delay === 0) {
          el.classList.add("reveal-in");
        } else {
          window.setTimeout(() => el.classList.add("reveal-in"), delay);
        }
        sharedIO!.unobserve(el);
        registry.delete(el);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  return sharedIO;
}

export function Reveal({ children, className = "", delay = 0, as: Tag = "div", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io) {
      el.classList.add("reveal-in");
      return;
    }
    if (reducedMotion) {
      el.classList.add("reveal-in");
      return;
    }
    registry.set(el, { delay });
    io.observe(el);
    return () => {
      io.unobserve(el);
      registry.delete(el);
    };
  }, [delay]);

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
}
