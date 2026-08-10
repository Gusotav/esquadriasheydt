export const GOOGLE_ADS_ID = "AW-18306322428";
export const LEAD_CONVERSION_LABEL = "M5-eCPyxvt8cEPyfkZlE";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag(...args);
  } else {
    window.dataLayer.push(args);
  }
}

/** Telefone brasileiro em formato E.164 (+55DDNNNNNNNNN). */
export function toE164BR(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  const national = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;
  if (national.length < 10 || national.length > 11) return undefined;
  return `+55${national}`;
}

export function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export interface LeadConversionPayload {
  nome: string;
  email: string;
  telefone: string;
  cidade?: string;
  transactionId: string;
  value?: number;
}

export function trackLeadConversion(payload: LeadConversionPayload) {
  if (typeof window === "undefined") return;
  const { firstName, lastName } = splitName(payload.nome);
  const phone = toE164BR(payload.telefone);

  const userData: Record<string, unknown> = {
    email: payload.email.trim().toLowerCase(),
    address: {
      first_name: firstName,
      last_name: lastName,
      city: payload.cidade?.trim(),
      country: "BR",
    },
  };
  if (phone) userData["phone_number"] = phone;

  gtag("set", "user_data", userData);
  gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${LEAD_CONVERSION_LABEL}`,
    transaction_id: payload.transactionId,
    value: payload.value ?? 1,
    currency: "BRL",
  });
}

/** Máscara de telefone BR: (49) 90000-0000 */
export function maskPhoneBR(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
