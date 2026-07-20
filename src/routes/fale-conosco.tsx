import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
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
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 60% at 20% 20%, oklch(0.55 0.16 240 / 0.6) 0%, transparent 60%), radial-gradient(60% 50% at 80% 100%, oklch(0.82 0.055 80 / 0.18) 0%, transparent 70%), oklch(0.16 0.05 255)",
            }}
          />
        </div>
        <div className="container-page grid min-h-[55svh] items-end pb-16 pt-32 md:pb-20 md:pt-40">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6 text-white/70 hairline">Fale conosco</p>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">
              Dê o primeiro passo para o <em className="italic text-champagne">conforto definitivo</em> do seu projeto.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
              Fale com nossos especialistas e descubra a solução ideal em alumínio, PVC ou fachadas
              de vidro para obras que exigem precisão, segurança e um acabamento impecável.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORMULÁRIO + CONTATOS */}
      <section className="py-20 md:py-28">
        <div className="container-page grid gap-16 md:grid-cols-[1.15fr_1fr] md:gap-24">
          <Reveal>
            <SectionHeader
              eyebrow="Atendimento consultivo"
              title={<>Um especialista <em className="italic">para o seu projeto.</em></>}
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
                },
                {
                  label: "E-mail comercial",
                  value: "jessica@esquadriasefachadas.com.br",
                  href: "mailto:jessica@esquadriasefachadas.com.br",
                },
                {
                  label: "Instagram",
                  value: "@heydtesquadrias",
                  href: "https://instagram.com/heydtesquadrias",
                },
              ].map((c) => (
                <li key={c.label} className="flex flex-col gap-1 py-6">
                  <span className="eyebrow">{c.label}</span>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg text-foreground link-underline md:text-xl"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
              <span className="eyebrow text-primary">Sede HEYDT</span>
              <p className="mt-4 text-lg leading-snug text-foreground">
                R. Paulino Francisco de Oliveira, 316
                <br />
                Maravilha/SC — CEP 89874-000
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=R.+Paulino+Francisco+de+Oliveira,+316+Maravilha+SC"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary link-underline"
              >
                Traçar rota
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
