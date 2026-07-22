import { useEffect, useRef, type ReactNode } from "react";
import heroImg from "@/assets/hero-home-v2.jpg.asset.json";
import heroMobileImg from "@/assets/galeria/portfolio-5.webp.asset.json";

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  proofs?: string[];
  imageUrl?: string;
  imageUrlMobile?: string;
  imageAlt?: string;
}


export function Hero({
  eyebrow,
  title,
  subtitle,
  cta,
  proofs,
  imageUrl = heroImg.url,
  imageUrlMobile = heroMobileImg.url,
  imageAlt = "Arquitetura de alto padrão HEYDT",
}: HeroProps) {

  const ref = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip mouse parallax on touch/coarse pointers e reduced motion.
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let raf = 0;
    let rect = el.getBoundingClientRect();
    let mx = 0, my = 0, tx = 0, ty = 0;

    const onResize = () => { rect = el.getBoundingClientRect(); };

    const onMove = (e: MouseEvent) => {
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
        contentRef.current.style.transform = `translate3d(${tx * 6}px, ${ty * 4}px, 0)`;
      }
      if (Math.abs(mx - tx) > 0.002 || Math.abs(my - ty) > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    // Parallax de scroll leve — rAF throttled, apenas enquanto o hero está visível.
    let scrollRaf = 0;
    let visible = true;
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 })
      : null;
    io?.observe(el);

    const onScroll = () => {
      if (scrollRaf || !visible || reduced) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const y = window.scrollY;
        if (y < window.innerHeight && imgRef.current) {
          imgRef.current.style.setProperty("--py", `${y * 0.15}px`);
        }
      });
    };

    if (finePointer && !reduced) {
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#171310] text-white"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ transform: "scale(1.06)" }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={imageUrlMobile} />
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover"
            style={{ transform: "translateY(var(--py, 0px))" }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />
        </picture>
      </div>


      {/* Overlay unificado — 1 camada só, gradiente composto (era 5 divs) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.05 255 / 0.55) 0%, oklch(0.36 0.14 255 / 0) 18%, oklch(0.36 0.14 255 / 0.28) 55%, oklch(0.2 0.08 255 / 0.9) 100%), linear-gradient(90deg, oklch(0.2 0.08 255 / 0.78) 0%, oklch(0.36 0.14 255 / 0.32) 45%, oklch(0.36 0.14 255 / 0) 80%)",
        }}
      />

      <div
        ref={contentRef}
        className="container-page relative z-0 flex w-full flex-col items-start px-6 py-32 text-left md:py-40"
      >
        <div className="flex w-full max-w-3xl flex-col items-start">
          {eyebrow && (
            <p className="mb-8 inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.36em] text-white/85">
              <span className="block h-px w-10 bg-champagne" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance font-display font-light text-[clamp(2.25rem,5.6vw,5rem)] leading-[1.06] tracking-[-0.01em] text-white [text-shadow:0_3px_40px_rgb(0_0_0/0.65)] md:leading-[1.08] md:[text-shadow:0_2px_30px_rgb(0_0_0/0.55)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-10 max-w-[52ch] text-balance text-[17px] leading-[1.7] text-white/90 md:max-w-[48ch] md:text-lg md:leading-[1.75] [text-shadow:0_1px_22px_rgb(0_0_0/0.45)]">
              {subtitle}
            </p>
          )}
          {cta && (
            <div className="mt-10 flex flex-wrap items-center gap-4">{cta}</div>
          )}
          {proofs && proofs.length > 0 && (
            <ul className="mt-16 flex w-full max-w-2xl flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:gap-10">
              {proofs.map((p) => (
                <li
                  key={p}
                  className="flex flex-1 flex-col items-start gap-3 text-left"
                >
                  <span className="block h-px w-6 bg-champagne" />
                   <span className="text-[14px] font-medium leading-snug text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.5)] md:text-[15px]">
                    {p}
                  </span>
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
