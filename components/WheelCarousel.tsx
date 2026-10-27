import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/*
 * Scroll-driven 3D wheel.
 *
 * Sections sit on the rim of an invisible horizontal cylinder. Page scroll is
 * mapped onto a continuous "position" along the wheel: for each section there
 * is a dwell segment (the card is front and centre; if its content is taller
 * than the card, the dwell scrolls the content) followed by a transition
 * segment (the wheel rotates to the next card).
 *
 *   scroll ─► spring ─► pos (0 … n-1, fractional) ─► per-card transform
 */

export interface SectionDef {
  id: string;
  label: string;
  content: ReactNode;
}

export type ViewMode = "wheel" | "flat";

interface Metrics {
  top: number;
  vh: number;
  viewportH: number;
  overflows: number[];
  starts: number[];
  dwell: number[];
  transition: number;
  total: number;
  radius: number;
  blur: number;
}

interface CarouselState {
  sections: SectionDef[];
  active: number;
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  scrollToSection: (id: string) => void;
  progress: MotionValue<number>;
}

const CarouselContext = createContext<CarouselState | null>(null);

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used inside <CarouselProvider>");
  return ctx;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const STEP_DEG = 38;
const MODE_KEY = "hp-view-mode";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

function buildMetrics(top: number, vh: number, viewportH: number, overflows: number[], mobile: boolean): Metrics {
  const transition = Math.round(vh * (mobile ? 0.75 : 0.95));
  const minDwell = Math.round(vh * 0.3);
  const dwell = overflows.map((o) => Math.max(Math.ceil(o), minDwell));
  const starts: number[] = [];
  let acc = 0;
  dwell.forEach((d, i) => {
    starts.push(acc);
    acc += d + (i < dwell.length - 1 ? transition : 0);
  });
  return {
    top,
    vh,
    viewportH,
    overflows,
    starts,
    dwell,
    transition,
    total: acc,
    // Neighbouring cards must not cut through each other: the arc between two
    // cards (radius × step angle) has to exceed the card height.
    radius: (Math.max(viewportH, 420) / ((STEP_DEG * Math.PI) / 180)) * 1.1,
    blur: mobile ? 0 : 6,
  };
}

function positionAt(m: Metrics, scroll: number) {
  const s = scroll - m.top;
  const n = m.starts.length;
  for (let i = 0; i < n; i++) {
    const endDwell = m.starts[i] + m.dwell[i];
    if (s < endDwell) return i;
    if (i < n - 1 && s < endDwell + m.transition) {
      return i + easeInOut((s - endDwell) / m.transition);
    }
  }
  return n - 1;
}

// A scroll position expressed along the wheel, so it survives re-measuring.
type WheelLocation = { i: number; inTransition: boolean; f: number };

function locationAt(m: Metrics, scroll: number): WheelLocation {
  const s = scroll - m.top;
  const n = m.starts.length;
  for (let i = 0; i < n; i++) {
    const endDwell = m.starts[i] + m.dwell[i];
    if (s < endDwell) return { i, inTransition: false, f: clamp((s - m.starts[i]) / m.dwell[i], 0, 1) };
    if (i < n - 1 && s < endDwell + m.transition) return { i, inTransition: true, f: (s - endDwell) / m.transition };
  }
  return { i: n - 1, inTransition: false, f: 1 };
}

function scrollFor(m: Metrics, loc: WheelLocation) {
  const base = m.top + m.starts[loc.i];
  return loc.inTransition ? base + m.dwell[loc.i] + loc.f * m.transition : base + loc.f * m.dwell[loc.i];
}

/* ───────────────────────── Provider ───────────────────────── */

// Lets whichever view is mounted (wheel or flat) register how "go to section" works.
const InternalContext = createContext<{
  register: (fn: (id: string) => void) => void;
  setActive: (i: number) => void;
} | null>(null);

function useRegisterScroller(fn: (id: string) => void) {
  const { register } = useContext(InternalContext)!;
  useEffect(() => register(fn), [register, fn]);
}

function useActiveSetter() {
  return useContext(InternalContext)!.setActive;
}

