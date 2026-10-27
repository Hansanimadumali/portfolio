import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { projects, publications, researchInterests, researchLinks } from "../../data/portfolio";

// The visualisation uses a 100 × 75 coordinate space to match its 4:3 box.
const H = 75;

export default function Research({ index }: { index: number }) {
  const [selected, setSelected] = useState(researchInterests[0].id);
  const [hovered, setHovered] = useState<string | null>(null);
  const focus = hovered ?? selected;

  const byId = useMemo(() => Object.fromEntries(researchInterests.map((r) => [r.id, r])), []);
  const neighbours = useMemo(() => {
    const set = new Set<string>([focus]);
    researchLinks.forEach(([a, b]) => {
      if (a === focus) set.add(b);
      if (b === focus) set.add(a);
    });
    return set;
  }, [focus]);

  const current = byId[selected];
  const relatedPubs = publications.filter((p) => current.publications?.includes(p.id));
  const relatedProjects = projects.filter((p) => current.projects?.includes(p.id));

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Research interests"
        title={
          <>
            A map of what <span className="gradient-text">I think about</span>
          </>
        }
        intro="Select a node to see how each area connects to my papers and projects."
      />

      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div className="glass relative overflow-hidden p-2 sm:p-4">
          <div className="relative aspect-[4/3] w-full">
            <svg viewBox={`0 0 100 ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="edge-hot" x1="0" x2="1">
                  <stop offset="0" stopColor="rgb(94 231 240)" />
                  <stop offset="1" stopColor="rgb(169 139 255)" />
                </linearGradient>
                <radialGradient id="core-glow">
                  <stop offset="0" stopColor="rgb(169 139 255 / 0.35)" />
                  <stop offset="1" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx={byId[focus].x} cy={(byId[focus].y * H) / 100} r="22" fill="url(#core-glow)" className="transition-all duration-700" />
              {[18, 30, 42].map((r) => (
                <circle key={r} cx="50" cy={H / 2} r={r} fill="none" stroke="rgb(255 255 255 / 0.04)" strokeWidth="0.2" />
              ))}
              {researchLinks.map(([a, b]) => {
                const A = byId[a];
                const B = byId[b];
                const hot = a === focus || b === focus;
                const d = `M ${A.x} ${(A.y * H) / 100} L ${B.x} ${(B.y * H) / 100}`;
                return (
                  <g key={`${a}-${b}`}>
                    <path
                      d={d}
                      stroke={hot ? "url(#edge-hot)" : "rgb(255 255 255 / 0.09)"}
                      strokeWidth={hot ? 0.45 : 0.25}
                      strokeDasharray={hot ? "1.2 1.2" : undefined}
                      className={hot ? "animate-dash" : undefined}
                      fill="none"
                      style={{ transition: "stroke 0.4s" }}
                    />
                    {hot && (
                      <circle r="0.7" fill="rgb(94 231 240)">
                        <animateMotion dur="2.6s" repeatCount="indefinite" path={a === focus ? d : `M ${B.x} ${(B.y * H) / 100} L ${A.x} ${(A.y * H) / 100}`} />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {researchInterests.map((r, i) => {
              const isSel = selected === r.id;
              const lit = neighbours.has(r.id);
              const size = r.weight === 3 ? "h-6 w-6 sm:h-8 sm:w-8" : r.weight === 2 ? "h-4 w-4 sm:h-5 sm:w-5" : "h-3 w-3 sm:h-4 sm:w-4";
              const color = r.accent === "cyan" ? "from-cyan-glow to-cyan-deep" : "from-violet-glow to-violet-deep";
              return (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setSelected(r.id)}
                  aria-pressed={isSel}
                  className="group absolute animate-bob"
                  style={{ left: `${r.x}%`, top: `${r.y}%`, animationDelay: `${-i * 0.9}s` }}
                >
                  <span
                    className={`relative block rounded-full bg-gradient-to-br ${color} ${size} transition duration-500 ${
                      lit ? "opacity-100" : "opacity-40"
                    } ${isSel ? "scale-110 shadow-[0_0_24px_rgb(169_139_255/0.8)]" : "group-hover:scale-110"}`}
                  >
                    {isSel && <span className="absolute -inset-2 animate-ping rounded-full border border-white/30 [animation-duration:2.4s]" />}
                  </span>
                  <span
                    className={`absolute left-1/2 top-full mt-1.5 w-max max-w-[6.5rem] -translate-x-1/2 rounded-md bg-ink-850/80 px-1.5 py-0.5 text-center text-[0.6rem] leading-tight transition sm:max-w-[9rem] sm:text-xs ${
                      isSel ? "font-medium text-mist-50" : lit ? "text-mist-200" : "text-mist-500"
                    }`}
                  >
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass relative min-h-[18rem] overflow-hidden p-6" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className={`eyebrow ${current.accent === "violet" ? "!text-violet-glow/90" : ""}`}>
                {current.weight === 3 ? "Core focus" : current.weight === 2 ? "Active area" : "Background"}
              </p>
              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{current.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">{current.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {current.keywords.map((k) => (
                  <li key={k} className="chip !py-0.5 !text-[0.7rem]">
                    {k}
                  </li>
                ))}
              </ul>
              {(relatedPubs.length > 0 || relatedProjects.length > 0) && (
                <div className="mt-6 space-y-2 border-t border-white/[0.07] pt-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mist-500">Related work</p>
                  {relatedPubs.map((p) => (
                    <a
                      key={p.id}
                      href={`https://doi.org/${p.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start gap-2 text-sm text-mist-200 hover:text-mist-50"
                    >
                      <span className="mt-0.5 shrink-0 rounded bg-violet-glow/15 px-1.5 font-mono text-[0.62rem] text-violet-glow">
                        {p.venueShort} {p.year}
                      </span>
                      <span className="line-clamp-2">{p.title}</span>
                      <FiArrowUpRight aria-hidden className="mt-0.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                    </a>
                  ))}
                  {relatedProjects.map((p) => (
                    <a key={p.id} href="#projects" className="flex items-start gap-2 text-sm text-mist-200 hover:text-mist-50">
                      <span className="mt-0.5 shrink-0 rounded bg-cyan-glow/15 px-1.5 font-mono text-[0.62rem] text-cyan-glow">Project</span>
                      {p.title}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
