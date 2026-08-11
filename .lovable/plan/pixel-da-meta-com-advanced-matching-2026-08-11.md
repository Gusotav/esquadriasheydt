# Pixel da Meta com Advanced Matching

Hoje o site tem apenas o Google Ads (gtag) em `src/routes/__root.tsx` + `src/lib/gtag.ts`. Não existe nenhum código do Meta Pixel nem a pasta `src/utils/`.

## Como vai funcionar

1. O Pixel `1980804622437589` é carregado no head, junto do gtag.
2. A cada mudança de página (Home, Quem Somos, Soluções, Fale Conosco, Política), dispara um `PageView` — apenas uma vez por rota, mesmo com re-render.
3. Quando o formulário é enviado e o webhook do CRM responde com sucesso, dispara o evento `Lead` com os dados do visitante (nome, sobrenome, e-mail, telefone, cidade) para correspondência aprimorada.
4. Cada evento leva um `event_id` único, permitindo deduplicação caso o mesmo evento também chegue pela API de Conversões do projeto de integração.

Nada muda visualmente no site.

## Detalhes técnicos

- **Novo `src/utils/metaPixel.ts`** (o projeto usa `src/lib/`, mas o pedido especifica `src/utils/` — será criado esse caminho):
  - `declare global { interface Window { fbq: any; _fbq?: any } }`.
  - `META_PIXEL_ID = "1980804622437589"`.
  - `newEventId()` — id único (`timestamp-random`, ou `crypto.randomUUID()` quando disponível).
  - `initMetaPixel(userData?)` — chama `fbq('init', META_PIXEL_ID, userData)`; sem `userData` na carga inicial, e re-inicializado com os dados do lead antes do evento `Lead` (é assim que o Advanced Matching manual é enviado).
  - `trackPageView(eventId?)` — `fbq('track', 'PageView', {}, { eventID })`.
  - `trackLead(payload)` — normaliza os dados (e-mail em minúsculas/trim; telefone só dígitos com DDI `55`, ex. `5551988887777`; nome dividido em `first_name`/`last_name`; cidade minúscula sem acento), chama `initMetaPixel(userData)` e depois `fbq('track', 'Lead', { value, currency: 'BRL' }, { eventID })`. Retorna o `eventId` usado.
  - Todas as funções são no-op quando `typeof window === "undefined"` (segurança em SSR).
- **`src/routes/__root.tsx`**:
  - Adiciona ao `scripts` do `head()` o snippet base do Meta Pixel (carregamento assíncrono de `https://connect.facebook.net/en_US/fbevents.js`) + `fbq('init', '1980804622437589')`. O `PageView` inicial NÃO fica no snippet — fica no listener, para não duplicar.
  - No `RootComponent`: `useRouterState({ select: s => s.location.pathname })` + `useEffect` com `useRef<string|null>` guardando o último pathname disparado; só dispara `trackPageView()` quando o pathname muda.
  - Mantém `<noscript>` do pixel fora do escopo (não aplicável em app React SSR-hidratado; opcional).
- **`src/components/LeadForm.tsx`**:
  - No mesmo bloco em que hoje chama `trackLeadConversion` (webhook `ok === true` e `duplicate !== true`), chama também `trackLead({ nome, email, telefone, cidade, eventId: result.leadId ?? fallbackId, value: 1 })`.
  - Usar o `leadId` do CRM como `event_id` permite deduplicar com um eventual evento server-side do projeto de integração.
  - Fluxo atual (webhook → conversões → redirecionamento ao WhatsApp) permanece igual.
- Sem alterações de layout, textos, estilos ou lógica de validação.
