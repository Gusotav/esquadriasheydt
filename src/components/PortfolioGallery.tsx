import { useMemo, useState } from "react";
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

type Orient = "landscape" | "portrait";
type Item = { url: string; alt: string; o: Orient };

/**
 * Ordem intencional: intercalando landscape / portrait para que o algoritmo
 * de grid consiga fechar cada linha em 12 colunas sem espaços vazios.
 * Novas fotos: apenas anexar ao final; buildRows se reorganiza.
 */
const ALL: Item[] = [
  { url: p1.url, alt: "Fachada institucional Clínica Renal Oeste", o: "landscape" },
  { url: p3.url, alt: "Grande vão de vidro integrando cozinha e sala", o: "portrait" },
  { url: p5.url, alt: "Escadaria em mármore com guarda-corpo de vidro", o: "portrait" },
  { url: p2.url, alt: "Residência de alto padrão com pergolado metálico", o: "landscape" },
  { url: p7.url, alt: "Fachada comercial iluminada — agência Sicredi", o: "portrait" },
  { url: p4.url, alt: "Fachada corporativa iluminada em concreto e madeira", o: "landscape" },
  { url: p6.url, alt: "Residência contemporânea com fachada em vidro", o: "portrait" },
  { url: p8.url, alt: "Porta pivotante em alumínio preto com veneziana", o: "portrait" },
  { url: p9.url, alt: "Residência com piscina e grandes vãos envidraçados", o: "landscape" },
  { url: p10.url, alt: "Projeto residencial assinatura", o: "landscape" },
];

const INITIAL = 8;

export function PortfolioGallery() {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? ALL : ALL.slice(0, INITIAL);
  const rows = useMemo(() => buildRows(items), [items]);

  return (
    <>
      <div className="mt-16 flex flex-col gap-2 md:mt-24 md:gap-3">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-12 gap-2 md:gap-3">
            {row.map((cell, ci) => (
              <Reveal
                key={`${ri}-${ci}`}
                delay={ci * 80}
                className={`${cell.spanClass} group relative overflow-hidden rounded-xl bg-muted`}
                style={{ aspectRatio: cell.aspect }}
              >
                <img
                  src={cell.item.url}
                  alt={cell.item.alt}
                  loading={ri === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
              </Reveal>
            ))}
          </div>
        ))}
      </div>

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

type Cell = { item: Item; spanClass: string; aspect: string };

/**
 * Agrupa itens em linhas de 12 colunas sem sobras.
 * Cada padrão foi calibrado para que as cells de uma mesma linha tenham
 * exatamente a mesma altura (ex.: 8u landscape 4/3 = 6u tall; 4u portrait 2/3 = 6u tall).
 */
function buildRows(items: Item[]): Cell[][] {
  const rows: Cell[][] = [];
  let i = 0;
  while (i < items.length) {
    const a = items[i];
    const b = items[i + 1];
    const c = items[i + 2];

    // 3 portraits alinhados → col-span-4 cada, aspect 2/3
    if (a?.o === "portrait" && b?.o === "portrait" && c?.o === "portrait") {
      rows.push([
        cell(a, "col-span-12 md:col-span-4", "2 / 3"),
        cell(b, "col-span-12 md:col-span-4", "2 / 3"),
        cell(c, "col-span-12 md:col-span-4", "2 / 3"),
      ]);
      i += 3;
      continue;
    }
    // landscape + portrait → 8 + 4 (mesma altura)
    if (a?.o === "landscape" && b?.o === "portrait") {
      rows.push([
        cell(a, "col-span-12 md:col-span-8", "4 / 3"),
        cell(b, "col-span-12 md:col-span-4", "2 / 3"),
      ]);
      i += 2;
      continue;
    }
    if (a?.o === "portrait" && b?.o === "landscape") {
      rows.push([
        cell(a, "col-span-12 md:col-span-4", "2 / 3"),
        cell(b, "col-span-12 md:col-span-8", "4 / 3"),
      ]);
      i += 2;
      continue;
    }
    // 2 landscapes → 6 + 6, aspect 3/2 (perfeito para landscape)
    if (a?.o === "landscape" && b?.o === "landscape") {
      rows.push([
        cell(a, "col-span-12 md:col-span-6", "3 / 2"),
        cell(b, "col-span-12 md:col-span-6", "3 / 2"),
      ]);
      i += 2;
      continue;
    }
    // 2 portraits → 6 + 6, aspect 3/4 (leve corte lateral, altura maior = destaque)
    if (a?.o === "portrait" && b?.o === "portrait") {
      rows.push([
        cell(a, "col-span-12 md:col-span-6", "3 / 4"),
        cell(b, "col-span-12 md:col-span-6", "3 / 4"),
      ]);
      i += 2;
      continue;
    }
    // Item sozinho no final → full width
    if (a) {
      rows.push([
        cell(a, "col-span-12", a.o === "landscape" ? "16 / 9" : "3 / 4"),
      ]);
      i += 1;
    }
  }
  return rows;
}

function cell(item: Item, spanClass: string, aspect: string): Cell {
  return { item, spanClass, aspect };
}
