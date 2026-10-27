import { useEffect, useRef } from "react";

/**
 * Fixed ambient background: charcoal base, drifting cyan/violet glows,
 * a faint grid floor, film grain, and a soft spotlight that follows the pointer.
 */
export default function Backdrop() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      <div className="absolute -left-[15%] -top-[20%] h-[70vmax] w-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgb(94_231_240/0.10),transparent_60%)]" />
      <div className="absolute -bottom-[25%] -right-[15%] h-[75vmax] w-[75vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgb(169_139_255/0.12),transparent_60%)] [animation-delay:-11s]" />
      <div className="bg-grid absolute inset-x-[-50%] bottom-[-10%] h-[60%] origin-bottom opacity-60 [mask-image:linear-gradient(to_top,black,transparent)] [transform:perspective(600px)_rotateX(62deg)]" />
      <div
        ref={spotRef}
        className="absolute inset-0 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,30%),rgb(169_139_255/0.07),transparent_60%)]"
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
