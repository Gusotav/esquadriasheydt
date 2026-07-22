import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";
import heroSolucoes from "@/assets/hero-solucoes.jpg.asset.json";
import heroMobileImg from "@/assets/galeria/portfolio-20.webp.asset.json";
import residencial from "@/assets/obra-residencial-01.jpg.asset.json";
import comercial from "@/assets/obra-comercial-02.jpg.asset.json";
import corporativo from "@/assets/obra-comercial-01.jpg.asset.json";
import lazer from "@/assets/Galeria_7-2.jpg.asset.json";

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
    title: "O conforto que a sua família merece.",
    desc: "Esquadrias em alumínio e PVC de alto desempenho. Projetadas sob medida para unir design e durabilidade, com acabamento impecável do projeto à instalação.",
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
    <SiteLayout hideNavOverHero>
      <Hero
        eyebrow="Soluções HEYDT"
        title={
          <>
            <span className="block md:whitespace-nowrap">Soluções para projetos</span>
            <span className="block md:whitespace-nowrap">
              que <em className="font-display italic text-champagne">exigem mais.</em>
            </span>
          </>
        }
        subtitle="Do conforto térmico e acústico da sua residência à imponência estrutural das fachadas comerciais. Reunimos mais de 47 anos de engenharia para integrar estética, segurança e precisão em cada detalhe."
        imageUrl={heroSolucoes.url}
        imageUrlMobile={heroMobileImg.url}
        imageAlt="Fachada comercial em pele de vidro executada pela HEYDT"
        proofs={[
          "Alumínio, PVC e pele de vidro",
          "Engenharia sob medida para cada obra",
          "Instalação com equipe própria",
        ]}
      />


      {/* GRID DE SOLUÇÕES */}
      <section className="cv-auto py-20 md:py-28">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-0 p-6 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <Link to="/fale-conosco" className="btn-primary bg-white text-primary hover:bg-white/90">
                      Falar com especialista
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
                  <Link to="/fale-conosco" className="btn-primary">Falar com especialista</Link>
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
      <section className="blue-glow cv-auto bg-primary py-24 text-white md:py-32">
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
              Solicitar orçamento
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
