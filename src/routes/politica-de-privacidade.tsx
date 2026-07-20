import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | HEYDT Esquadrias" },
      {
        name: "description",
        content:
          "Saiba como a HEYDT Esquadrias coleta, utiliza e protege seus dados pessoais e cookies em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade | HEYDT Esquadrias" },
      {
        property: "og:description",
        content:
          "Transparência sobre coleta e uso de dados pessoais e cookies no site da HEYDT Esquadrias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="container-page pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-primary/70">Transparência</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Política de Privacidade
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/70 md:text-lg">
            Esta página descreve como a HEYDT Esquadrias trata os dados pessoais
            coletados através do site, em linha com a Lei Geral de Proteção de
            Dados (LGPD — Lei nº 13.709/2018). Este conteúdo é mantido pela
            HEYDT Esquadrias e pode ser atualizado a qualquer momento.
          </p>

          <div className="mt-14 space-y-12 text-sm leading-relaxed text-foreground/80 md:text-base">
            <Block title="1. Dados que coletamos">
              Coletamos apenas dados fornecidos voluntariamente por você em
              nossos formulários de contato (nome, e-mail, telefone, cidade e
              mensagem) e dados técnicos anônimos de navegação (páginas
              visitadas, dispositivo, origem de tráfego) por meio de cookies.
            </Block>

            <Block title="2. Como utilizamos seus dados">
              Utilizamos as informações para responder solicitações comerciais,
              enviar orçamentos, melhorar a experiência do site, medir
              desempenho e otimizar eventuais campanhas de marketing. Não
              vendemos nem compartilhamos seus dados com terceiros para fins
              publicitários.
            </Block>

            <Block title="3. Cookies">
              Cookies são pequenos arquivos armazenados em seu navegador. Nós
              utilizamos cookies essenciais (para o funcionamento do site) e,
              quando aplicável, cookies analíticos e de performance. Você pode
              desativar cookies nas configurações do seu navegador a qualquer
              momento — algumas funcionalidades podem ser afetadas.
            </Block>

            <Block title="4. Compartilhamento">
              Podemos compartilhar dados com prestadores de serviço estritamente
              necessários à operação do site (hospedagem, e-mail, mensageria e
              analytics), sempre sob obrigações de confidencialidade.
            </Block>

            <Block title="5. Seus direitos">
              Você pode solicitar, a qualquer momento, acesso, correção,
              exclusão ou portabilidade dos seus dados, além de revogar
              consentimentos. Basta enviar um e-mail para{" "}
              <a
                href="mailto:jessica@esquadriasefachadas.com.br"
                className="underline underline-offset-4 hover:text-primary"
              >
                jessica@esquadriasefachadas.com.br
              </a>
              .
            </Block>

            <Block title="6. Segurança">
              Adotamos medidas técnicas e organizacionais para proteger seus
              dados contra acesso não autorizado, perda ou alteração. Nenhum
              sistema é totalmente livre de riscos, mas trabalhamos
              continuamente para mitigá-los.
            </Block>

            <Block title="7. Contato">
              Dúvidas sobre esta política podem ser enviadas para{" "}
              <a
                href="mailto:jessica@esquadriasefachadas.com.br"
                className="underline underline-offset-4 hover:text-primary"
              >
                jessica@esquadriasefachadas.com.br
              </a>{" "}
              ou pelo telefone (49) 98850-7286.
            </Block>
          </div>

          <p className="mt-16 text-xs uppercase tracking-[0.2em] text-foreground/50">
            Última atualização: julho de 2026
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight text-primary md:text-3xl">
        {title}
      </h2>
      <p className="mt-4">{children}</p>
    </div>
  );
}
