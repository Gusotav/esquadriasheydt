interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}

export function SectionHeader({ eyebrow, title, subtitle, align = "left", invert = false }: SectionHeaderProps) {
  const wrap = align === "center" ? "text-center mx-auto" : "";
  const sub = invert ? "text-white/75" : "text-muted-foreground";
  const eye = invert ? "text-white/60" : "";
  return (
    <div className={`max-w-3xl ${wrap}`}>
      {eyebrow && <p className={`eyebrow mb-5 ${align === "left" ? "hairline" : ""} ${eye}`}>{eyebrow}</p>}
      <h2 className={`font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] ${invert ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-5 text-base md:text-lg ${sub}`}>{subtitle}</p>}
    </div>
  );
}
