import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import videoDobra4 from "@/assets/home-dobra-4.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HEYDT Esquadrias — Alto padrão em esquadrias e fachadas | Maravilha/SC" },
      {
        name: "description",
        content:
          "Esquadrias de alumínio, PVC, fachadas glazing e envidraçamento de sacada com engenharia própria. 47 anos entregando conforto e acabamento impecável.",
      },
    ],
  }),
  component: HomePage,
});

const solucoes = [
  {
    n: "01",
    tag: "Residencial",
    title: "Esquadrias em Alumínio e PVC de alto desempenho",
    desc: "Conforto térmico, acústico e acabamento à altura de projetos exigentes.",
  },
  {
    n: "02",
    tag: "Comercial",
    title: "Fachadas de Vidro e soluções robustas para negócios",
    desc: "Engenharia estrutural para grandes vãos e obras de alto padrão.",
  },
  {
    n: "03",
    tag: "Corporativo",
    title: "Divisórias que integram estética e privacidade",
    desc: "Sistemas inteligentes para escritórios modernos e produtivos.",
  },
  {
    n: "04",
    tag: "Área de lazer",
    title: "Envidraçamento de Sacada premium",
    desc: "Amplitude e proteção contra intempéries e ruídos urbanos.",
  },
];

const diferenciais = [
  {
    title: "Atendimento consultivo",
    desc: "Leitura técnica da planta, curadoria de sistemas e recomendação sob medida antes da execução.",
  },
  {
    title: "Garantia de qualidade",
    desc: "Fabricação própria, controle de processo em 13 setores e conformidade com normas técnicas.",
  },
  {
    title: "Logística própria",
    desc: "Centro de distribuição estratégico e frota dedicada, reduzindo prazos e riscos de transporte.",
  },
  {
    title: "Pós-venda afetivo",
    desc: "Acompanhamento contínuo após a entrega. Zero dor de cabeça, tranquilidade real.",
  },
];

