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

type Orient = "landscape" | "portrait";
type Item = { url: string; alt: string; o: Orient };

// Ordem calibrada para preencher a grade sem espaços vazios.
// A cada 3 pares (landscape + portrait) + 1 par (portrait + portrait wide)
// completamos um bloco de 8. Novas fotos apenas anexam ao array.
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

  return (
    <>
      <div className="mt-16 grid grid-cols-12 gap-2 md:mt-24 md:gap-3">
        {items.map((it, i) => (
          <GalleryCell key={i} item={it} index={i} total={items.length} />
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

/**
 * Regras de layout (mobile-first):
 *  - mobile: 1 coluna, cada foto ocupa 12 cols com sua proporção nativa (sem corte).
 *  - md+: grid de 12 cols. Pareamos landscape (8) + portrait (4), aspect calibrado
 *    para que a altura de ambos coincida (4/3 * 8u == 3/2 * 4u), zero gap.
 *  - A cada 4 itens temos "row landscape+portrait" alternando lados.
 *  - Sobras de portraits no fim são exibidas em 2 col-span-6 aspect 3/2 (portrait grande),
 *    ou em faixa de col-span-4 aspect 2/3 se sobrar múltiplo de 3, sempre fechando 12.
 */
function GalleryCell({ item, index, total }: { item: Item; index: number; total: number }) {
  const layout = computeLayout(index, total, item.o);

  return (
    <Reveal
      delay={(index % 4) * 80}
      className={`${layout.mobile} ${layout.desktop} group relative overflow-hidden rounded-xl bg-muted`}
    >
      <div style={{ aspectRatio: layout.aspect }} className="relative h-full w-full">
        <img
          src={item.url}
          alt={item.alt}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
        />
      </div>
    </Reveal>
  );
}

function computeLayout(index: number, total: number, o: Orient) {
  // Mobile: sempre full-width, sem corte forçado — usamos aspect natural aproximado
  const mobile = "col-span-12";
  const mobileAspect = o === "landscape" ? "3 / 2" : "3 / 4";

  // Desktop: encaixe em blocos de 4 itens (landscape 8 + portrait 4, alternando).
  // Se houver "sobras" no final que não fecham 12 cols, entramos no modo tail:
  const remaining = total - index;
  const positionInBlock = index % 4;

  // Detecta se estamos nos últimos itens que não formam bloco completo.
  const inTail = total - (index - positionInBlock) < 4;

  if (!inTail) {
    // Blocos regulares de 4 itens: [L,P,P,L] alternado por linha
    // Linha 1: L(8) + P(4)  → itens 0,1
    // Linha 2: P(4) + L(8)  → itens 2,3 (invertido) — usamos ordem de dados assim:
    //   0=L,1=P,2=P,3=L  (garante que row 2 comece com portrait à esquerda)
    if (o === "landscape") {
      return { mobile, mobileAspect, desktop: "md:col-span-8", aspect: `4 / 3` };
    }
    return { mobile, mobileAspect, desktop: "md:col-span-4", aspect: `2 / 3` };
  }

  // Tail: 1, 2 ou 3 itens restantes
  const tailCount = remaining;
  if (tailCount === 1) {
    return { mobile, mobileAspect, desktop: "md:col-span-12", aspect: `16 / 6` };
  }
  if (tailCount === 2) {
    // 2 itens: cada um col-span-6, aspect 3/2 (bom para landscape, aceitável para portrait)
    return {
      mobile,
      mobileAspect,
      desktop: "md:col-span-6",
      aspect: o === "landscape" ? "3 / 2" : "1 / 1",
    };
  }
  // 3 itens
  return {
    mobile,
    mobileAspect,
    desktop: "md:col-span-4",
    aspect: o === "landscape" ? "4 / 3" : "2 / 3",
  };
}