export function CarouselProvider({ sections, children }: { sections: SectionDef[]; children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("wheel");
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);
  const scrollerRef = useRef<(id: string) => void>(() => {});

  // Respect reduced-motion preference and a remembered manual choice.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(MODE_KEY);
    } catch {}
    if (stored === "wheel" || stored === "flat") setModeState(stored);
    else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setModeState("flat");
  }, []);

  const setMode = useCallback((m: ViewMode) => {
    setModeState(m);
    try {
      window.localStorage.setItem(MODE_KEY, m);
    } catch {}
  }, []);

  const internal = useMemo(
    () => ({
      register: (fn: (id: string) => void) => {
        scrollerRef.current = fn;
      },
      setActive,
    }),
    [],
  );

  const value = useMemo<CarouselState>(
    () => ({
      sections,
      active,
      mode,
      setMode,
      progress,
      scrollToSection: (id) => scrollerRef.current(id),
    }),
    [sections, active, mode, setMode, progress],
  );

  return (
    <InternalContext.Provider value={internal}>
      <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>
    </InternalContext.Provider>
  );
}

/* ───────────────────────── Stage ───────────────────────── */

/**
 * Renders the sections either on the 3D wheel or as a simple vertical flow.
 * Must be a child of <CarouselProvider>.
 */
export function CarouselStage() {
  const { mode } = useCarousel();
  return mode === "wheel" ? <Wheel /> : <FlatList />;
}

/* Anchor links (<a href="#contact">) and URL hashes route through the carousel. */
function useAnchorRouting(scrollToSection: (id: string, instant?: boolean) => void, ids: string[]) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!ids.includes(id)) return;
      e.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollToSection, ids]);
}

function replaceHash(id: string | null) {
  const url = id ? `#${id}` : window.location.pathname + window.location.search;
  if ((id ? `#${id}` : "") === window.location.hash) return;
  window.history.replaceState(window.history.state, "", url);
}

