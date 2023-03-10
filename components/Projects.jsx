import React from "react";
import SinduAdmin from "../public/assets/projects/sinduAdmin.jpg";
import Crypto from "../public/assets/projects/crypto.jpg";
import SinduChart from "../public/assets/projects/sinduChart.jpg";
import Ens from "../public/assets/projects/ensApp.jpg";
import ProjectItem from "../components/ProjectItem";

const Projects = () => {
  return (
    <div id="projects" className="w-full">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        {/* <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p> */}
        <h2 className="py-4">Projects I Worked On</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectItem
            title="Crypto Wallet"
            backgroundImg={Crypto}
            projectUrl="/crypto"
          />
          <ProjectItem
            title="Sindu Chart"
            backgroundImg={SinduChart}
            projectUrl="/sinduChart"
          />
          <ProjectItem
            title="ENS Subdomain Creator"
            backgroundImg={Ens}
            projectUrl="/ens"
          />
          <ProjectItem
            title="Admin Panel"
            backgroundImg={SinduAdmin}
            projectUrl="/adminSindu"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
