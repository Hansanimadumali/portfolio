/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — edit this file to update the website.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything shown on the site (text, links, publications, projects…) lives
 *  here. Components only render what's in this file.
 *
 *  Sources used to fill this in:
 *   • the previous version of this portfolio (bio, projects, links, contact form)
 *   • Crossref / IEEE metadata for the three publications (DOIs verified)
 *
 *  Items marked `TODO` are things that weren't in the old site or the
 *  publication records — fill them in (or delete the field) when you can.
 *  Empty strings / missing optional fields are simply not rendered.
 */

/* ───────────────────────────── Types ───────────────────────────── */

export type ProjectCategory = "software" | "security" | "research" | "ai" | "web3";

export interface Project {
  id: string;
  title: string;
  /** One or two sentences. */
  summary: string;
  categories: ProjectCategory[];
  tech: string[];
  /** Path inside /public, e.g. "/assets/projects/crypto.jpg". Optional. */
  image?: string;
  links?: { label: string; href: string }[];
  year?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  /** Short venue name used for badges and BibTeX keys. */
  venueShort: string;
  year: number;
  pages?: string;
  publisher?: string;
  doi: string;
  /** Direct PDF link (publisher or preprint). */
  pdf?: string;
  abstract?: string;
  tags?: string[];
  type: "conference" | "journal" | "preprint" | "thesis";
}

export interface ExperienceItem {
  role: string;
  org: string;
  unit?: string;
  location?: string;
  period?: string;
  kind: "research" | "industry";
  summary: string;
  points?: string[];
  tech?: string[];
}

export interface EducationItem {
  degree: string;
  /** Short label shown large on the card, e.g. "PhD". */
  short: string;
  field: string;
  institution: string;
  location?: string;
  period?: string;
  details?: string[];
  /** Optional id of a related publication (links the thesis/paper). */
  publicationId?: string;
}

export interface ResearchInterest {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  /** Ids of related publications / projects shown when the node is selected. */
  publications?: string[];
  projects?: string[];
  /** Position on the visualisation, 0–100 in both axes. */
  x: number;
  y: number;
  /** Larger = more central to your current research. 1–3. */
  weight: 1 | 2 | 3;
  accent: "cyan" | "violet";
}

export interface ScrapbookItem {
  id: string;
  title: string;
  caption: string;
  /** Icon shown when there's no photo: camera | music | bachata | freestyle | spark | heart */
  icon: "camera" | "music" | "bachata" | "freestyle" | "spark" | "heart";
  /** Optional photo in /public, e.g. "/assets/beyond/dance.jpg". */
  image?: string;
  imageAlt?: string;
  /** Polaroid tilt in degrees. */
  tilt: number;
  variant: "polaroid" | "note";
}

/* ───────────────────────────── Profile ───────────────────────────── */

export const profile = {
  name: "Hansani Perera",
  firstName: "Hansani",
  initials: "HP",
  role: "Doctoral Researcher",
  affiliation: "Aalto University",
  department: "Department of Electrical Engineering and Automation",
  location: "Espoo, Finland",
  /** Rotating words in the hero headline. */
  identities: ["Doctoral Researcher", "Software Engineer", "Security Researcher"],
  tagline:
    "Researching privacy-preserving data sharing for industrial systems — with a software engineer's instinct for building things that actually ship.",
  bio: [
    "I'm a Doctoral Researcher at Aalto University's Department of Electrical Engineering and Automation. My research looks at how companies in the process industries can share the data needed for life cycle assessment without giving away confidential information — using techniques such as secure multi-party computation.",
    "Before research, I worked as a software engineer building responsive React front-ends and serverless back-ends on AWS (Lambda, DynamoDB, Cognito, Amplify), including Web3 products built on Ethereum smart contracts. My MSc, focused on cyber security, took me into secure application development, application vulnerabilities and secure middleware for IoT edge computing.",
  ],
  photo: "/assets/myProfile.png",
  photoAlt: "Portrait of Hansani Perera",
  highlights: [
    { value: "3", label: "IEEE publications" },
    { value: "MSc", label: "Cyber Security" },
    { value: "PhD", label: "in progress" },
  ],
  skills: [
    "Secure multi-party computation",
    "Privacy-preserving data sharing",
    "Application security",
    "React",
    "JavaScript",
    "Node.js / Express",
    "AWS Lambda · DynamoDB · Cognito",
    "Tailwind CSS · MUI",
    "Ethereum smart contracts",
    "CORBA / Java ORBs",
  ],
};

