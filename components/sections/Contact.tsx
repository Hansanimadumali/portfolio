import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowUpRight, FiCheckCircle, FiDownload, FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import SectionHeading from "../ui/SectionHeading";
import { contactForm, links, profile } from "../../data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

const channels = [
  { label: "Email", value: links.email, href: `mailto:${links.email}`, icon: FiMail },
  { label: "GitHub", value: links.github.replace("https://", ""), href: links.github, icon: FiGithub },
  { label: "LinkedIn", value: "in/hansanimperera", href: links.linkedin, icon: FiLinkedin },
  { label: "Google Scholar", value: "Publications & citations", href: links.scholar, icon: SiGooglescholar },
  { label: "CV", value: "Download PDF", href: links.cv, icon: FiDownload },
];

function Field({ name, label, type = "text", required = false, textarea = false, autoComplete }: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={name} required={required} rows={5} placeholder={label} className="field resize-none" />
      ) : (
        <input id={id} name={name} type={type} required={required} placeholder={label} autoComplete={autoComplete} className="field" />
      )}
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden className="text-cyan-glow"> *</span>}
      </label>
    </div>
  );
}

export default function Contact({ index }: { index: number }) {
  const [status, setStatus] = useState<Status>("idle");

  // Submits to Getform in the background; without JS the form still posts normally.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(contactForm.endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <SectionHeading index={index} eyebrow="Contact" title={<span className="gradient-text">{contactForm.heading}</span>} intro={contactForm.intro} />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <ul className="space-y-2.5">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass group flex items-center gap-4 px-4 py-3.5 transition hover:border-cyan-glow/40 hover:bg-white/[0.05]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-800 text-mist-50 transition group-hover:border-cyan-glow/50 group-hover:text-cyan-glow">
                  <c.icon aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-mist-50">{c.label}</span>
                  <span className="block truncate text-xs text-mist-400">{c.value}</span>
                </span>
                <FiArrowUpRight aria-hidden className="shrink-0 text-mist-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-glow" />
              </a>
            </li>
          ))}
        </ul>

        <div className="glass relative overflow-hidden p-5 sm:p-7">
          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                role="status"
              >
                <FiCheckCircle className="h-12 w-12 text-cyan-glow" aria-hidden />
                <h3 className="mt-4 text-2xl font-semibold">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-mist-400">Thank you — I&apos;ll get back to you by email soon.</p>
                <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                action={contactForm.endpoint}
                method="POST"
                onSubmit={onSubmit}
                className="space-y-3"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field name="name" label="Name" required autoComplete="name" />
                  <Field name="email" label="Email" type="email" required autoComplete="email" />
                </div>
                <Field name="subject" label="Subject" />
                <Field name="message" label="Message" textarea required />
                {/* Spam honeypot recognised by Getform */}
                <input type="hidden" name="_gotcha" style={{ display: "none" }} />
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-mist-500" role={status === "error" ? "alert" : undefined}>
                    {status === "error" ? (
                      <span className="text-rose-300">
                        Something went wrong. Please email me at{" "}
                        <a className="underline" href={`mailto:${links.email}`}>
                          {links.email}
                        </a>
                        .
                      </span>
                    ) : (
                      "Goes straight to my inbox."
                    )}
                  </p>
                  <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Send message"} <FiSend aria-hidden />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-mist-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono tracking-wider">Built with Next.js · Motion · CSS 3D</p>
        <a href="#home" className="hover:text-mist-50">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}
