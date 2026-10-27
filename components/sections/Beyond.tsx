import Image from "next/image";
import { motion } from "motion/react";
import { FiCamera, FiHeart, FiMusic } from "react-icons/fi";
import { PiDiscoBall } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdOutlineNightlife } from "react-icons/md";
import SectionHeading from "../ui/SectionHeading";
import { beyond, type ScrapbookItem } from "../../data/portfolio";

const icons: Record<ScrapbookItem["icon"], typeof FiCamera> = {
  camera: FiCamera,
  music: FiMusic,
  bachata: MdOutlineNightlife,
  freestyle: PiDiscoBall,
  spark: HiOutlineSparkles,
  heart: FiHeart,
};

const artGradients = [
  "from-[#2a1f4d] via-[#3b2a6b] to-[#1b3a4b]",
  "from-[#13343b] via-[#1d4b55] to-[#2d1f4d]",
  "from-[#3a1d3f] via-[#53295c] to-[#1d2a4d]",
  "from-[#1a2b45] via-[#22406a] to-[#3b2462]",
];

function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-6 w-20 bg-[linear-gradient(90deg,rgb(255_255_255/0.22),rgb(255_255_255/0.32),rgb(255_255_255/0.22))] shadow-sm backdrop-blur-[1px] ${className}`}
    />
  );
}

function Polaroid({ item, i }: { item: ScrapbookItem; i: number }) {
  const Icon = icons[item.icon];
  return (
    <motion.figure
      initial={false}
      whileHover={{ rotate: 0, y: -8, scale: 1.04, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ rotate: item.tilt }}
      className="relative mx-auto w-full max-w-[260px] rounded-[3px] bg-paper p-3 pb-4 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.8)] outline-none"
    >
      <Tape className={i % 2 ? "-top-3 right-6 rotate-[8deg]" : "-top-3 left-6 -rotate-[6deg]"} />
      <div className="relative aspect-square overflow-hidden bg-ink-800">
        {item.image ? (
          <Image src={item.image} alt={item.imageAlt ?? item.title} fill sizes="260px" className="object-cover object-[50%_30%]" />
        ) : (
          <div className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${artGradients[i % artGradients.length]}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.18),transparent_45%)]" />
            <Icon aria-hidden className="relative h-16 w-16 text-white/85 drop-shadow-[0_0_18px_rgb(169_139_255/0.8)]" />
          </div>
        )}
      </div>
      <figcaption className="mt-3 px-1 text-ink-900">
        <span className="block font-hand text-2xl font-bold leading-none">{item.title}</span>
        <span className="mt-1 block font-hand text-lg leading-tight text-ink-700/80">{item.caption}</span>
      </figcaption>
    </motion.figure>
  );
}

function Note({ item, i }: { item: ScrapbookItem; i: number }) {
  const Icon = icons[item.icon];
  return (
    <motion.div
      whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ rotate: item.tilt }}
      className={`relative mx-auto flex aspect-square w-full max-w-[210px] flex-col justify-between p-5 shadow-[0_18px_30px_-12px_rgb(0_0_0/0.7)] ${
        i % 2 ? "bg-[#c9b8ff]" : "bg-[#9ff0f4]"
      }`}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
      <Icon aria-hidden className="h-8 w-8 text-ink-900/80" />
      <div className="text-ink-900">
        <p className="font-hand text-3xl font-bold leading-none">{item.title}</p>
        <p className="mt-2 font-hand text-lg leading-tight text-ink-900/75">{item.caption}</p>
      </div>
    </motion.div>
  );
}

export default function Beyond({ index }: { index: number }) {
  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Beyond research"
        title={
          <>
            Off the clock, <span className="font-hand text-[1.25em] font-bold text-violet-glow">on the dance floor</span>
          </>
        }
        intro={beyond.intro}
      />

      <div className="relative rounded-3xl border border-white/[0.06] bg-[radial-gradient(circle_at_20%_10%,rgb(169_139_255/0.08),transparent_40%),radial-gradient(circle_at_80%_90%,rgb(94_231_240/0.07),transparent_40%)] px-4 py-10 sm:px-8">
        {/* doodles */}
        <svg aria-hidden className="absolute right-6 top-4 h-16 w-16 text-violet-glow/40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M32 6l5 15 15 5-15 5-5 15-5-15-15-5 15-5z" />
        </svg>
        <svg aria-hidden className="absolute bottom-6 left-6 h-14 w-28 text-cyan-glow/40" viewBox="0 0 120 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 40c14-26 26-26 34 0s22 26 34 0 26-26 44-10" />
        </svg>
        <p aria-hidden className="absolute left-8 top-3 hidden -rotate-3 font-hand text-2xl text-mist-400 sm:block">
          scrapbook ✶
        </p>

        <ul className="grid grid-cols-1 items-center gap-x-6 gap-y-10 pt-6 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {beyond.items.map((item, i) => (
            <li key={item.id} className={i % 3 === 1 ? "lg:translate-y-6" : ""}>
              {item.variant === "polaroid" ? <Polaroid item={item} i={i} /> : <Note item={item} i={i} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
