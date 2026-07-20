import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import p1 from "@/assets/galeria/portfolio-1.webp.asset.json";
import p2 from "@/assets/galeria/portfolio-2.webp.asset.json";
import p3 from "@/assets/galeria/portfolio-3.webp.asset.json";
import p4 from "@/assets/galeria/portfolio-4.webp.asset.json";
import p5 from "@/assets/galeria/portfolio-5.webp.asset.json";
import p6 from "@/assets/galeria/portfolio-6.webp.asset.json";
import p7 from "@/assets/galeria/portfolio-7.webp.asset.json";
import p8 from "@/assets/galeria/portfolio-8.webp.asset.json";
import p9 from "@/assets/galeria/portfolio-9.webp.asset.json";
import p10 from "@/assets/galeria/portfolio-10.webp.asset.json";
import p11 from "@/assets/galeria/portfolio-11.webp.asset.json";
import p12 from "@/assets/galeria/portfolio-12.webp.asset.json";
import p13 from "@/assets/galeria/portfolio-13.webp.asset.json";
import p14 from "@/assets/galeria/portfolio-14.webp.asset.json";
import p15 from "@/assets/galeria/portfolio-15.webp.asset.json";
import p16 from "@/assets/galeria/portfolio-16.webp.asset.json";
import p17 from "@/assets/galeria/portfolio-17.webp.asset.json";
import p18 from "@/assets/galeria/portfolio-18.webp.asset.json";
import p19 from "@/assets/galeria/portfolio-19.webp.asset.json";
import p20 from "@/assets/galeria/portfolio-20.webp.asset.json";
import p21 from "@/assets/galeria/portfolio-21.webp.asset.json";
import p22 from "@/assets/galeria/portfolio-22.webp.asset.json";
import p23 from "@/assets/galeria/portfolio-23.webp.asset.json";
import p24 from "@/assets/galeria/portfolio-24.webp.asset.json";
import p25 from "@/assets/galeria/portfolio-25.webp.asset.json";
import p26 from "@/assets/galeria/portfolio-26.webp.asset.json";
import p27 from "@/assets/galeria/portfolio-27.webp.asset.json";
import p28 from "@/assets/galeria/portfolio-28.webp.asset.json";
import p29 from "@/assets/galeria/portfolio-29.webp.asset.json";
import p30 from "@/assets/galeria/portfolio-30.webp.asset.json";
import p31 from "@/assets/galeria/portfolio-31.webp.asset.json";
import p32 from "@/assets/galeria/portfolio-32.webp.asset.json";
import p33 from "@/assets/galeria/portfolio-33.webp.asset.json";
import p34 from "@/assets/galeria/portfolio-34.webp.asset.json";
import p35 from "@/assets/galeria/portfolio-35.webp.asset.json";
import p36 from "@/assets/galeria/portfolio-36.webp.asset.json";

type Item = { url: string; alt: string };

// 8 melhores obras primeiro — assinaturas premium, mix de residencial e corporativo.
const ALL: Item[] = [
  { url: p5.url, alt: "Escadaria em mármore com guarda-corpo de vidro" },
  { url: p2.url, alt: "Residência de alto padrão com pergolado metálico" },
  { url: p10.url, alt: "Residência assinatura em dois pavimentos" },
  { url: p11.url, alt: "Cabana A-frame com fachada envidraçada" },
  { url: p17.url, alt: "Lobby corporativo com pele de vidro estruturada" },
  { url: p9.url, alt: "Residência com piscina e grandes vãos envidraçados" },
  { url: p3.url, alt: "Grande vão de vidro integrando cozinha e sala" },
  { url: p15.url, alt: "Fachada residencial com deck de madeira e pedra" },
  // demais obras
  { url: p22.url, alt: "Vista superior de sala com escadaria em mármore" },
  { url: p21.url, alt: "Sala de estar com escada em mármore e guarda-corpo de vidro" },
  { url: p27.url, alt: "Fachada corporativa TenBrasil com pele de vidro espelhada" },
  { url: p24.url, alt: "Cabana A-frame com fachada envidraçada preta" },
  { url: p30.url, alt: "Deck coberto por pergolado de madeira e vidro" },
  { url: p14.url, alt: "Sala com pano de vidro e vista para o lago" },
  { url: p13.url, alt: "Sala integrada com portas de vidro para a piscina" },
  { url: p4.url, alt: "Fachada corporativa iluminada em concreto e madeira" },
  { url: p16.url, alt: "Entrada residencial com painel 3D e vidros amplos" },
  { url: p25.url, alt: "Pergolado metálico com ripado de madeira" },
  { url: p26.url, alt: "Residência branca com brises e amplos vãos" },
  { url: p32.url, alt: "Residência de dois pavimentos com pele de vidro e mármore" },
  { url: p34.url, alt: "Cobertura em vidro com estrutura de alumínio e madeira" },
  { url: p33.url, alt: "Fachada contemporânea com brises verticais de madeira" },
  { url: p18.url, alt: "Fachada comercial envidraçada — Grupo Cloud" },
  { url: p19.url, alt: "Fachada comercial OdontoTop com pele de vidro" },
  { url: p12.url, alt: "Escada em mármore com guarda-corpo de vidro" },
  { url: p28.url, alt: "Escada com guarda-corpo de vidro e parede de tijolos" },
  { url: p1.url, alt: "Fachada institucional Clínica Renal Oeste" },
  { url: p7.url, alt: "Fachada comercial iluminada — agência Sicredi" },
  { url: p6.url, alt: "Residência contemporânea com fachada em vidro" },
  { url: p23.url, alt: "Fachada Hospital do Dente com esquadrias verticais" },
  { url: p20.url, alt: "Fachada clínica SIEL & GERA com estrutura de vidro" },
  { url: p29.url, alt: "Residência com telhado alto e detalhes em tijolo" },
  { url: p31.url, alt: "Agência Sicredi com fachada de vidro e box móvel" },
  { url: p35.url, alt: "Sobrado com esquadrias pretas e detalhes em pedra" },
  { url: p36.url, alt: "Fachada institucional Doctor'Home com pele branca" },
  { url: p8.url, alt: "Porta pivotante em alumínio preto com veneziana" },
];

