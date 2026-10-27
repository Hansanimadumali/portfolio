import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiChevronDown, FiCopy, FiExternalLink, FiFileText, FiX } from "react-icons/fi";
import { BsQuote } from "react-icons/bs";
import SectionHeading from "../ui/SectionHeading";
import { authorName, publications, type Publication } from "../../data/portfolio";
import { toApa, toBibtex } from "../../lib/citation";

function CiteDialog({ pub, onClose }: { pub: Publication; onClose: () => void }) {
  const [format, setFormat] = useState<"bibtex" | "apa">("bibtex");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const text = format === "bibtex" ? toBibtex(pub) : toApa(pub);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, [href], textarea");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus({ preventScroll: true });
    };
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[300] grid place-items-center bg-ink-950/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cite-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="panel-card !h-auto w-full max-w-2xl p-6 [--active:1] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Cite this paper</p>
            <h3 id="cite-title" className="mt-2 text-base font-medium leading-snug sm:text-lg">
              {pub.title}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 hover:border-white/30">
            <FiX />
          </button>
        </div>
        <div role="tablist" aria-label="Citation format" className="mt-5 flex gap-2">
          {(["bibtex", "apa"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={format === f}
              onClick={() => setFormat(f)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                format === f ? "bg-white/10 text-mist-50" : "text-mist-400 hover:text-mist-50"
              }`}
            >
              {f === "bibtex" ? "BibTeX" : "APA"}
            </button>
          ))}
        </div>
        <pre className="mt-4 max-h-[45vh] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-ink-950/70 p-4 font-mono text-xs leading-relaxed text-mist-200">
          {text}
        </pre>
        <div className="mt-5 flex justify-end">
          <button onClick={copy} className="btn-primary">
            {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
            {copied ? "Copied" : "Copy citation"}
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {copied ? "Citation copied to clipboard" : ""}
        </span>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-mist-400">
      {authors.map((a, i) => (
        <span key={a}>
          {a === authorName ? <strong className="font-medium text-mist-50 underline decoration-cyan-glow/50 underline-offset-4">{a}</strong> : a}
          {i < authors.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

function PublicationItem({ pub, onCite }: { pub: Publication; onCite: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="glass group relative grid gap-4 p-5 transition hover:border-white/15 hover:bg-white/[0.045] sm:grid-cols-[88px_1fr] sm:p-6">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
        <span className="font-display text-3xl font-semibold leading-none text-mist-50 sm:text-4xl">{pub.year}</span>
        <span className="rounded-md border border-violet-glow/40 bg-violet-glow/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-violet-glow">
          {pub.venueShort}
        </span>
      </div>
      <div>
        <h3 className="text-base font-medium leading-snug text-mist-50 sm:text-lg">{pub.title}</h3>
        <div className="mt-2">
          <Authors authors={pub.authors} />
        </div>
        <p className="mt-1 text-sm italic text-mist-500">
          {pub.venue}
          {pub.pages ? `, pp. ${pub.pages}` : ""}
          {pub.publisher ? ` · ${pub.publisher}` : ""}
        </p>
        {pub.tags && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Topics">
            {pub.tags.map((t) => (
              <li key={t} className="chip !py-0.5 !text-[0.68rem]">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="btn-ghost !px-3.5 !py-1.5 !text-xs">
            <FiExternalLink aria-hidden /> DOI
            <span className="sr-only">for {pub.title}</span>
          </a>
          {pub.pdf && (
            <a href={pub.pdf} target="_blank" rel="noreferrer" className="btn-ghost !px-3.5 !py-1.5 !text-xs">
              <FiFileText aria-hidden /> PDF
              <span className="sr-only">of {pub.title}</span>
            </a>
          )}
          <button onClick={onCite} className="btn-ghost !px-3.5 !py-1.5 !text-xs">
            <BsQuote aria-hidden /> Cite
            <span className="sr-only">{pub.title}</span>
          </button>
          {pub.abstract && (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="inline-flex items-center gap-1 px-2 py-1.5 text-xs text-mist-400 transition hover:text-mist-50"
            >
              Abstract <FiChevronDown aria-hidden className={`transition ${open ? "rotate-180" : ""}`} />
            </button>
          )}
          <span className="ml-auto hidden font-mono text-[0.68rem] text-mist-500 lg:inline">doi:{pub.doi}</span>
        </div>
        <AnimatePresence initial={false}>
          {open && pub.abstract && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden text-sm leading-relaxed text-mist-400"
            >
              <span className="block pt-4">{pub.abstract}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

export default function Publications({ index }: { index: number }) {
  const [citing, setCiting] = useState<Publication | null>(null);
  const closeCite = useCallback(() => setCiting(null), []);
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Publications"
        title={
          <>
            Peer-reviewed <span className="gradient-text">work</span>
          </>
        }
        intro="Conference papers on privacy-preserving computation for industry and secure IoT middleware."
        aside={
          <div className="glass flex items-center gap-4 px-5 py-3">
            <span className="font-display text-3xl font-semibold text-mist-50">{publications.length}</span>
            <span className="text-xs leading-tight text-mist-400">
              peer-reviewed
              <br />
              papers
            </span>
          </div>
        }
      />
      <div className="space-y-4">
        {sorted.map((p) => (
          <PublicationItem key={p.id} pub={p} onCite={() => setCiting(p)} />
        ))}
      </div>
      <AnimatePresence>{citing && <CiteDialog pub={citing} onClose={closeCite} />}</AnimatePresence>
    </div>
  );
}
