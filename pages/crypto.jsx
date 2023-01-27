import React from "react";
import Image from "next/image";
import Crypto from "../public/assets/projects/crypto.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const crypto = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10" />
        <Image
          //   style={{ objectFit: "cover" }}
          className="absolute z-1"
          fill
          src={Crypto}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">Crypto Wallet Transactions</h2>
          <h3>React JS / MUI </h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          {/* <p className="pb-8 text-blue-800">Project</p> */}
          <h2>Overview</h2>
          <p className="py-4 text-gray-600 text-justify">
            This app was built using React JS and is hosted on AWS. Users are
            able to search properties based on their Wallet Address to retrieve
            all the transactions occur through their meta mask wallet. You will
            be able to filter transactions by giving a date range. User can
            download a statement for the selected date range. User also able to
            see their current ethereum balance including total credits and total
            debits witin the selected date range.
          </p>
          <a
            href="https://github.com/fireclint/property-finder"
            target="_blank"
            rel="noreferrer"
          >
            {/* <button className="px-8 py-2 mt-4 mr-8">Code</button> */}
          </a>
          <a href="https://www.blokti.com/" target="_blank" rel="noreferrer">
            <button className="px-8 py-2 mt-4">Demo</button>
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

export default crypto;
