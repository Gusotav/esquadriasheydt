import { useState } from "react";
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

type Item = { url: string; alt: string };

const ALL: Item[] = [
  { url: p1.url, alt: "Fachada institucional Clínica Renal Oeste" },
  { url: p2.url, alt: "Residência de alto padrão com pergolado metálico" },
  { url: p3.url, alt: "Grande vão de vidro integrando cozinha e sala" },
  { url: p5.url, alt: "Escadaria em mármore com guarda-corpo de vidro" },
  { url: p7.url, alt: "Fachada comercial iluminada — agência Sicredi" },
  { url: p4.url, alt: "Fachada corporativa iluminada em concreto e madeira" },
  { url: p9.url, alt: "Residência com piscina e grandes vãos envidraçados" },
  { url: p6.url, alt: "Residência contemporânea com fachada em vidro" },
  { url: p10.url, alt: "Residência assinatura em dois pavimentos" },
  { url: p15.url, alt: "Fachada residencial com deck de madeira e pedra" },
  { url: p16.url, alt: "Entrada residencial com painel 3D e vidros amplos" },
  { url: p11.url, alt: "Cabana A-frame com fachada envidraçada" },
  { url: p13.url, alt: "Sala integrada com portas de vidro para a piscina" },
  { url: p14.url, alt: "Sala com pano de vidro e vista para o lago" },
  { url: p12.url, alt: "Escada em mármore com guarda-corpo de vidro" },
  { url: p17.url, alt: "Lobby corporativo com pele de vidro estruturada" },
  { url: p18.url, alt: "Fachada comercial envidraçada — Grupo Cloud" },
  { url: p8.url, alt: "Porta pivotante em alumínio preto com veneziana" },
];

const INITIAL = 8;

// Bento mosaic para exatamente 8 tiles — 4 cols × 4 rows, sem espaços vazios.
const BENTO = [
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2", // 1 — destaque grande
  "col-span-2 row-span-1 md:col-span-1 md:row-span-1", // 2
  "col-span-2 row-span-2 md:col-span-1 md:row-span-2", // 3 — portrait
  "col-span-2 row-span-1 md:col-span-1 md:row-span-1", // 4
  "col-span-2 row-span-2 md:col-span-1 md:row-span-2", // 5 — portrait
  "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 6 — landscape
  "col-span-2 row-span-2 md:col-span-1 md:row-span-2", // 7 — portrait
  "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 8 — landscape
];

export function PortfolioGallery() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="mt-16 grid grid-cols-4 grid-rows-8 gap-2 md:mt-24 md:aspect-[5/4] md:grid-cols-4 md:grid-rows-4 md:gap-3">
        {ALL.slice(0, INITIAL).map((item, i) => (
          <Reveal
            key={item.url}
            delay={(i % 4) * 80}
            className={`group relative overflow-hidden rounded-xl bg-muted ${BENTO[i]}`}
          >
            <img
              src={item.url}
              alt={item.alt}
              loading={i < 4 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
            />
          </Reveal>
        ))}
      </div>

      {expanded && (
        <div className="mt-3 grid grid-cols-2 gap-2 md:mt-3 md:grid-cols-4 md:gap-3">
          {ALL.slice(INITIAL).map((item, i) => (
            <Reveal
              key={item.url}
              delay={(i % 4) * 80}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <img
                src={item.url}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      )}

      {ALL.length > INITIAL && (
        <Reveal className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="btn-ghost"
          >
            {expanded ? "Recolher galeria" : "Explorar nosso Portfólio Completo"}
          </button>
        </Reveal>
      )}
    </>
  );
}
