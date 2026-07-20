import { useEffect, useRef, type ReactNode } from "react";
import heroImg from "@/assets/hero-home.jpg.asset.json";

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  proofs?: string[];
  imageUrl?: string;
  imageAlt?: string;
  overlay?: number; // 0..1
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  cta,
  proofs,
  imageUrl = heroImg.url,
  imageAlt = "Arquitetura de alto padrão HEYDT",
  overlay = 0.55,
}: HeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let mx = 0, my = 0, tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5;
      my = (e.clientY - rect.top) / rect.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      mx = 0; my = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.06) translate3d(${tx * -18}px, ${ty * -14}px, 0)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${tx * 8}px, ${ty * 6}px, 0)`;
      }
      if (Math.abs(mx - tx) > 0.002 || Math.abs(my - ty) > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight && imgRef.current) {
        imgRef.current.style.setProperty("--py", `${y * 0.15}px`);
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-primary text-white"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: "scale(1.06)" }}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
          style={{ transform: "translateY(var(--py, 0px))" }}
          loading="eager"
          fetchPriority="high"
          width={1600}
          height={1200}
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, oklch(0.14 0.05 255 / ${overlay * 0.7}) 0%, oklch(0.14 0.05 255 / ${overlay}) 55%, oklch(0.12 0.05 255 / ${Math.min(overlay + 0.25, 0.95)}) 100%)`,
        }}
      />

      {/* top bar with logo only over hero */}
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="container-page flex h-16 items-center justify-between text-white md:h-20">
          <span className="eyebrow text-white/70">HEYDT · Desde 1978</span>
          <a
            href="https://wa.me/5549988507286"
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs uppercase tracking-[0.2em] text-white/85 link-underline sm:inline"
          >
            (49) 98850-7286
          </a>
        </div>
      </div>

      <div ref={contentRef} className="container-page relative z-0 pb-16 pt-40 md:pb-24 md:pt-48">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="eyebrow mb-6 text-white/70 hairline">{eyebrow}</p>
          )}
          <h1 className="text-balance font-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[1.02] text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">{subtitle}</p>
          )}
          {cta && <div className="mt-10 flex flex-wrap items-center gap-4">{cta}</div>}
          {proofs && proofs.length > 0 && (
            <ul className="mt-12 grid gap-4 border-t border-white/15 pt-8 text-white/85 sm:grid-cols-3">
              {proofs.map((p) => (
                <li key={p} className="text-sm leading-snug">
                  <span className="mb-1 block h-px w-6 bg-champagne" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase">Role</span>
          <span className="block h-8 w-px animate-pulse bg-white/60" />
        </div>
      </div>
    </section>
  );
}
