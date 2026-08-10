# Conversão aprimorada do Google Ads no formulário de leads

Hoje o formulário abre o WhatsApp imediatamente e só depois envia o lead ao webhook do CRM. Não existe nenhum script de Google Ads / gtag no site.

## Como vai funcionar

1. O visitante preenche o formulário e clica no botão.
2. Os dados são validados como hoje.
3. O lead é enviado ao webhook do CRM.
4. Se o webhook responder com sucesso (200), o site dispara a conversão do Google Ads com os dados aprimorados (e-mail, telefone, nome, sobrenome, cidade) e os parâmetros `transaction_id`, `value` e `currency`.
5. Só então o visitante é levado ao WhatsApp com a mensagem preenchida.
6. Se o webhook falhar, nenhuma conversão é disparada, mas o visitante ainda é levado ao WhatsApp (não bloqueamos o contato).

O botão exibe "Enviando..." durante o processo, como já acontece.

## Detalhes técnicos

- **Carregamento do gtag** (`src/routes/__root.tsx`, via `<ClientOnly>` + `useEffect`, ou pequeno módulo `src/lib/gtag.ts`):
  - Injeta `https://www.googletagmanager.com/gtag/js?id=AW-18306322428`.
  - `gtag('js', new Date())` e
    `gtag('config', 'AW-18306322428', { allow_enhanced_conversions: true, conversion_linker: true })`.
  - Injeção apenas no cliente (nunca em módulo de escopo global / SSR).
- **Helper `src/lib/gtag.ts`**: tipagem de `window.gtag`/`dataLayer`, `initGoogleAds()` e `trackLeadConversion(payload)`.
  - `gtag('set', 'user_data', { email, phone_number, address: { first_name, last_name, city, country: 'BR' } })` com normalização: e-mail em minúsculas/trim; telefone convertido para E.164 (`+55` + dígitos, sem duplicar DDI); nome dividido em primeiro nome e restante como sobrenome.
  - `gtag('event', 'conversion', { send_to: 'AW-18306322428/M5-eCPyxvt8cEPyfkZlE', transaction_id, value, currency: 'BRL' })`.
- **`src/components/LeadForm.tsx`**:
  - Remove a abertura síncrona do WhatsApp; passa a `await submitLead(...)` primeiro.
  - Em `result.ok === true` e `duplicate !== true`: dispara a conversão usando `transaction_id = leadId` (fallback: `lead-<timestamp>-<random>` gerado no clique) e `value` do lead.
  - Redirecionamento para o WhatsApp com `window.location.href` (em vez de `window.open`), evitando bloqueio de pop-up por ser assíncrono após o `await`.
- **`src/lib/leads.functions.ts`**: sem mudanças de contrato — já retorna `{ ok, duplicate, leadId }`.
- **Valor da conversão**: fixo em `value: 1` e `currency: 'BRL'` (valor simbólico para permitir otimização por conversão). Ajustável depois.
- Sem alterações de layout, textos ou estilos.