const INITIAL = 8;

// Desktop bento — ciclo de 8 tiles que tila perfeitamente em 4 colunas × 4 linhas.
const BENTO_DESKTOP = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-2 md:row-span-1",
];

// Cauda para quando o total não é múltiplo de 8 — preenche 4 colunas × 2 linhas com 4 itens.
const BENTO_DESKTOP_TAIL_4 = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

// Mobile bento — 2 colunas, ciclo de 4 itens.
const BENTO_MOBILE = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

function spanFor(index: number, total: number): string {
  const mobile = BENTO_MOBILE[index % BENTO_MOBILE.length];

  const fullCycles = Math.floor(total / BENTO_DESKTOP.length);
  const tailStart = fullCycles * BENTO_DESKTOP.length;
  const tailLen = total - tailStart;

  let desktop: string;
  if (index < tailStart) {
    desktop = BENTO_DESKTOP[index % BENTO_DESKTOP.length];
  } else if (tailLen === 4) {
    desktop = BENTO_DESKTOP_TAIL_4[index - tailStart];
  } else {
    // fallback — mantém o ciclo padrão
    desktop = BENTO_DESKTOP[index % BENTO_DESKTOP.length];
  }

  return `${mobile} ${desktop}`;
}

export function PortfolioGallery() {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = expanded ? ALL : ALL.slice(0, INITIAL);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + ALL.length) % ALL.length)),
    [],
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % ALL.length)),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove("lightbox-open");
    };
  }, [lightbox, close, prev, next]);

  return (
    <>
      <div className="mt-16 grid grid-cols-2 gap-2 [grid-auto-rows:150px] md:mt-24 md:grid-cols-4 md:gap-3 md:[grid-auto-rows:200px] xl:[grid-auto-rows:230px]">
        {items.map((item, i) => (
          <Reveal
            key={item.url}
            delay={(i % 4) * 60}
            className={`group relative overflow-hidden rounded-xl bg-muted ${spanFor(i, items.length)}`}
          >
            <button
              type="button"
              onClick={() => setLightbox(ALL.indexOf(item))}
              className="absolute inset-0 h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label={`Ampliar: ${item.alt}`}
            >
              <img
                src={item.url}
                alt={item.alt}
                loading={i < 4 ? "eager" : "lazy"}
                fetchPriority={i < 4 ? "high" : "low"}
                decoding="async"
                sizes="(min-width: 768px) 25vw, 50vw"
                width={800}
                height={600}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />

              {/* Indicativo sutil — sempre visível no mobile, só no hover no desktop */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/10 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white opacity-100 backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
              >
                <Expand className="h-3 w-3" />
                Ampliar
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {ALL.length > INITIAL && (
        <Reveal className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="btn-primary"
          >
            {expanded ? "Recolher galeria" : "Ver portfólio completo"}
          </button>
        </Reveal>
      )}

      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Imagem anterior"
            className="absolute left-3 md:left-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Próxima imagem"
            className="absolute right-3 md:right-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <figure
            className="relative flex h-full w-full items-center justify-center p-6 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={ALL[lightbox].url}
              alt={ALL[lightbox].alt}
              className="max-h-full max-w-full object-contain shadow-2xl"
            />
            <figcaption className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs text-white/80 backdrop-blur-sm">
              {lightbox + 1} / {ALL.length}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

