import type { ReactNode } from "react";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  aside,
}: {
  index: number;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3 flex items-center gap-3">
          <span className="text-mist-500">{String(index).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-gradient-to-r from-cyan-glow/70 to-transparent" />
          {eyebrow}
        </p>
        <h2 className="section-title text-balance">{title}</h2>
        {intro && <p className="mt-4 text-[0.95rem] leading-relaxed text-mist-400">{intro}</p>}
      </div>
      {aside}
    </header>
  );
}