/* ───────────────────────────── Links ───────────────────────────── */

export const links = {
  email: "hansaniperera.wrk@gmail.com",
  github: "https://github.com/Hansanimadumali",
  linkedin: "https://www.linkedin.com/in/hansanimperera/",
  // TODO: replace with your Google Scholar profile URL (…/citations?user=XXXX).
  scholar:
    "https://scholar.google.com/citations?view_op=search_authors&mauthors=Hansani+Perera",
  cv: "https://drive.google.com/uc?id=1DUaSQcv9BIcG95UpuXNOlys_aOuhl3JZ&export=download",
};

/** Same Getform endpoint the previous site used — messages arrive by email. */
export const contactForm = {
  endpoint: "https://getform.io/f/1577bb0b-e0c6-453d-9474-e9a874706d55",
  heading: "Let's talk research, security, or software.",
  intro:
    "Whether it's a research collaboration, a question about one of my papers, or an engineering project — send a message and it lands straight in my inbox.",
};

/* ───────────────────────────── Experience ───────────────────────────── */

export const experience: ExperienceItem[] = [
  {
    role: "Doctoral Researcher",
    org: "Aalto University",
    unit: "Department of Electrical Engineering and Automation",
    location: "Espoo, Finland",
    period: "Current", // TODO: e.g. "2024 — Present"
    kind: "research",
    summary:
      "Research on confidentiality-preserving data sharing for life cycle assessment (LCA) in the process industries.",
    points: [
      "Designing approaches that let industrial partners compute shared LCA results without revealing confidential process data.",
      "Evaluating the performance of secure multi-party computation (SMPC) protocols for privacy-preserving LCA.",
      "Published at IEEE ETFA 2024 and IEEE IECON 2025.",
    ],
    tech: ["Secure multi-party computation", "Privacy engineering", "Industrial automation"],
  },
  {
    role: "Software Engineer",
    org: "", // TODO: add company name(s)
    period: "", // TODO: e.g. "2020 — 2023"
    kind: "industry",
    summary:
      "Built responsive front-end applications connected to APIs and serverless back-ends, including Web3 products.",
    points: [
      "Front-end applications in React with Tailwind CSS, MUI and Ant Design.",
      "APIs and back-end services with Express.js, AWS Lambda, DynamoDB, Cognito and Amplify.",
      "Ethereum wallet statement app and an ENS subdomain creator interacting with smart contracts.",
      "Sindu Chart — airplay charts for Sri Lankan FM radio channels, artists and albums.",
    ],
    tech: ["React", "JavaScript", "Node.js", "AWS", "Ethereum"],
  },
  {
    role: "MSc Research — IoT Edge Middleware",
    org: "Sri Lanka Institute of Information Technology",
    period: "Published 2022",
    kind: "research",
    summary:
      "Thesis research on CORBA as a secure publisher–subscriber middleware for the IoT edge-computing layer.",
    points: [
      "Designed and implemented a CORBA-based pub/sub middleware using the Event and Security services.",
      "Evaluated it with load and burst tests in a simulated cloud-hosted IoT environment.",
      "Published at the IEEE SCSE 2022 conference.",
    ],
    tech: ["Java", "CORBA", "JacORB", "OpenORB", "IoT"],
  },
];

/* ───────────────────────────── Projects ───────────────────────────── */

