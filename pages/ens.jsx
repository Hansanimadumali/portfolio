import React from "react";
import Image from "next/image";
import Ens from "../public/assets/projects/ensApp.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const ens = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          //   style={{ objectFit: "cover" }}
          className="absolute z-1"
          fill
          src={Ens}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">ENS Sudomain Creator</h2>
          <h3>React JS / MUI </h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          {/* <p className="pb-8 text-blue-800">Project</p> */}
          <h2>Overview</h2>
          <p className="py-4 text-gray-600 text-justify">
            This app was built using React JS and is hosted on AWS. Application
            allows authorized users to create their subdomains. The application
            uses smart contracts to interact with the blockchain.
          </p>
          <a
            href="https://github.com/fireclint/property-finder"
            target="_blank"
            rel="noreferrer"
          >
            {/* <button className="px-8 py-2 mt-4 mr-8">Code</button> */}
          </a>
          <a
            href="https://property-finder-development.web.app/"
            target="_blank"
            rel="noreferrer"
          >
            {/* <button className="px-8 py-2 mt-4">Demo</button> */}
          </a>
        </div>
        <div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl py-4">
          <div className="p-2">
            <p className="text-center font-bold pb-2">Technologies</p>
            <div className="grid grid-cols-3 md:grid-cols-1">
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> React
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> MUI
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Javascript
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Etherscan/Infura/Alchemy
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Ethereum Blockchain
              </p>
            </div>
          </div>
        </div>
        <Link href="/#projects">
          <p className="underline cursor-pointer">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default ens;
