export const META_PIXEL_ID = "1980804622437589";

declare global {
  interface Window {
    fbq: any;
    _fbq?: any;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  (window.fbq as (...a: unknown[]) => void)(...args);
}

/** Gera um event_id único para deduplicação com a API de Conversões. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface MetaUserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  ct?: string;
  country?: string;
}

/** Inicializa (ou re-inicializa com Advanced Matching) o Pixel. */
export function initMetaPixel(userData?: MetaUserData) {
  if (typeof window === "undefined") return;
  if (userData) fbq("init", META_PIXEL_ID, userData);
  else fbq("init", META_PIXEL_ID);
}

export function trackPageView(eventId: string = newEventId()): string {
  fbq("track", "PageView", {}, { eventID: eventId });
  return eventId;
}

function normalizeText(value?: string): string | undefined {
  const v = value?.trim().toLowerCase();
  if (!v) return undefined;
  return v.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Telefone brasileiro somente dígitos com DDI: 5551988887777 */
export function toMetaPhoneBR(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  const national = digits.startsWith("55") && digits.length > 11 ? digits.slice(2) : digits;
  if (national.length < 10 || national.length > 11) return undefined;
  return `55${national}`;
}

export interface MetaLeadPayload {
  nome: string;
  email: string;
  telefone: string;
  cidade?: string;
  eventId?: string;
  value?: number;
}

export function trackLead(payload: MetaLeadPayload): string {
  const eventId = payload.eventId ?? newEventId();
  if (typeof window === "undefined") return eventId;

  const parts = payload.nome.trim().split(/\s+/).filter(Boolean);
  const userData: MetaUserData = {
    em: payload.email.trim().toLowerCase(),
    fn: normalizeText(parts[0]),
    ln: normalizeText(parts.slice(1).join(" ")),
    ct: normalizeText(payload.cidade),
    country: "br",
  };
  const phone = toMetaPhoneBR(payload.telefone);
  if (phone) userData.ph = phone;

  initMetaPixel(userData);
  fbq(
    "track",
    "Lead",
    { value: payload.value ?? 1, currency: "BRL" },
    { eventID: eventId },
  );
  return eventId;
}