function HomePage() {
  return (
    <SiteLayout hideNavOverHero>
      <Hero
        eyebrow="HEYDT · Esquadrias · Fachadas · Vidros"
        title={
          <>
            <span className="block whitespace-nowrap">O conforto e a sofisticação</span>
            <span className="block whitespace-nowrap">
              que o seu projeto{" "}
              <em className="font-display italic text-champagne">exige.</em>
            </span>
          </>
        }
        subtitle="Há mais de 47 anos, a HEYDT entrega engenharia, segurança e acabamento impecável em esquadrias e fachadas para as obras mais exigentes do Oeste catarinense."
        cta={
          <>
            <Link to="/fale-conosco" className="btn-primary bg-white text-primary hover:bg-white/90">
              Falar com um Especialista
            </Link>
            <Link
              to="/solucoes"
              className="btn-ghost border-white/30 text-white hover:bg-white/10"
            >
              Ver soluções
            </Link>
          </>
        }
        proofs={[
          "Mais de 47 anos de mercado",
          "Sede própria com 1.000 m² de parque fabril",
          "Engenharia e fabricação próprias",
        ]}
      />

      {/* SEÇÃO 2 — PORTFÓLIO */}
      <section className="grid-texture py-24 md:py-36">
        <div className="container-page">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-end">
            <Reveal>
              <SectionHeader
                eyebrow="Portfólio"
                title={
                  <>
                    Obras que contam a nossa história e{" "}
                    <em className="italic">valorizam o seu sonho.</em>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="text-base text-muted-foreground md:text-lg">
                A excelência da HEYDT presente nos projetos arquitetônicos mais sofisticados e
                desafiadores da região. Grandes vãos exigem grandes responsabilidades.
              </p>
            </Reveal>
          </div>

          {/* Editorial grid — placeholders sofisticados */}
          <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-6">
            {[
              { span: "md:col-span-7 aspect-[4/5] md:aspect-[16/12]", label: "Residencial · Alto padrão" },
              { span: "md:col-span-5 aspect-[4/5]", label: "Fachada Glazing" },
              { span: "md:col-span-5 aspect-[4/5]", label: "Envidraçamento de sacada" },
              { span: "md:col-span-7 aspect-[4/5] md:aspect-[16/10]", label: "Comercial · Alta performance" },
              { span: "md:col-span-12 aspect-[16/6]", label: "Projeto assinatura" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80} className={item.span}>
                <PortfolioPlaceholder label={item.label} index={i + 1} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <Link to="/solucoes" className="btn-ghost">
              Explorar nosso Portfólio Completo
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SEÇÃO 3 — SOLUÇÕES */}
      <section className="bg-surface py-24 md:py-36">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Nossas soluções"
              title={
                <>
                  Soluções completas e sob medida <br className="hidden md:block" />
                  <em className="italic">para cada etapa da sua obra.</em>
                </>
              }
              subtitle="Do projeto residencial ao corporativo, reunimos linhas desenvolvidas para unir desempenho térmico, acústico e design de ponta."
            />
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {solucoes.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="group bg-background p-8 md:p-12 transition-colors hover:bg-card">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-primary">{s.tag}</span>
                  <span className="font-display text-2xl text-muted-foreground/60">{s.n}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl leading-tight text-foreground md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">{s.desc}</p>
                <Link
                  to="/solucoes"
                  className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary link-underline"
                >
                  Conhecer linha
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/fale-conosco" className="btn-primary">
              Qual o perfil do seu projeto? Fale conosco
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SEÇÃO 4 — AUTORIDADE */}
      <section className="grid-texture-invert blue-glow bg-primary py-24 text-white md:py-36">
        <div className="container-page grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 lg:gap-24">
          <Reveal className="order-2 md:order-1">
            <SectionHeader
              invert
              eyebrow="Autoridade técnica"
              title={
                <>
                  Quem projeta o luxo, <br />
                  não abre mão da <em className="italic text-champagne">segurança HEYDT.</em>
                </>
              }
              subtitle="Ouça o que fazemos e entenda, na prática, os detalhes técnicos que fazem as nossas esquadrias durarem gerações."
            />
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/70">
              Do desenho arquitetônico à instalação, cada etapa é conduzida por especialistas
              treinados nos padrões europeus de acabamento e desempenho.
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-white/50">
              Detalhes técnicos · HEYDT
            </p>
          </Reveal>

          <Reveal delay={140} className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative w-full max-w-[320px] overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
              <video
                className="aspect-[9/16] w-full object-contain"
                src={videoDobra4.url}
                controls
                playsInline
                preload="metadata"
                poster=""
              />
            </div>
          </Reveal>
        </div>
      </section>


      {/* SEÇÃO 5 — DIFERENCIAIS */}
      <section className="grid-texture py-24 md:py-36">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              eyebrow="Por que HEYDT"
              title={
                <>
                  A tranquilidade de deixar a etapa mais crítica da sua obra{" "}
                  <em className="italic">nas mãos de quem entende.</em>
                </>
              }
              subtitle="O verdadeiro alto padrão é não ter dores de cabeça após a mudança. Conheça os pilares que nos sustentam."
            />
          </Reveal>

          <ul className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
            {diferenciais.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 90}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-display text-3xl text-primary">0{i + 1}</span>
                  <span className="block h-px flex-1 bg-border" />
                </div>
                <h3 className="font-display text-xl text-foreground">{d.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SEÇÃO 6 — FORMULÁRIO */}
      <section className="bg-surface py-24 md:py-36">
        <div className="container-page grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <Reveal>
            <SectionHeader
              eyebrow="Fale com um especialista"
              title={
                <>
                  Dê o primeiro passo para o <em className="italic">conforto definitivo</em> do seu projeto.
                </>
              }
              subtitle="Preencha as informações abaixo e um de nossos especialistas entrará em contato para alinhar os detalhes da sua obra."
            />
            <div className="mt-10 space-y-4 text-sm text-muted-foreground">
              <p><span className="eyebrow block mb-1">WhatsApp direto</span>(49) 98850-7286</p>
              <p><span className="eyebrow block mb-1">E-mail</span>jessica@esquadriasefachadas.com.br</p>
              <p><span className="eyebrow block mb-1">Sede</span>R. Paulino Francisco de Oliveira, 316 — Maravilha/SC</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function PortfolioPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-xl border border-border bg-muted">
      <div
        className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-[1.03]"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 10%, oklch(0.98 0.01 240) 0%, oklch(0.9 0.03 240) 40%, oklch(0.6 0.09 250) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 40px, oklch(0.2 0.05 250 / 0.15) 40px 41px)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <div>
          <span className="eyebrow text-primary">Obra {String(index).padStart(2, "0")}</span>
          <p className="mt-1 font-display text-xl text-foreground">{label}</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
          Em breve
        </span>
      </div>
    </div>
  );
}
