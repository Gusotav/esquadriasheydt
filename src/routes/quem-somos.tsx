import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";

import { CountUpStats } from "@/components/CountUpStats";
import heroQuemSomos from "@/assets/hero-quem-somos.jpg.asset.json";
import heroMobileImg from "@/assets/galeria/portfolio-5.webp.asset.json";
import videoHistoria from "@/assets/quem-somos-dobra-2.mp4.asset.json";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — HEYDT Esquadrias | Tradição desde 1978" },
      {
        name: "description",
        content:
          "Fundada em 1978 em Maravilha/SC, a HEYDT reúne 47 anos de tradição, parque fabril próprio e mais de 50 especialistas dedicados ao alto padrão.",
      },
      { property: "og:title", content: "Quem Somos — HEYDT Esquadrias" },
      { property: "og:image", content: heroQuemSomos.url },
    ],
  }),
  component: QuemSomos,
});

const numeros = [
  { n: "47+", label: "anos de tradição e expertise técnica" },
  { n: "1.000m²", label: "de parque fabril próprio e moderno" },
  { n: "50+", label: "especialistas em 13 setores operacionais" },
  { n: "100%", label: "logística e distribuição próprias" },
];

const valores = [
  { n: "01", t: "Experiência e personalização", d: "Cada projeto é uma nova assinatura. Curadoria técnica sob medida do briefing à instalação." },
  { n: "02", t: "Ética e transparência", d: "Comunicação clara em cada etapa. O que combinamos é o que entregamos." },
  { n: "03", t: "Sinergia e fator humano", d: "Time treinado, relações duradouras com arquitetos, construtores e clientes." },
  { n: "04", t: "Prosperidade e evolução", d: "Investimento contínuo em tecnologia, capacitação e novas linhas de produto." },
];

function QuemSomos() {
  return (
    <SiteLayout hideNavOverHero>
      <Hero
        eyebrow="Quem somos · Desde 1978"
        title={
          <>
            <span className="block md:hidden">A tradição de quem</span>
            <span className="block md:hidden">molda o alto padrão</span>
            <span className="block md:hidden">
              <em className="font-display italic text-champagne">há 47 anos.</em>
            </span>
            <span className="hidden md:block md:whitespace-nowrap">A tradição de quem molda</span>
            <span className="hidden md:block md:whitespace-nowrap">
              o alto padrão{" "}
              <em className="font-display italic text-champagne">há 47 anos.</em>
            </span>
          </>
        }
        subtitle="Nossa história é construída sobre a precisão da engenharia, a robustez da nossa indústria e o compromisso inegociável com o conforto da sua família."
        imageUrl={heroQuemSomos.url}
        imageUrlMobile={heroMobileImg.url}
        imageAlt="Equipe HEYDT Esquadrias na sede em Maravilha/SC"
        proofs={[
          "Fundada em 1978, em Maravilha/SC",
          "50+ especialistas em 13 setores",
          "Parque fabril próprio de 1.000 m²",
        ]}
      />


      {/* HISTÓRIA */}
      <section className="py-24 md:py-36">
        <div className="container-page grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-20">
          <Reveal>
            <SectionHeader
              eyebrow="Nossa história"
              title={<>Mais de quatro décadas <em className="italic">entregando conforto.</em></>}
              subtitle="Fundada em 1978, em Maravilha-SC, a HEYDT ESQUADRIAS nasceu de uma base familiar sólida e cresceu para se tornar a principal referência em esquadrias de alumínio e PVC no Oeste catarinense."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto w-full max-w-[360px]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-black shadow-xl ring-1 ring-border">
                <video
                  className="absolute inset-0 h-full w-full object-contain"
                  src={videoHistoria.url}
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* FORÇA DA ESTRUTURA */}
      <section className="grid-texture-invert blue-glow bg-primary py-24 text-white md:py-36">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              invert
              className="text-center md:text-left"
              eyebrow="Força da estrutura"
              title={<>Estrutura projetada para a <em className="italic text-champagne">máxima performance.</em></>}
              subtitle="Grandes projetos exigem alta capacidade de entrega. Conheça os números que garantem a nossa precisão técnica."
            />
          </Reveal>
          <CountUpStats items={numeros} centered />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="grid-texture py-24 md:py-36">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Manifesto"
              title={<>O propósito que guia <em className="italic">cada um de nossos projetos.</em></>}
            />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
            {[
              {
                t: "Missão",
                d: "Ser uma organização que entende os anseios de seus clientes e os traduz nas melhores soluções em esquadrias, sempre atenta a tudo que há de inovador e sofisticado para garantir beleza, conforto e segurança em cada uma de suas execuções.",
              },
              {
                t: "Visão",
                d: "Ser reconhecida como uma empresa de referência desde o atendimento consultivo, prestado antes de cada execução, até o primor dos acabamentos na conclusão dos serviços, gerando uma experiência única de consumo ao cliente.",
              },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 120}>
                <article className="h-full rounded-2xl border border-border bg-card p-10 md:p-14">
                  <span className="eyebrow text-primary">{b.t}</span>
                  <p className="mt-6 font-display text-xl leading-[1.35] text-foreground md:text-2xl">
                    {b.d}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="bg-surface py-24 md:py-36">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Valores"
              title={<>Os princípios que <em className="italic">não negociamos.</em></>}
            />
          </Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <li key={v.n} className="bg-background p-8 md:p-10">
                <span className="font-display text-2xl text-primary">{v.n}</span>
                <h3 className="mt-6 font-display text-lg leading-tight text-foreground md:text-xl">
                  {v.t}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="grid-texture py-24 md:py-36">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionHeader
              align="center"
              eyebrow="Próximo passo"
              title={
                <>
                  <span className="block md:whitespace-nowrap">Seu projeto de alto padrão exige a</span>
                  <span className="block md:whitespace-nowrap">
                    <em className="italic">segurança que a HEYDT construiu.</em>
                  </span>
                </>
              }
              subtitle="Fale com nossos especialistas e descubra como nosso atendimento consultivo pode transformar a etapa de esquadrias da sua obra."
            />
            <div className="mt-10">
              <Link to="/fale-conosco" className="btn-primary">Agendar atendimento</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
