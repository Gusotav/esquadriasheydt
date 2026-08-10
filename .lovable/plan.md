# Envio de leads do formulário para o CRM (webhook Luggia)

Hoje o `LeadForm` apenas abre uma conversa no WhatsApp com os dados preenchidos. O objetivo é que, além disso, cada lead seja enviado ao webhook do projeto de integração Meta & CRM.

## Como vai funcionar

1. O visitante preenche o formulário (Home ou Fale Conosco) e clica no botão.
2. Os dados são validados como hoje (nome, telefone, e-mail, cidade, tipo).
3. O site envia o lead para o webhook do CRM em segundo plano, incluindo a página de origem (`/`, `/fale-conosco`).
4. Em seguida abre o WhatsApp normalmente, como já acontece hoje.
5. Se o envio ao CRM falhar, o usuário não é bloqueado: o WhatsApp abre do mesmo jeito e a falha é registrada apenas internamente.

Mensagem de confirmação continua a mesma abaixo do botão.

## Detalhes técnicos

- O header `x-site-secret` não pode ir no navegador (ficaria público). Por isso o envio passa por uma função de servidor do próprio site:
  - Novo arquivo `src/lib/leads.functions.ts` com `createServerFn({ method: "POST" })`, validação Zod do payload (`nome` 2–120, `telefone` 8–30, `email` válido, `cidade`/`tipo`/`origem` opcionais) e `fetch` para
    `https://project--ce2fdb27-7c12-4e7b-8554-e760682718ed.lovable.app/api/public/site-lead`.
  - `process.env['X_SITE_SECRET']` lido **dentro** do `.handler()`, enviado no header `x-site-secret` junto de `content-type: application/json`.
  - Retorno normalizado: `{ ok: true, duplicate?: boolean, leadId?: string }` ou `{ ok: false, error: '...' }` (mapeando 400/401/500). Nenhum detalhe do provedor é exposto ao cliente.
- `src/components/LeadForm.tsx`:
  - Usa `useServerFn` para chamar a função no `handleSubmit`, com `await` antes de abrir o WhatsApp (envolvido em `try/catch`, sem travar o fluxo).
  - `origem` preenchido com `window.location.pathname`.
  - Estado `sending` já existente passa a refletir a chamada real ("Enviando...").
- Sem mudanças de layout, textos ou estilos.
