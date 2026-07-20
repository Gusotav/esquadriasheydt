import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import residencial from "@/assets/obra-residencial-01.jpg.asset.json";
import comercial from "@/assets/obra-comercial-02.jpg.asset.json";
import corporativo from "@/assets/obra-comercial-01.jpg.asset.json";
import lazer from "@/assets/obra-especial-01.jpg.asset.json";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções em Esquadrias e Fachadas — HEYDT" },
      {
        name: "description",
        content:
          "Esquadrias em alumínio e PVC, fachadas em pele de vidro, divisórias corporativas e envidraçamento de sacada com engenharia HEYDT.",
      },
      { property: "og:title", content: "Soluções HEYDT — Esquadrias, Fachadas e Vidros" },
      { property: "og:image", content: residencial.url },
    ],
  }),
  component: Solucoes,
});

const solucoes = [
  {
    id: "residencial",
    tag: "Residencial · Alumínio e PVC",
    title: "O conforto definitivo que a sua família merece.",
    desc: "Esquadrias em alumínio e PVC de altíssimo desempenho térmico e acústico. Projetadas sob medida para integrar a estética sofisticada do seu projeto com a paz de espírito de um acabamento impecável e à prova de dores de cabeça.",
    img: residencial.url,
  },
  {
    id: "comercial",
    tag: "Comercial · Fachadas",
    title: "A imponência e a credibilidade que o seu negócio exige.",
    desc: "Fachadas em pele de vidro e estruturas em alumínio de alta resistência. Engenharia robusta executada com a precisão e a segurança que grandes vãos e obras comerciais de alto padrão demandam.",
    img: comercial.url,
  },
  {
    id: "corporativo",
    tag: "Divisórias corporativas",
    title: "Elegância, integração e privacidade para o seu ambiente corporativo.",
    desc: "Sistemas inteligentes que dividem espaços mantendo a amplitude visual e garantindo o isolamento acústico necessário. A solução perfeita para escritórios modernos, funcionais e produtivos.",
    img: corporativo.url,
  },
  {
    id: "envidracamento",
    tag: "Envidraçamento de sacada",
    title: "Amplitude e proteção para você viver sua sacada o ano inteiro.",
    desc: "Sistemas de envidraçamento premium que bloqueiam intempéries e ruídos urbanos. Transforme sua varanda ou área de lazer em um ambiente sofisticado, seguro e altamente aconchegante, independentemente da estação do ano.",
    img: lazer.url,
  },
];

function Solucoes() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 -z-10 opacity-45">
          <img
            src={comercial.url}
            alt="Fachada de vidro HEYDT"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1600}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/90" />
        </div>
        <div className="container-page grid min-h-[65svh] items-end pb-16 pt-32 md:pb-24 md:pt-40">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6 text-white/70 hairline">Soluções HEYDT</p>
            <h1 className="font-display text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[1.05]">
              Soluções em esquadrias e sistemas para projetos que <em className="italic text-champagne">exigem mais.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
              Do conforto térmico e acústico para a sua residência à imponência estrutural das
              fachadas comerciais. Reunimos mais de 47 anos de engenharia para integrar estética,
              segurança e precisão em cada detalhe.
            </p>
            <nav className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em]">
              {solucoes.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-white/25 px-4 py-2 text-white/85 transition hover:border-white hover:bg-white/10"
                >
                  {s.tag.split(" · ")[0]}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* GRID DE SOLUÇÕES */}
      <section className="py-20 md:py-28">
        <div className="container-page space-y-20 md:space-y-32">
          {solucoes.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`grid scroll-mt-24 gap-10 md:grid-cols-2 md:items-center md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="group relative overflow-hidden rounded-2xl bg-muted shadow-xl ring-1 ring-border">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] md:aspect-[4/4]"
                    loading="lazy"
                    width={1200}
                    height={1500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link to="/fale-conosco" className="btn-primary bg-white text-primary hover:bg-white/90">
                      Fale agora com especialista
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <span className="eyebrow text-primary">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>
                <h2 className="mt-5 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.1]">
                  {s.title}
                </h2>
                <p className="mt-5 text-base text-muted-foreground md:text-lg">{s.desc}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/fale-conosco" className="btn-primary">Fale agora com especialista</Link>
                  <a href={`#${solucoes[(i + 1) % solucoes.length].id}`} className="btn-ghost">
                    Próxima linha
                  </a>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="blue-glow bg-primary py-24 text-white md:py-32">
        <div className="container-page grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Reveal>
            <SectionHeader
              invert
              eyebrow="CTA final"
              title={<>Qual é o perfil do seu <em className="italic text-champagne">próximo projeto?</em></>}
              subtitle="Nossos especialistas estão prontos para oferecer um atendimento consultivo, entendendo a planta da sua obra e indicando a solução ideal em alumínio, PVC ou vidro."
            />
          </Reveal>
          <Reveal delay={100} className="flex md:justify-end">
            <Link to="/fale-conosco" className="btn-primary bg-white text-primary hover:bg-white/90">
              Solicitar Orçamento Exclusivo
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
