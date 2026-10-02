import type { ReactNode } from "react";

export function LegalDoc({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-3 text-xs text-muted-foreground">{updated}</p>
      <div className="gold-rule mt-6 max-w-24" />
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}
