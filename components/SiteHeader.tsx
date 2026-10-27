import { useEffect, useState } from "react";
import { AnimatePresence, motion, useSpring } from "motion/react";
import { FiBox, FiDownload, FiLayers, FiMenu, FiX } from "react-icons/fi";
import { useCarousel } from "./WheelCarousel";
import { links, profile } from "../data/portfolio";

export default function SiteHeader() {
  const { sections, active, scrollToSection, mode, setMode, progress } = useCarousel();
  const [menuOpen, setMenuOpen] = useState(false);
  const bar = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const toggleMode = () => setMode(mode === "wheel" ? "flat" : "wheel");

  return (
    <>
      <a
        href={`#${sections[1]?.id ?? ""}`}
        className="sr-only z-[200] rounded-full bg-mist-50 px-4 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[150] h-[var(--header-h)]">
        <div className="absolute inset-0 border-b border-white/[0.06] bg-ink-900/70 backdrop-blur-xl" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan-glow to-violet-glow"
          style={{ scaleX: bar }}
        />
        <nav aria-label="Primary" className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => go(sections[0].id)}
            className="group flex items-center gap-3"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-ink-800 font-display text-sm font-semibold text-mist-50">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-glow/20 to-violet-glow/30 opacity-0 transition group-hover:opacity-100" />
              <span className="relative">{profile.initials}</span>
            </span>
            <span className="hidden font-display text-sm font-medium text-mist-50 sm:block">{profile.name}</span>
          </button>

          <ul className="hidden items-center gap-1 xl:flex">
            {sections.slice(1).map((s, i) => {
              const isActive = active === i + 1;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-[0.8rem] transition ${
                      isActive ? "text-mist-50" : "text-mist-400 hover:text-mist-50"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMode}
              className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-mist-200 transition hover:border-cyan-glow/50 sm:flex"
              aria-pressed={mode === "flat"}
              title={mode === "wheel" ? "Switch to a simple scrolling layout" : "Switch to the 3D wheel"}
            >
              {mode === "wheel" ? <FiLayers aria-hidden /> : <FiBox aria-hidden />}
              {mode === "wheel" ? "Simple view" : "3D view"}
            </button>
            <a href={links.cv} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-1.5 text-xs">
              <FiDownload aria-hidden /> CV
            </a>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-mist-50 xl:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[140] bg-ink-950/90 pt-[var(--header-h)] backdrop-blur-xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="mx-auto flex max-w-md flex-col gap-1 px-6 py-8">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035 }}
                >
                  <button
                    onClick={() => go(s.id)}
                    className={`flex w-full items-baseline gap-4 rounded-xl px-3 py-3 text-left font-display text-2xl transition ${
                      active === i ? "text-mist-50" : "text-mist-400 hover:text-mist-50"
                    }`}
                  >
                    <span className="font-mono text-xs text-cyan-glow/70">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </button>
                </motion.li>
              ))}
              <li className="mt-4 px-3">
                <button onClick={toggleMode} className="btn-ghost w-full">
                  {mode === "wheel" ? <FiLayers aria-hidden /> : <FiBox aria-hidden />}
                  {mode === "wheel" ? "Switch to simple view" : "Switch to 3D view"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SectionRail />
    </>
  );
}

/** Vertical dot rail on the right edge (desktop) with section counter. */
function SectionRail() {
  const { sections, active, scrollToSection } = useCarousel();
  return (
    <nav aria-label="Sections" className="fixed right-4 top-1/2 z-[120] hidden -translate-y-1/2 lg:block 2xl:right-8">
      <ol className="flex flex-col items-end gap-3">
        {sections.map((s, i) => {
          const isActive = active === i;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollToSection(s.id)}
                className="group flex items-center gap-3"
                aria-label={`Go to ${s.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] transition ${
                    isActive ? "text-mist-50 opacity-100" : "text-mist-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? "h-6 w-1.5 bg-gradient-to-b from-cyan-glow to-violet-glow shadow-[0_0_12px_rgb(94_231_240/0.6)]"
                      : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/60"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-right font-mono text-[0.65rem] tracking-[0.2em] text-mist-500" aria-hidden>
        {String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
      </p>
    </nav>
  );
}
