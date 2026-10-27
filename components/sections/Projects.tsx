import Image from "next/image";
import { useMemo, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FiArrowUpRight, FiCpu, FiLock, FiBookOpen, FiCode, FiHexagon } from "react-icons/fi";
import SectionHeading from "../ui/SectionHeading";
import { projectCategoryLabels, projects, type Project, type ProjectCategory } from "../../data/portfolio";

const categoryIcon: Record<ProjectCategory, typeof FiCode> = {
  software: FiCode,
  security: FiLock,
  research: FiBookOpen,
  ai: FiCpu,
  web3: FiHexagon,
};

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glow = useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgb(94 231 240 / 0.12), transparent 60%)`);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };
  const Icon = categoryIcon[project.categories[0]];

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`glass group relative flex flex-col overflow-hidden transition-colors hover:border-white/20 ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ background: glow }} />
      <div className={`relative overflow-hidden bg-ink-800 ${featured ? "aspect-[16/9] md:aspect-auto md:w-1/2" : "aspect-[16/9]"}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover object-top opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_30%,rgb(94_231_240/0.25),transparent_55%),radial-gradient(circle_at_75%_70%,rgb(169_139_255/0.3),transparent_55%)]">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <Icon aria-hidden className="relative h-12 w-12 text-mist-50/80" />
          </div>
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
        <ul className="absolute left-3 top-3 flex gap-1.5" aria-label="Categories">
          {project.categories.map((c) => (
            <li key={c} className="chip !border-white/15 !bg-ink-900/70 !py-0.5 !text-[0.65rem] uppercase tracking-wider backdrop-blur">
              {projectCategoryLabels[c]}
            </li>
          ))}
        </ul>
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "md:justify-center md:p-8" : ""}`}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={`font-semibold ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}>{project.title}</h3>
          {project.year && <span className="shrink-0 font-mono text-[0.7rem] text-mist-500">{project.year}</span>}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-mist-400">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech">
          {project.tech.map((t) => (
            <li key={t} className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[0.68rem] text-mist-200">
              {t}
            </li>
          ))}
        </ul>
        {project.links && project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="relative z-20 inline-flex items-center gap-1 text-sm text-cyan-glow transition hover:text-mist-50"
              >
                {l.label} <FiArrowUpRight aria-hidden />
                <span className="sr-only">(opens {project.title} link in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects({ index }: { index: number }) {
  const categories = useMemo(() => {
    const present = new Set(projects.flatMap((p) => p.categories));
    return (Object.keys(projectCategoryLabels) as ProjectCategory[]).filter((c) => present.has(c));
  }, []);
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Projects"
        title={
          <>
            Things I&apos;ve <span className="gradient-text">built &amp; studied</span>
          </>
        }
        intro="Production web apps, Web3 tools and research systems — filter by what interests you."
      />

      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((c) => {
          const on = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={on}
              className={`relative rounded-full px-4 py-1.5 text-xs transition ${on ? "text-ink-950" : "text-mist-200 hover:text-mist-50"}`}
            >
              {on && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative ${on ? "font-medium" : ""}`}>{c === "all" ? "All" : projectCategoryLabels[c]}</span>
            </button>
          );
        })}
        <span className="ml-auto self-center font-mono text-[0.7rem] text-mist-500" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} featured={i === 0 && filter === "all"} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
