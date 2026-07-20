import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">Erro 404</p>
        <h1 className="font-display text-5xl text-foreground">Página não encontrada</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <div className="mt-8">
          <a href="/" className="btn-primary">Voltar ao início</a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">Algo saiu do esperado</p>
        <h1 className="font-display text-4xl text-foreground">Não conseguimos carregar esta página</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Tente novamente em instantes ou volte à página inicial.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-ghost">Ir para a Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HEYDT Esquadrias — Esquadrias, Fachadas e Vidros de Alto Padrão" },
      {
        name: "description",
        content:
          "Há mais de 47 anos entregando engenharia, conforto e acabamento impecável em esquadrias de alumínio, PVC e fachadas de vidro no Oeste catarinense.",
      },
      { name: "author", content: "HEYDT Esquadrias" },
      { name: "theme-color", content: "#0b1f4a" },
      { property: "og:title", content: "HEYDT Esquadrias — Alto padrão em esquadrias e fachadas" },
      {
        property: "og:description",
        content:
          "Engenharia própria, parque fabril de 1.000m² em Maravilha/SC e mais de 47 anos entregando conforto através de esquadrias.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
