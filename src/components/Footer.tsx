import { Link } from "@tanstack/react-router";
import logoBranca from "@/assets/logo-heydt-branca.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-24">
        <div className="max-w-sm">
          <img
            src={logoBranca.url}
            alt="HEYDT Esquadrias"
            width={160}
            height={50}
            className="h-10 w-auto opacity-95"
          />
          <p className="mt-6 font-display text-2xl leading-[1.15] tracking-tight">
            Entregando conforto através de esquadrias.
          </p>
          <p className="mt-6 text-sm text-primary-foreground/70">
            Há mais de 47 anos, engenharia e fabricação próprias em Maravilha/SC.
          </p>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Navegação</p>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/quem-somos", label: "Quem Somos" },
              { to: "/solucoes", label: "Soluções" },
              { to: "/fale-conosco", label: "Fale Conosco" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-primary-foreground/85 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-primary-foreground/60">Contato</p>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
            <li>
              <a href="tel:+5549988507286" className="link-underline">(49) 98850-7286</a>
            </li>
            <li>
              <a
                href="mailto:jessica@esquadriasefachadas.com.br"
                className="link-underline break-words"
              >
                jessica@esquadriasefachadas.com.br
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/heydtesquadrias"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                @heydtesquadrias
              </a>
            </li>
            <li className="pt-2 text-primary-foreground/70">
              R. Paulino Francisco de Oliveira, 316
              <br />
              Maravilha/SC — CEP 89874-000
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} HEYDT Esquadrias. Todos os direitos reservados.</p>
          <p className="tracking-[0.2em] uppercase">Esquadrias · Fachadas · Vidros</p>
        </div>
      </div>
    </footer>
  );
}
