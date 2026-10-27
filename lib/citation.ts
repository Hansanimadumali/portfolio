import type { Publication } from "../data/portfolio";

const lastName = (full: string) => full.trim().split(/\s+/).pop() ?? full;

function initials(full: string) {
  const parts = full.trim().split(/\s+/);
  const last = parts.pop();
  return `${last}, ${parts.map((p) => `${p[0]}.`).join(" ")}`;
}

export function bibtexKey(p: Publication) {
  const firstWord = p.title.split(/\s+/).find((w) => w.length > 3) ?? "paper";
  return `${lastName(p.authors[0]).toLowerCase()}${p.year}${firstWord.toLowerCase().replace(/[^a-z]/g, "")}`;
}

export function toBibtex(p: Publication) {
  const entry = p.type === "journal" ? "article" : p.type === "thesis" ? "mastersthesis" : "inproceedings";
  const venueField = p.type === "journal" ? "journal" : "booktitle";
  const fields: [string, string | undefined][] = [
    ["title", `{${p.title}}`],
    ["author", p.authors.join(" and ")],
    [venueField, p.venue],
    ["year", String(p.year)],
    ["pages", p.pages?.replace("–", "--")],
    ["publisher", p.publisher],
    ["doi", p.doi],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${entry}{${bibtexKey(p)},\n${body}\n}`;
}

export function toApa(p: Publication) {
  const authors = p.authors.map(initials);
  const authorStr =
    authors.length === 1 ? authors[0] : `${authors.slice(0, -1).join(", ")}, & ${authors[authors.length - 1]}`;
  const pages = p.pages ? ` (pp. ${p.pages})` : "";
  const publisher = p.publisher ? ` ${p.publisher}.` : "";
  return `${authorStr} (${p.year}). ${p.title}. In ${p.venue}${pages}.${publisher} https://doi.org/${p.doi}`;
}
