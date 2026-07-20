import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { Hero } from "@/components/Hero";
import heroFaleConosco from "@/assets/hero-fale-conosco.jpg.asset.json";
import heroMobileImg from "@/assets/galeria/portfolio-17.webp.asset.json";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/fale-conosco")({
  head: () => ({
    meta: [
      { title: "Fale Conosco — HEYDT Esquadrias | Atendimento Consultivo" },
      {
        name: "description",
        content:
          "Fale com nossos especialistas em esquadrias, fachadas e vidros. Atendimento consultivo para obras residenciais e comerciais de alto padrão.",
      },
      { property: "og:title", content: "Fale Conosco — HEYDT Esquadrias" },
    ],
  }),
  component: FaleConosco,
});

function FaleConosco() {
  return (
    <SiteLayout hideNavOverHero>
      <Hero
        eyebrow="Fale conosco"
        title={
          <>
            <span className="block md:hidden">Dê o primeiro</span>
            <span className="block md:hidden">passo para o</span>
            <span className="block md:hidden">
              <em className="font-display italic text-champagne">conforto definitivo.</em>
            </span>
            <span className="hidden md:block md:whitespace-nowrap">Dê o primeiro passo para</span>
            <span className="hidden md:block md:whitespace-nowrap">
              o <em className="font-display italic text-champagne">conforto definitivo.</em>
            </span>
          </>
        }
        subtitle="Fale com nossos especialistas e descubra a solução ideal em alumínio, PVC ou fachadas de vidro para obras que exigem precisão, segurança e um acabamento impecável."
        imageUrl={heroFaleConosco.url}
        imageUrlMobile={heroMobileImg.url}
        imageAlt="Residência de alto padrão com esquadrias HEYDT"
        proofs={[
          "Atendimento consultivo dedicado",
          "Retorno em até 1 dia útil",
          "Sede em Maravilha/SC",
        ]}
      />


      {/* FORMULÁRIO + CONTATOS */}
      <section className="py-20 md:py-28">
        <div className="container-page grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-24">
          <Reveal>
            <SectionHeader
              eyebrow="Atendimento consultivo"
              title={<>Um especialista <em className="italic">para o<br className="md:hidden" /> seu projeto.</em></>}
              subtitle="Preencha o formulário e receba o retorno da nossa equipe consultiva."
            />
            <div className="mt-10 rounded-2xl border border-border bg-card p-8 md:p-12">
              <LeadForm cta="Solicitar Atendimento Exclusivo" />
            </div>
          </Reveal>

          <Reveal delay={120} className="md:pt-6">
            <span className="eyebrow">Canais diretos</span>
            <h3 className="mt-4 font-display text-2xl leading-tight md:text-3xl">
              Prefere falar diretamente com a nossa equipe?
            </h3>
            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              Utilize nossos canais diretos ou venha nos fazer uma visita à sede em Maravilha/SC.
            </p>

            <ul className="mt-10 divide-y divide-border border-y border-border">
              {[
                {
                  label: "WhatsApp / Telefone",
                  value: "(49) 98850-7286",
                  href: "https://wa.me/5549988507286",
                  icon: Phone,
                },
                {
                  label: "E-mail comercial",
                  value: "jessica@esquadriasefachadas.com.br",
                  href: "mailto:jessica@esquadriasefachadas.com.br",
                  icon: Mail,
                },
                {
                  label: "Instagram",
                  value: "@heydtesquadrias",
                  href: "https://instagram.com/heydtesquadrias",
                  icon: Instagram,
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="py-6">
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-4"
                    >
                      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="eyebrow">{c.label}</span>
                        <span className="break-all text-base text-foreground link-underline md:text-xl">
                          {c.value}
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="eyebrow text-primary">Sede HEYDT</span>
                  <p className="mt-2 text-lg leading-snug text-foreground">
                    R. Paulino Francisco de Oliveira, 316
                    <br />
                    Maravilha/SC — CEP 89874-000
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=R.+Paulino+Francisco+de+Oliveira,+316+Maravilha+SC"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary link-underline"
                  >
                    Traçar rota
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
