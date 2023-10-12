import React from "react";
import Image from "next/image";
import AboutImg from "../public/assets/myProfile.png";
import Link from "next/link";

const Publications = () => {
  return (
    <div
      id="publications"
      className="w-full md:h-screen p-2 flex items-center py-16"
    >
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-4">
          {/* <p className="uppercase text-xl tracking-widest text-[#5651e5]">
            About
          </p> */}
          <h2 className="py-4">Publications</h2>
          <h4>CORBA based pub-sub middleware for IoT Edge Computing</h4>
          <p className="py-2 text-gray-600 dark:text-gray-300 text-justify">
            The edge computing layer in IoT reduces the flow of a massive amount
            of data directly to the cloud by processing some data in the local
            network. The middleware in the layer enables this processing of data
            and the communication between heterogeneous devices and services in
            the nearby layers. CORBA, which uses as a powerful middleware
            technology in developing middleware solutions in enterprise-level
            distributed applications, has been abandoned in the current
            generation. The paper presents the design, and the performance
            evaluation of a publisher-subscriber middleware implemented using
            CORBA that was studied when exploring the applicability of CORBA as
            an IoT edge computing middleware. The evaluation was continued in
            two steps to analyse several parallel connections (Load test) and
            handle requests in a unit time (burst test) via simulating an IoT
            environment in a cloud environment.
          </p>
          <a href="https://ieeexplore.ieee.org/document/9905164">
            Click here to read full paper
          </a>
          <div>
          <Link href="/corba">
            <button className="px-8 py-2 mt-4">Read More</button>
          </Link>
        </div>
        </div>
       
        {/* <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300 dark:bg-gray-800">
          <Image src={AboutImg} className="rounded-xl" alt="/" />
        </div> */}
      </div>
    </div>
  );
};

export default Publications;
