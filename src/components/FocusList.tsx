import { useEffect, useRef, type ReactNode } from "react";

interface FocusListProps {
  children: ReactNode;
  className?: string;
}

export function FocusList({ children, className = "" }: FocusListProps) {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      el.setAttribute("data-focus", "true");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.setAttribute("data-focus", "true");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className={`focus-list ${className}`}>
      {children}
    </ul>
  );
}
