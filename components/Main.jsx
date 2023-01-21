import React from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

import Link from "next/link";

const Main = () => {
  return (
    <div id="home" className="relative w-full h-screen text-center">
      <div className="absolute top-20 left-8 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute top-20 left-32 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute top-48 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-20 right-8 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-20 right-32 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-48 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      <div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          {/* <p className="uppercase text-sm tracking-widest text-gray-600">
            LET&#39;S BUILD SOMETHING TOGETHER
          </p> */}
          <h1 className="py-4 text-gray-700 dark:text-gray-100">
            Hi, I&#39;m <span className="text-[#5651e5]"> Hansani</span>
          </h1>
          <h1 className="py-2 text-gray-700 dark:text-gray-100">
            A Full-Stack Developer
          </h1>
          <p className="py-4 text-gray-600 dark:text-gray-200 sm:max-w-[70%] m-auto">
            I&#39;m a front-end developer specializing in building (and
            occasionally designing) responsive front-end web applications.
            Currently I&#39;m focused on building front-end web applications
            while learning back-end technologies. If you&#39;re looking for a
            developer to add to your team, I&#39;d love to hear from you!
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <Link
              href="https://www.linkedin.com/in/hansanimperera/"
              target="_blank"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 dark:text-gray-300 dark:bg-gray-800 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaLinkedinIn />
              </div>
            </Link>
            <Link href="https://github.com/Hansanimadumali" target="_blank">
              <div className="rounded-full shadow-lg shadow-gray-400 dark:text-gray-300 dark:bg-gray-800 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaGithub />
              </div>
            </Link>
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hansaniperera.wrk@gmail.com"
              target="_blank"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 dark:text-gray-300 dark:bg-gray-800 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <AiOutlineMail />
              </div>
            </Link>
            <a
              href="https://drive.google.com/uc?id=1DUaSQcv9BIcG95UpuXNOlys_aOuhl3JZ&export=download"
              // download="Hansani M. Perera.pdf"
              rel="noreferrer"
              target="_blank"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 dark:text-gray-300 dark:bg-gray-800 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <BsFillPersonLinesFill />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
