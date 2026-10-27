import { FiMapPin } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { education, publications } from "../../data/portfolio";

export default function Education({ index }: { index: number }) {
  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Education"
        title={
          <>
            Where the <span className="gradient-text">foundations</span> come from
          </>
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => {
          const pub = publications.find((p) => p.id === e.publicationId);
          return (
            <article key={`${e.short}-${e.institution}`} className="glass group relative overflow-hidden p-6 sm:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-bold leading-none text-transparent opacity-60 transition duration-700 [-webkit-text-stroke:1px_rgb(255_255_255/0.09)] group-hover:opacity-100 group-hover:[-webkit-text-stroke:1px_rgb(94_231_240/0.3)] sm:text-[9rem]"
              >
                {e.short}
              </span>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-violet-glow shadow-[0_0_12px_rgb(169_139_255)]" : "bg-cyan-glow"}`} />
                  {e.period && <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mist-400">{e.period}</span>}
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">{e.degree}</h3>
                <p className="mt-1 text-cyan-glow/90">{e.field}</p>
                <p className="mt-4 text-sm text-mist-200">{e.institution}</p>
                {e.location && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-mist-500">
                    <FiMapPin aria-hidden /> {e.location}
                  </p>
                )}
                {e.details && (
                  <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-5 text-sm text-mist-400">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
                {pub && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs text-violet-glow hover:text-mist-50"
                  >
                    Published at {pub.venueShort} {pub.year} →
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