function Wheel() {
  const ctx = useCarousel();
  const { sections, progress } = ctx;
  const setActive = useActiveSetter();
  const n = sections.length;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricsRef = useRef<Metrics>(buildMetrics(0, 900, 760, sections.map(() => 0), false));
  const [metrics, setMetrics] = useState<Metrics>(metricsRef.current);
  const [ready, setReady] = useState(false);
  const layoutTick = useMotionValue(0);

  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 110, damping: 24, mass: 0.45, restDelta: 0.2 });

  const pos = useTransform([smooth, layoutTick] as MotionValue<number>[], ([s]: number[]) => positionAt(metricsRef.current, s));

  const readyRef = useRef(false);
  const pendingScroll = useRef<number | null>(null);

  const measure = useCallback(() => {
    const anchor = readyRef.current ? locationAt(metricsRef.current, window.scrollY) : null;
    // The sticky stage is 100svh, which (unlike innerHeight) doesn't jump when mobile URL bars hide.
    const vh = stageRef.current?.clientHeight || window.innerHeight;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const viewportH = viewportRefs.current[0]?.clientHeight ?? vh * 0.8;
    const overflows = sections.map((_, i) => {
      const vp = viewportRefs.current[i];
      const c = contentRefs.current[i];
      if (!vp || !c) return 0;
      return Math.max(0, c.offsetHeight - vp.clientHeight);
    });
    const top = wrapperRef.current ? wrapperRef.current.getBoundingClientRect().top + window.scrollY : 0;
    const m = buildMetrics(top, vh, viewportH, overflows, mobile);
    const prev = metricsRef.current;
    if (prev.total === m.total && prev.radius === m.radius && prev.starts.every((v, i) => v === m.starts[i])) return;
    metricsRef.current = m;
    if (anchor) pendingScroll.current = scrollFor(m, anchor);
    setMetrics(m);
    layoutTick.set(layoutTick.get() + 1);
  }, [sections, layoutTick]);

  // After content resizes (fonts, images, filters), keep the reader on the same card.
  useIsoLayoutEffect(() => {
    const y = pendingScroll.current;
    pendingScroll.current = null;
    if (y !== null && Math.abs(y - window.scrollY) > 1) {
      window.scrollTo({ top: y, behavior: "instant" });
      smooth.jump(y);
    }
  }, [metrics, smooth]);

  useIsoLayoutEffect(() => {
    measure();
    readyRef.current = true;
    setReady(true);
    const ro = new ResizeObserver(() => measure());
    viewportRefs.current.forEach((el) => el && ro.observe(el));
    contentRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const scrollToIndex = useCallback((i: number, instant = false) => {
    const m = metricsRef.current;
    const target = m.top + m.starts[clamp(i, 0, m.starts.length - 1)];
    window.scrollTo({ top: target, behavior: instant ? "instant" : "smooth" });
    if (instant) smooth.jump(target);
  }, [smooth]);

  const scrollToSection = useCallback(
    (id: string, instant = false) => {
      const i = sections.findIndex((s) => s.id === id);
      if (i >= 0) scrollToIndex(i, instant);
    },
    [sections, scrollToIndex],
  );

  useRegisterScroller(scrollToSection);
  useAnchorRouting(scrollToSection, useMemo(() => sections.map((s) => s.id), [sections]));

  // Deep link on first load. Wait for the page load (when the browser does its own
  // fragment scroll) and web fonts (which change card heights), then jump.
  useEffect(() => {
    if (!ready) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    let cancelled = false;
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
    Promise.all([loaded, document.fonts?.ready]).then(() =>
      requestAnimationFrame(() => !cancelled && scrollToSection(id, true)),
    );
    return () => {
      cancelled = true;
    };
  }, [ready, scrollToSection]);

  const lastActive = useRef(-1);
  useMotionValueEvent(pos, "change", (p) => {
    progress.set(n > 1 ? p / (n - 1) : 0);
    const a = Math.round(p);
    if (a !== lastActive.current) {
      lastActive.current = a;
      setActive(a);
      if (ready) replaceHash(a === 0 ? null : sections[a].id);
    }
  });

  // Keyboard focus moving into a card brings that card (and the focused element) into view.
  const onFocusPanel = (i: number) => (e: React.FocusEvent) => {
    const el = e.target as HTMLElement;
    if (!el.matches(":focus-visible")) return;
    const m = metricsRef.current;
    const content = contentRefs.current[i];
    let rel = 0;
    for (let node: HTMLElement | null = el; node && node !== content; node = node.offsetParent as HTMLElement | null) {
      rel += node.offsetTop;
    }
    const inner = m.overflows[i] > 0 ? clamp((rel - m.viewportH * 0.4) / m.overflows[i], 0, 1) : 0;
    const target = m.top + m.starts[i] + inner * m.dwell[i];
    if (Math.abs(window.scrollY - target) > 4) window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef} style={{ height: metrics.total + metrics.vh }} className="relative">
      <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden overflow-clip [perspective:1800px] [perspective-origin:50%_45%]">
        <div className="preserve-3d absolute inset-x-0 bottom-3 top-[calc(var(--header-h)+0.5rem)] sm:bottom-6">
          {sections.map((s, i) => (
            <WheelPanel
              key={s.id}
              index={i}
              section={s}
              pos={pos}
              smooth={smooth}
              layoutTick={layoutTick}
              metricsRef={metricsRef}
              overflow={metrics.overflows[i] > 0}
              viewportRef={(el) => (viewportRefs.current[i] = el)}
              contentRef={(el) => (contentRefs.current[i] = el)}
              onFocus={onFocusPanel(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface WheelPanelProps {
  index: number;
  section: SectionDef;
  pos: MotionValue<number>;
  smooth: MotionValue<number>;
  layoutTick: MotionValue<number>;
  metricsRef: React.MutableRefObject<Metrics>;
  overflow: boolean;
  viewportRef: (el: HTMLDivElement | null) => void;
  contentRef: (el: HTMLDivElement | null) => void;
  onFocus: (e: React.FocusEvent) => void;
}

function WheelPanel({ index, section, pos, smooth, layoutTick, metricsRef, overflow, viewportRef, contentRef, onFocus }: WheelPanelProps) {
  const deps = [pos, layoutTick] as MotionValue<number>[];
  const dist = (p: number) => index - p;

  const transform = useTransform(deps, ([p]: number[]) => {
    const d = dist(p);
    const r = metricsRef.current.radius;
    const scale = 1 - Math.min(Math.abs(d), 2) * 0.07;
    return `translate3d(0,0,${-r}px) rotateX(${(-d * STEP_DEG).toFixed(3)}deg) translate3d(0,0,${r}px) scale(${scale.toFixed(4)})`;
  });
  const opacity = useTransform(pos, (p) => {
    const ad = Math.abs(dist(p));
    if (ad >= 2.2) return 0;
    return ad <= 1 ? 1 - ad * 0.5 : 0.5 - (ad - 1) * 0.42;
  });
  const filter = useTransform(deps, ([p]: number[]) => {
    const ad = Math.abs(dist(p));
    // Ease the blur in so the card that's leaving stays readable for longer.
    const b = Math.pow(Math.min(ad, 1.5), 1.6) * metricsRef.current.blur;
    // Far-away cards are fully transparent (but still focusable) — skip the costly blur.
    return b < 0.15 || ad > 2.2 ? "none" : `blur(${b.toFixed(2)}px) brightness(${(1 - Math.min(ad, 1.5) * 0.25).toFixed(3)})`;
  });
  const zIndex = useTransform(pos, (p) => 100 - Math.round(Math.abs(dist(p)) * 10));
  const pointerEvents = useTransform(pos, (p) => (Math.abs(dist(p)) < 0.45 ? "auto" : "none"));
  const activeVar = useTransform(pos, (p) => Math.max(0, 1 - Math.abs(dist(p)) * 2));
  const innerY = useTransform([smooth, layoutTick] as MotionValue<number>[], ([s]: number[]) => {
    const m = metricsRef.current;
    const t = clamp((s - m.top - m.starts[index]) / m.dwell[index], 0, 1);
    return -t * m.overflows[index];
  });

  return (
    <motion.section
      id={section.id}
      aria-label={section.label}
      onFocus={onFocus}
      className="backface-hidden absolute inset-0 mx-auto w-[min(1180px,calc(100vw-1.5rem))] will-change-transform sm:w-[min(1180px,calc(100vw-3rem))]"
      style={{ transform, opacity, filter, zIndex, pointerEvents, ["--active" as string]: activeVar }}
    >
      <div className="panel-card">
        <div ref={viewportRef} data-overflow={overflow} className="panel-viewport absolute inset-0">
          <motion.div ref={contentRef} style={{ y: innerY }} className="px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
            {section.content}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ───────────────────────── Flat (reduced motion) ───────────────────────── */

function FlatList() {
  const { sections, progress } = useCarousel();
  const setActive = useActiveSetter();
  const refs = useRef<(HTMLElement | null)[]>([]);

  const scrollToSection = useCallback((id: string, instant = false) => {
    document.getElementById(id)?.scrollIntoView({ behavior: instant ? "instant" : "smooth", block: "start" });
  }, []);
  useRegisterScroller(scrollToSection);
  useAnchorRouting(scrollToSection, useMemo(() => sections.map((s) => s.id), [sections]));

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const i = refs.current.indexOf(en.target as HTMLElement);
            setActive(i);
            progress.set(sections.length > 1 ? i / (sections.length - 1) : 0);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [sections, setActive, progress]);

  return (
    <div className="mx-auto flex w-[min(1180px,calc(100vw-1.5rem))] flex-col gap-6 pb-10 pt-[calc(var(--header-h)+1rem)] sm:w-[min(1180px,calc(100vw-3rem))]">
      {sections.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-label={s.label}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="scroll-mt-[calc(var(--header-h)+1rem)]"
          style={{ ["--active" as string]: 0.6 }}
        >
          <div className="panel-card">
            <div className="px-5 py-8 sm:px-10 sm:py-12 lg:px-14">{s.content}</div>
          </div>
        </section>
      ))}
    </div>
  );
}
