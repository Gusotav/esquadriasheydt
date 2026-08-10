import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sendLead } from "@/lib/leads.functions";


const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(120),
  telefone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(30)
    .regex(/^[0-9()+\-\s]+$/, "Use apenas números e ( ) + -"),
  email: z.string().trim().email("E-mail inválido").max(200),
  cidade: z.string().trim().min(2, "Informe a cidade da obra").max(120),
  tipo: z.enum(["Residencial", "Comercial", "Divisórias", "Outro"]),
});

type Values = z.infer<typeof schema>;

const WHATSAPP = "5549988507286";

interface LeadFormProps {
  variant?: "light" | "dark";
  cta?: string;
  onSent?: (v: Values) => void;
}

export function LeadForm({ variant = "light", cta = "Solicitar Orçamento Exclusivo", onSent }: LeadFormProps) {
  const submitLead = useServerFn(sendLead);
  const [values, setValues] = useState<Values>({

    nome: "",
    telefone: "",
    email: "",
    cidade: "",
    tipo: "Residencial",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const dark = variant === "dark";
  const fieldBase = dark
    ? "w-full border-b border-white/25 bg-transparent px-0 py-3.5 text-white placeholder:text-white/50 focus:border-white focus:outline-none transition-colors"
    : "w-full border-b border-border bg-transparent px-0 py-3.5 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors";
  const labelBase = dark ? "eyebrow text-white/60" : "eyebrow";

  function update<K extends keyof Values>(k: K, v: Values[K]) {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fe: Partial<Record<keyof Values, string>> = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as keyof Values;
        if (!fe[key]) fe[key] = i.message;
      });
      setErrors(fe);
      return;
    }
    setSending(true);
    const v = parsed.data;
    const msg =
      `Olá HEYDT, gostaria de um atendimento consultivo.%0A%0A` +
      `*Nome:* ${encodeURIComponent(v.nome)}%0A` +
      `*Telefone:* ${encodeURIComponent(v.telefone)}%0A` +
      `*E-mail:* ${encodeURIComponent(v.email)}%0A` +
      `*Cidade da obra:* ${encodeURIComponent(v.cidade)}%0A` +
      `*Tipo de projeto:* ${encodeURIComponent(v.tipo)}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setSending(false);
    onSent?.(v);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
      <div>
        <label htmlFor="nome" className={labelBase}>Nome completo</label>
        <input
          id="nome"
          type="text"
          autoComplete="name"
          value={values.nome}
          onChange={(e) => update("nome", e.target.value)}
          className={fieldBase}
          placeholder="Como devemos chamar você"
          maxLength={120}
        />
        {errors.nome && <p className="mt-2 text-xs text-destructive">{errors.nome}</p>}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="telefone" className={labelBase}>Telefone / WhatsApp</label>
          <input
            id="telefone"
            type="tel"
            autoComplete="tel"
            value={values.telefone}
            onChange={(e) => update("telefone", e.target.value)}
            className={fieldBase}
            placeholder="(49) 00000-0000"
            maxLength={30}
          />
          {errors.telefone && <p className="mt-2 text-xs text-destructive">{errors.telefone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldBase}
            placeholder="voce@empresa.com"
            maxLength={200}
          />
          {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="cidade" className={labelBase}>Cidade da obra</label>
          <input
            id="cidade"
            type="text"
            value={values.cidade}
            onChange={(e) => update("cidade", e.target.value)}
            className={fieldBase}
            placeholder="Maravilha, Chapecó, ..."
            maxLength={120}
          />
          {errors.cidade && <p className="mt-2 text-xs text-destructive">{errors.cidade}</p>}
        </div>
        <div>
          <label htmlFor="tipo" className={labelBase}>Tipo de projeto</label>
          <select
            id="tipo"
            value={values.tipo}
            onChange={(e) => update("tipo", e.target.value as Values["tipo"])}
            className={`${fieldBase} appearance-none pr-8`}
          >
            <option>Residencial</option>
            <option>Comercial</option>
            <option>Divisórias</option>
            <option>Outro</option>
          </select>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-start gap-4">
        <button type="submit" className="btn-primary" disabled={sending}>
          {sending ? "Enviando..." : cta}
        </button>
        {sent && (
          <p className={`text-xs ${dark ? "text-white/75" : "text-muted-foreground"}`}>
            Abrimos uma conversa no WhatsApp com sua solicitação. Nossa equipe responderá em instantes.
          </p>
        )}
      </div>
    </form>
  );
}
