import { useEffect, useRef, type ReactNode } from "react";
import heroImg from "@/assets/hero-home-v2.jpg.asset.json";

interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  cta?: ReactNode;
  proofs?: string[];
  imageUrl?: string;
  imageAlt?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  cta,
  proofs,
  imageUrl = heroImg.url,
  imageAlt = "Arquitetura de alto padrão HEYDT",
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
        contentRef.current.style.transform = `translate3d(${tx * 6}px, ${ty * 4}px, 0)`;
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
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#171310] text-white"
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
          width={1920}
          height={1080}
        />
      </div>

      {/* Camadas de overlay sofisticadas — azul escuro da marca */}
      {/* 1. Sombra inferior profunda para ancorar o texto */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.36 0.14 255 / 0.15) 0%, oklch(0.36 0.14 255 / 0.38) 45%, oklch(0.2 0.08 255 / 0.9) 100%)",
        }}
      />
      {/* 2. Vinheta lateral esquerda para legibilidade do bloco de texto */}
      <div
        className="absolute inset-y-0 left-0 -z-10 w-3/4"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.2 0.08 255 / 0.82) 0%, oklch(0.36 0.14 255 / 0.38) 45%, oklch(0.36 0.14 255 / 0) 100%)",
        }}
      />
      {/* 3. Vinheta radial sutil de profundidade azulada */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 70%, oklch(0.15 0.06 255 / 0.45) 0%, oklch(0.36 0.14 255 / 0) 60%)",
        }}
      />
      {/* 4. Fade discreto no topo para respiro atrás da navbar */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-40"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.05 255 / 0.65) 0%, oklch(0.36 0.14 255 / 0) 100%)",
        }}
      />
      {/* 5. Grão sutil para textura editorial */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Top bar removida — a Navbar do site já ocupa esse espaço sobre o hero */}


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
          <h1 className="font-display font-light text-[clamp(2.2rem,5.8vw,5rem)] leading-[1.06] tracking-[-0.01em] text-white [text-shadow:0_2px_30px_rgb(0_0_0/0.55)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-white/85 md:text-lg [text-shadow:0_1px_18px_rgb(0_0_0/0.55)]">
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
                  <span className="text-[13px] font-medium leading-snug text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.5)]">
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
