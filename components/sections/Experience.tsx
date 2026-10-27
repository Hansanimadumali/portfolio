import { FiBookOpen, FiCode, FiMapPin } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { experience } from "../../data/portfolio";

export default function Experience({ index }: { index: number }) {
  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Experience"
        title={
          <>
            From shipping products <span className="gradient-text">to publishing research</span>
          </>
        }
        intro="Industry engineering and academic research — two tracks that keep informing each other."
        aside={
          <div className="flex gap-2 text-xs">
            <span className="chip">
              <FiBookOpen className="text-violet-glow" aria-hidden /> Research
            </span>
            <span className="chip">
              <FiCode className="text-cyan-glow" aria-hidden /> Industry
            </span>
          </div>
        }
      />

      <ol className="relative space-y-6 pl-8 sm:pl-10">
        <span
          aria-hidden
          className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-violet-glow/70 via-cyan-glow/40 to-transparent sm:left-[13px]"
        />
        {experience.map((e) => {
          const research = e.kind === "research";
          const Icon = research ? FiBookOpen : FiCode;
          return (
            <li key={`${e.role}-${e.org}`} className="relative">
              <span
                aria-hidden
                className={`absolute -left-8 top-5 grid h-6 w-6 place-items-center rounded-full border bg-ink-900 sm:-left-10 sm:h-7 sm:w-7 ${
                  research ? "border-violet-glow/60 text-violet-glow" : "border-cyan-glow/60 text-cyan-glow"
                }`}
              >
                <Icon size={12} />
              </span>
              <article className="glass group p-5 transition duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">{e.role}</h3>
                    {(e.org || e.unit) && (
                      <p className="mt-0.5 text-sm text-mist-200">
                        {e.org}
                        {e.unit && <span className="text-mist-400"> · {e.unit}</span>}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-1 text-xs sm:items-end">
                    {e.period && <span className="font-mono uppercase tracking-[0.15em] text-mist-400">{e.period}</span>}
                    {e.location && (
                      <span className="flex items-center gap-1 text-mist-500">
                        <FiMapPin aria-hidden /> {e.location}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mist-200">{e.summary}</p>
                {e.points && (
                  <ul className="mt-3 space-y-1.5 text-sm text-mist-400">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span aria-hidden className={`mt-2 h-1 w-1 shrink-0 rounded-full ${research ? "bg-violet-glow" : "bg-cyan-glow"}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {e.tech && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools and topics">
                    {e.tech.map((t) => (
                      <li key={t} className="chip !py-0.5 !text-[0.7rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