export const projects: Project[] = [
  {
    id: "privacy-lca",
    title: "Privacy-Preserving Life Cycle Assessment",
    summary:
      "Doctoral research on sharing LCA data across process-industry partners while keeping it confidential, and benchmarking SMPC protocols for the computation.",
    categories: ["research", "security"],
    tech: ["Secure multi-party computation", "Confidential data sharing", "Process industries"],
    links: [
      { label: "ETFA 2024 paper", href: "https://doi.org/10.1109/ETFA61755.2024.10710738" },
      { label: "IECON 2025 paper", href: "https://doi.org/10.1109/IECON58223.2025.11221678" },
    ],
    year: "2024 — 2025",
  },
  {
    id: "corba-middleware",
    title: "CORBA Pub/Sub Middleware for IoT Edge",
    summary:
      "A publisher–subscriber middleware built on CORBA's Event and Security services, load- and burst-tested in a simulated IoT environment.",
    categories: ["research", "security", "software"],
    tech: ["Java", "Oracle Java ORB", "OpenORB", "JacORB"],
    links: [{ label: "Paper", href: "https://doi.org/10.1109/SCSE56529.2022.9905164" }],
    year: "2022",
  },
  {
    id: "crypto-wallet",
    title: "Crypto Wallet Statements",
    summary:
      "Look up every transaction of a MetaMask wallet address, filter by date range, see credits, debits and ETH balance, and download a statement.",
    categories: ["software", "web3"],
    tech: ["React", "MUI", "AWS", "Ethereum"],
    image: "/assets/projects/crypto.jpg",
    links: [{ label: "Live", href: "https://www.blokti.com/" }],
  },
  {
    id: "sindu-chart",
    title: "Sindu Chart",
    summary:
      "Airplay charts for 10 Sri Lankan FM channels, plus top artists and albums — filterable by language, year, month and date.",
    categories: ["software"],
    tech: ["React", "Tailwind CSS", "Node.js", "AWS"],
    image: "/assets/projects/sinduChart.jpg",
    links: [{ label: "Live", href: "https://www.sinduchart.com/" }],
  },
  {
    id: "ens-subdomains",
    title: "ENS Subdomain Creator",
    summary:
      "Lets authorised users create their own ENS subdomains, interacting with the blockchain through smart contracts.",
    categories: ["software", "web3"],
    tech: ["React", "MUI", "Smart contracts", "AWS"],
    image: "/assets/projects/ensApp.jpg",
  },
  {
    id: "admin-panel",
    title: "Developer Admin Panel",
    summary:
      "An internal tool for developers to add, update and delete the data an application depends on.",
    categories: ["software"],
    tech: ["React", "MUI", "Node.js"],
    image: "/assets/projects/sinduAdmin.jpg",
    links: [{ label: "Live", href: "https://www.ens1.finitynordic.com/Ad3/" }],
  },
  // Add AI projects with `categories: ["ai", ...]` — the "AI" filter tab appears automatically.
];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  software: "Software",
  security: "Security",
  research: "Research",
  ai: "AI",
  web3: "Web3",
};

/* ───────────────────────────── Publications ───────────────────────────── */

/** Your name as it appears in author lists — highlighted on the site. */
export const authorName = "Hansani Perera";

