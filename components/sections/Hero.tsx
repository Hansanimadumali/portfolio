import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { links, profile } from "../../data/portfolio";

function RotatingIdentity() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.identities.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid h-[1.25em] overflow-hidden align-bottom">
      <span aria-hidden className="col-start-1 row-start-1 grid">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.identities[i]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text col-start-1 row-start-1 whitespace-nowrap"
        >
          {profile.identities[i]}
        </motion.span>
      </AnimatePresence>
      </span>
      {/* Screen readers get the full list once instead of a ticking region. */}
      <span className="sr-only">{profile.identities.join(", ")}</span>
    </span>
  );
}

export default function Hero() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
      <div className="order-2 lg:order-1">
        <p className="eyebrow mb-5 flex items-start gap-3">
          <span className="relative mt-[0.3em] flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
          </span>
          <span>
            {profile.role} · {profile.affiliation}
          </span>
        </p>

        <h1 className="font-display text-[2.6rem] font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 font-display text-xl text-mist-200 sm:text-2xl">
          <RotatingIdentity />
        </p>

        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-mist-200 sm:text-lg">{profile.tagline}</p>

        <div className="mt-6 space-y-3 text-[0.95rem] leading-relaxed text-mist-400">
          {profile.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#publications" className="btn-primary">
            Explore my research <FiArrowDown aria-hidden />
          </a>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
          <a href={links.scholar} target="_blank" rel="noreferrer" className="btn-ghost">
            Google Scholar <FiArrowUpRight aria-hidden />
          </a>
        </div>

        <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
          {profile.highlights.map((h) => (
            <div key={h.label} className="glass px-4 py-3">
              <dt className="sr-only">{h.label}</dt>
              <dd className="font-display text-2xl font-semibold text-mist-50">{h.value}</dd>
              <dd className="mt-0.5 text-[0.72rem] leading-tight text-mist-400">{h.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="order-1 mx-auto w-full max-w-[260px] sm:max-w-[340px] lg:order-2 lg:max-w-none">
        <div className="relative aspect-square">
          {/* Orbit rings */}
          <div aria-hidden className="absolute -inset-[8%] animate-spin-slow rounded-full border border-dashed border-white/10" />
          <div
            aria-hidden
            className="absolute -inset-[2%] rounded-full opacity-80 [background:conic-gradient(from_0deg,rgb(94_231_240/0.9),rgb(169_139_255/0.9),transparent_45%,rgb(94_231_240/0.9))] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))] animate-spin-slow [animation-duration:9s]"
          />
          <div className="absolute inset-[3%] overflow-hidden rounded-full bg-ink-800 shadow-[0_30px_80px_-20px_rgb(169_139_255/0.45)]">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 340px"
              className="object-cover object-[50%_30%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
          </div>
          <span aria-hidden className="chip absolute -left-2 top-[18%] bg-ink-800/90 backdrop-blur sm:-left-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" /> Security
          </span>
          <span aria-hidden className="chip absolute -right-2 top-[46%] bg-ink-800/90 backdrop-blur sm:-right-6">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-glow" /> Privacy
          </span>
          <span aria-hidden className="chip absolute bottom-[6%] left-[8%] bg-ink-800/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-mist-50" /> Software
          </span>
        </div>
      </div>

      <div className="order-3 lg:col-span-2">
        <p className="eyebrow mb-3 !text-mist-500">Toolkit</p>
        <ul className="flex flex-wrap gap-2">
          {profile.skills.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-8 hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-mist-500 sm:flex">
          <FiArrowDown className="animate-bounce" aria-hidden /> Scroll to turn the wheel
        </p>
      </div>
    </div>
  );
}
