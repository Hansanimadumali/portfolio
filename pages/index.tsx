import Head from "next/head";
import Backdrop from "../components/Backdrop";
import SiteHeader from "../components/SiteHeader";
import { CarouselProvider, CarouselStage, type SectionDef } from "../components/WheelCarousel";
import Hero from "../components/sections/Hero";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Publications from "../components/sections/Publications";
import Research from "../components/sections/Research";
import Education from "../components/sections/Education";
import Beyond from "../components/sections/Beyond";
import Contact from "../components/sections/Contact";
import { profile, site } from "../data/portfolio";

// Order here = order on the wheel. Defined at module level so the elements stay stable.
const sections: SectionDef[] = [
  { id: "home", label: "Intro", content: <Hero /> },
  { id: "experience", label: "Experience", content: <Experience index={2} /> },
  { id: "projects", label: "Projects", content: <Projects index={3} /> },
  { id: "publications", label: "Publications", content: <Publications index={4} /> },
  { id: "research", label: "Research", content: <Research index={5} /> },
  { id: "education", label: "Education", content: <Education index={6} /> },
  { id: "beyond", label: "Beyond", content: <Beyond index={7} /> },
  { id: "contact", label: "Contact", content: <Contact index={8} /> },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="author" content={profile.name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.description} />
        {site.url && <meta property="og:url" content={site.url} />}
        {site.url && <meta property="og:image" content={`${site.url}${profile.photo}`} />}
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              affiliation: { "@type": "CollegeOrUniversity", name: profile.affiliation },
            }),
          }}
        />
      </Head>
      <Backdrop />
      <CarouselProvider sections={sections}>
        <SiteHeader />
        <main>
          <CarouselStage />
        </main>
      </CarouselProvider>
    </>
  );
}