export const publications: Publication[] = [
  {
    id: "iecon2025",
    title:
      "Performance Evaluation of Privacy-Preserving Life Cycle Assessment Using Secure Multi-Party Computation Protocols",
    authors: ["Hansani Perera", "Udayanto Dwi Atmojo", "Valeriy Vyatkin"],
    venue: "IECON 2025 – 51st Annual Conference of the IEEE Industrial Electronics Society",
    venueShort: "IECON",
    year: 2025,
    pages: "1–6",
    publisher: "IEEE",
    doi: "10.1109/IECON58223.2025.11221678",
    pdf: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=11221678",
    tags: ["SMPC", "Privacy", "LCA"],
    type: "conference",
  },
  {
    id: "etfa2024",
    title: "Confidentiality Preserving Data Sharing for Life Cycle Assessment in Process Industries",
    authors: ["Hansani Perera", "Udayanto Dwi Atmojo", "Valeriy Vyatkin"],
    venue:
      "2024 IEEE 29th International Conference on Emerging Technologies and Factory Automation (ETFA)",
    venueShort: "ETFA",
    year: 2024,
    pages: "1–4",
    publisher: "IEEE",
    doi: "10.1109/ETFA61755.2024.10710738",
    pdf: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10710738",
    tags: ["Confidentiality", "Data sharing", "Process industries"],
    type: "conference",
  },
  {
    id: "scse2022",
    title:
      "Common Object Request Broker-based Publisher-Subscriber Middleware for Internet of Things - Edge Computing",
    authors: ["Hansani Perera", "Anuradha Jayakody"],
    venue:
      "2022 International Research Conference on Smart Computing and Systems Engineering (SCSE)",
    venueShort: "SCSE",
    year: 2022,
    pages: "68–75",
    publisher: "IEEE",
    doi: "10.1109/SCSE56529.2022.9905164",
    pdf: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=9905164",
    abstract:
      "The edge computing layer in IoT reduces the flow of a massive amount of data directly to the cloud by processing some data in the local network. The middleware in the layer enables this processing of data and the communication between heterogeneous devices and services in the nearby layers. CORBA, which uses as a powerful middleware technology in developing middleware solutions in enterprise-level distributed applications, has been abandoned in the current generation. The paper presents the design, and the performance evaluation of a publisher-subscriber middleware implemented using CORBA that was studied when exploring the applicability of CORBA as an IoT edge computing middleware. The evaluation was continued in two steps to analyse several parallel connections (Load test) and handle requests in a unit time (burst test) via simulating an IoT environment in a cloud environment.",
    tags: ["IoT", "Edge computing", "Middleware"],
    type: "conference",
  },
];

/* ───────────────────────────── Research interests ───────────────────────────── */

export const researchInterests: ResearchInterest[] = [
  {
    id: "privacy",
    label: "Privacy-Preserving Computation",
    description:
      "Computing joint results over data that no single party is willing to reveal — the core of my doctoral work, using secure multi-party computation.",
    keywords: ["SMPC", "Confidentiality", "Protocol performance"],
    publications: ["iecon2025", "etfa2024"],
    projects: ["privacy-lca"],
    x: 50,
    y: 46,
    weight: 3,
    accent: "violet",
  },
  {
    id: "data-sharing",
    label: "Secure Data Sharing",
    description:
      "Mechanisms that let organisations collaborate on shared metrics while protecting business-sensitive process data.",
    keywords: ["Data sovereignty", "Confidential collaboration"],
    publications: ["etfa2024"],
    projects: ["privacy-lca"],
    x: 22,
    y: 24,
    weight: 2,
    accent: "cyan",
  },
  {
    id: "industrial",
    label: "Industrial Systems & Automation",
    description:
      "Applying security and privacy engineering to process industries and factory automation settings.",
    keywords: ["Process industries", "Factory automation", "Industrial electronics"],
    publications: ["etfa2024", "iecon2025"],
    x: 80,
    y: 22,
    weight: 2,
    accent: "cyan",
  },
  {
    id: "lca",
    label: "Life Cycle Assessment",
    description:
      "Sustainability assessment across supply chains — a use case where data is valuable to share but sensitive to expose.",
    keywords: ["Sustainability", "Supply chains"],
    publications: ["etfa2024", "iecon2025"],
    x: 86,
    y: 56,
    weight: 1,
    accent: "violet",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    description:
      "The thread through everything: from application vulnerabilities and secure development to secure communication between distributed components.",
    keywords: ["Threat models", "Secure development", "Vulnerabilities"],
    projects: ["corba-middleware"],
    x: 16,
    y: 62,
    weight: 2,
    accent: "violet",
  },
  {
    id: "iot-edge",
    label: "IoT & Edge Computing",
    description:
      "Processing data close to where it's produced, and securing the communication between sensing, edge and cloud layers.",
    keywords: ["Edge layer", "Heterogeneous devices"],
    publications: ["scse2022"],
    projects: ["corba-middleware"],
    x: 34,
    y: 86,
    weight: 1,
    accent: "cyan",
  },
  {
    id: "middleware",
    label: "Middleware & Distributed Systems",
    description:
      "Publisher–subscriber and request/response middleware, and how to make them reliable and secure under load.",
    keywords: ["Pub/Sub", "CORBA", "Load & burst testing"],
    publications: ["scse2022"],
    projects: ["corba-middleware"],
    x: 66,
    y: 84,
    weight: 1,
    accent: "violet",
  },
];

