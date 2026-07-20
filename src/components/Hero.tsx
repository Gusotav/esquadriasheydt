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
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-primary text-white"
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

      {/* Overlay cinematográfico: vinheta assimétrica reforçada à esquerda + degradês */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at 25% 55%, oklch(0.12 0.05 255 / ${Math.min(overlay + 0.15, 0.9)}) 0%, oklch(0.10 0.04 255 / ${Math.min(overlay + 0.25, 0.94)}) 60%, oklch(0.08 0.04 255 / ${Math.min(overlay + 0.35, 0.96)}) 100%)`,
        }}
      />
      <div
        className="absolute inset-y-0 left-0 -z-10 w-2/3"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.09 0.04 255 / 0.75) 0%, oklch(0.09 0.04 255 / 0) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-56"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.04 255 / 0.85) 0%, oklch(0.10 0.04 255 / 0) 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-72"
        style={{
          background:
            "linear-gradient(0deg, oklch(0.08 0.04 255 / 0.85) 0%, oklch(0.08 0.04 255 / 0) 100%)",
        }}
      />

      {/* top bar with logo only over hero */}
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="container-page flex h-16 items-center justify-between text-white md:h-20">
          <span className="eyebrow text-white/85">HEYDT · Desde 1978</span>
          <a
            href="https://wa.me/5549988507286"
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs uppercase tracking-[0.2em] text-white link-underline sm:inline"
          >
            (49) 98850-7286
          </a>
        </div>
      </div>

      <div
        ref={contentRef}
        className="container-page relative z-0 flex w-full flex-col items-start px-6 py-32 text-left md:py-40"
      >
        <div className="flex w-full max-w-3xl flex-col items-start">
          {eyebrow && (
            <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white backdrop-blur-md">
              <span className="block h-px w-6 bg-champagne" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance font-display font-light text-[clamp(2.6rem,6.2vw,5.5rem)] leading-[1.04] tracking-[-0.01em] text-white [text-shadow:0_2px_30px_rgb(0_0_0/0.45)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-white/90 md:text-lg [text-shadow:0_1px_18px_rgb(0_0_0/0.5)]">
              {subtitle}
            </p>
          )}
          {cta && (
            <div className="mt-10 flex flex-wrap items-center gap-4">{cta}</div>
          )}
          {proofs && proofs.length > 0 && (
            <ul className="mt-14 grid w-full max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md sm:grid-cols-3">
              {proofs.map((p) => (
                <li
                  key={p}
                  className="flex flex-col items-start gap-3 bg-white/5 px-5 py-6 text-left"
                >
                  <span className="block h-px w-8 bg-champagne" />
                  <span className="text-[13px] font-medium leading-snug text-white">{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase">Role</span>
          <span className="block h-8 w-px animate-pulse bg-white/70" />
        </div>
      </div>
    </section>
  );
}

