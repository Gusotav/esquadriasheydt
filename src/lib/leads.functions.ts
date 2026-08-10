import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WEBHOOK_URL =
  "https://project--ce2fdb27-7c12-4e7b-8554-e760682718ed.lovable.app/api/public/site-lead";

const leadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  telefone: z.string().trim().min(8).max(30),
  email: z.string().trim().email().max(200),
  cidade: z.string().trim().max(120).optional(),
  tipo: z.string().trim().max(60).optional(),
  origem: z.string().trim().max(200).optional(),
});

export type LeadResult =
  | { ok: true; duplicate?: boolean; leadId?: string }
  | { ok: false; error: string };

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }): Promise<LeadResult> => {
    const secret = process.env["X_SITE_SECRET"];
    if (!secret) {
      console.error("X_SITE_SECRET missing");
      return { ok: false, error: "config_error" };
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-site-secret": secret,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error(`site-lead webhook failed: ${res.status} ${await res.text()}`);
        if (res.status === 400) return { ok: false, error: "invalid_payload" };
        if (res.status === 401) return { ok: false, error: "unauthorized" };
        return { ok: false, error: "send_failed" };
      }

      const payload = (await res.json()) as {
        received?: boolean;
        duplicate?: boolean;
        lead_id?: string;
      };

      return {
        ok: true,
        duplicate: payload.duplicate === true,
        leadId: payload.lead_id,
      };
    } catch (error) {
      console.error("site-lead webhook error", error);
      return { ok: false, error: "network_error" };
    }
  });