/** Pairs of research-interest ids drawn as connections. */
export const researchLinks: [string, string][] = [
  ["privacy", "data-sharing"],
  ["privacy", "industrial"],
  ["privacy", "lca"],
  ["privacy", "cybersecurity"],
  ["data-sharing", "industrial"],
  ["industrial", "lca"],
  ["cybersecurity", "iot-edge"],
  ["cybersecurity", "data-sharing"],
  ["iot-edge", "middleware"],
  ["middleware", "privacy"],
];

/* ───────────────────────────── Education ───────────────────────────── */

export const education: EducationItem[] = [
  {
    degree: "Doctor of Science (Technology)", // TODO: confirm exact degree title
    short: "PhD",
    field: "Electrical Engineering and Automation",
    institution: "Aalto University",
    location: "Espoo, Finland",
    period: "In progress",
    details: ["Research: confidentiality-preserving data sharing and SMPC for life cycle assessment."],
  },
  {
    degree: "Master of Science in Information Technology",
    short: "MSc",
    field: "Cyber Security",
    institution: "Sri Lanka Institute of Information Technology",
    location: "Sri Lanka",
    period: "", // TODO: add years
    details: [
      "Focus on secure application development and application vulnerabilities.",
      "Thesis: CORBA-based publisher–subscriber middleware for IoT edge computing.",
    ],
    publicationId: "scse2022",
  },
  // TODO: add previous qualifications, e.g.
  // { degree: "BSc (Hons) in …", short: "BSc", field: "…", institution: "…", period: "…" },
];

/* ───────────────────────────── Beyond research ───────────────────────────── */

export const beyond = {
  heading: "Beyond research",
  intro:
    "Life outside the lab — the things that keep me curious, creative and moving.",
  items: [
    {
      id: "me",
      title: "Hi, that's me",
      caption: "Hansani",
      icon: "heart",
      image: "/assets/myProfile.png",
      imageAlt: "Hansani smiling in front of blue and orange bokeh lights",
      tilt: -4,
      variant: "polaroid",
    },
    {
      id: "photography",
      title: "Photography",
      caption: "Collecting light, colour and small moments.",
      icon: "camera",
      tilt: 3,
      variant: "polaroid",
      // image: "/assets/beyond/photo.jpg",
    },
    {
      id: "music",
      title: "Music",
      caption: "There's always a playlist running.",
      icon: "music",
      tilt: -2,
      variant: "note",
    },
    {
      id: "bachata",
      title: "Bachata",
      caption: "Connection, musicality and footwork on the social floor.",
      icon: "bachata",
      tilt: 2.5,
      variant: "polaroid",
      // image: "/assets/beyond/bachata.jpg",
    },
    {
      id: "freestyle",
      title: "Freestyle",
      caption: "No choreography — just the beat and whatever it suggests.",
      icon: "freestyle",
      tilt: -3,
      variant: "polaroid",
      // image: "/assets/beyond/freestyle.jpg",
    },
    {
      id: "more",
      title: "& more",
      caption: "Always picking up something new.", // TODO: list other interests
      icon: "spark",
      tilt: 4,
      variant: "note",
    },
  ] satisfies ScrapbookItem[],
};

/* ───────────────────────────── Site / SEO ───────────────────────────── */

export const site = {
  title: "Hansani Perera — Doctoral Researcher · Security & Privacy",
  description:
    "Portfolio of Hansani Perera: Doctoral Researcher at Aalto University working on privacy-preserving data sharing, former software engineer, MSc in Cyber Security.",
  // TODO: set to your Netlify / custom domain for correct social previews.
  url: "",
};
