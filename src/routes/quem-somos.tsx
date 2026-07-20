import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import heroInterior from "@/assets/obra-interior-01.jpg.asset.json";
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
      { property: "og:image", content: heroInterior.url },
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
    <SiteLayout>
      {/* HERO institucional */}
      <section className="relative isolate overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroInterior.url}
            alt="Interior de projeto residencial de alto padrão"
            className="h-full w-full object-cover opacity-55"
            loading="eager"
            fetchPriority="high"
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary/85" />
        </div>
        <div className="container-page grid min-h-[70svh] items-end pb-16 pt-32 md:pb-24 md:pt-40">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6 text-white/70 hairline">Quem somos · Desde 1978</p>
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.05] text-white">
              A tradição de quem molda o alto padrão <em className="italic text-champagne">há mais de 45 anos.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
              Nossa história é construída sobre a precisão da engenharia, a robustez da nossa indústria
              e o compromisso inegociável com o conforto da sua família.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="py-24 md:py-36">
        <div className="container-page grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-20">
          <Reveal>
            <SectionHeader
              eyebrow="Nossa história"
              title={<>Mais de quatro décadas <em className="italic">entregando conforto.</em></>}
              subtitle="Fundada em 1978, em Maravilha-SC, a HEYDT ESQUADRIAS nasceu de uma base familiar sólida e cresceu para se tornar a principal referência em esquadrias de alumínio e PVC no Oeste catarinense."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl bg-black/5 shadow-xl ring-1 ring-border">
              <video
                className="aspect-[4/5] w-full object-cover md:aspect-[4/3]"
                src={videoHistoria.url}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORÇA DA ESTRUTURA */}
      <section className="bg-primary py-24 text-white md:py-36">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              invert
              eyebrow="Força da estrutura"
              title={<>Estrutura projetada para a <em className="italic text-champagne">máxima performance.</em></>}
              subtitle="Grandes projetos exigem alta capacidade de entrega. Conheça os números que garantem a nossa precisão técnica."
            />
          </Reveal>
          <ul className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
            {numeros.map((x, i) => (
              <Reveal as="li" key={x.label} delay={i * 100}>
                <p className="font-display text-[clamp(2.6rem,4.5vw,4rem)] text-champagne">{x.n}</p>
                <span className="mt-3 block h-px w-10 bg-white/40" />
                <p className="mt-4 text-sm text-white/80">{x.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 md:py-36">
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
            {valores.map((v, i) => (
              <Reveal as="li" key={v.n} delay={i * 80} className="bg-background p-8 md:p-10">
                <span className="font-display text-2xl text-primary">{v.n}</span>
                <h3 className="mt-6 font-display text-lg leading-tight text-foreground md:text-xl">
                  {v.t}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-36">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionHeader
              align="center"
              eyebrow="Próximo passo"
              title={<>Seu projeto de alto padrão exige a <em className="italic">segurança que a HEYDT construiu.</em></>}
              subtitle="Fale com nossos especialistas e descubra como nosso atendimento consultivo pode transformar a etapa de esquadrias da sua obra."
            />
            <div className="mt-10">
              <Link to="/fale-conosco" className="btn-primary">Agendar Atendimento Consultivo</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
