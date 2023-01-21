import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import NavLogo from "../public/assets/myLogo.png";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Link from "next/link";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");
  const router = useRouter();

  useEffect(() => {
    if (
      router.asPath === "/property" ||
      router.asPath === "/crypto" ||
      router.asPath === "/netflix" ||
      router.asPath === "/twitch"
    ) {
      setNavBg("transparent");
      setLinkColor("#ecf0f3");
    } else {
      setNavBg("#ecf0f3");
      setLinkColor("#1f2937");
    }
  }, [router]);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      // style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300 bg-[#ecf0f3] dark:bg-[#090720b9]"
          : "fixed w-full h-20 z-[100] bg-[#ecf0f3] dark:bg-[#090720b9]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image
            src={NavLogo}
            alt="/"
            className="cursor-pointer"
            style={{ padding: 10 }}
          />
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <li className="ml-10 text-sm uppercase hover:border-b dark:text-[#ecf0f3]">
              <Link href="/">Home</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b dark:text-[#ecf0f3]">
              <Link href="/#about">About</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b dark:text-[#ecf0f3]">
              <Link href="/#skills">Skills</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b dark:text-[#ecf0f3]">
              <Link href="/#projects">Projects</Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b dark:text-[#ecf0f3]">
              <Link href="https://drive.google.com/uc?id=1DUaSQcv9BIcG95UpuXNOlys_aOuhl3JZ&export=download">
                Resume
              </Link>
            </li>
            <li className="ml-10 text-sm uppercase hover:border-b dark:text-[#ecf0f3]">
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className="md:hidden"
          >
            <AiOutlineMenu size={25} className="dark:text-[#ecf0f3]" />
          </div>
        </div>
      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-0 w-screen h-screen bg-black/70"
            : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] sm:w-[60%] md:w-[60%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500 dark:bg-[#090720]"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500 dark:bg-[#090720]"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Image src={NavLogo} alt="/" style={{ padding: 10 }} />
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose className="dark:text-[#ecf0f3]" />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4"></div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href="/">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm dark:text-[#ecf0f3]"
                >
                  Home
                </li>
              </Link>
              <Link href="/#about">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm dark:text-[#ecf0f3]"
                >
                  About
                </li>
              </Link>
              <Link href="/#skills">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm dark:text-[#ecf0f3]"
                >
                  Skills
                </li>
              </Link>
              <Link href="/#projects">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm dark:text-[#ecf0f3]"
                >
                  Projects
                </li>
              </Link>
              <Link href="/resume">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm dark:text-[#ecf0f3]"
                >
                  Resume
                </li>
              </Link>
              <Link href="/#contact">
                <li
                  onClick={() => setNav(false)}
                  className="py-4 text-sm dark:text-[#ecf0f3]"
                >
                  Contact
                </li>
              </Link>
            </ul>
            <div className="pt-40">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let&#39;S Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 dark:text-[#ecf0f3]">
                  <FaLinkedinIn />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 dark:text-[#ecf0f3]">
                  <FaGithub />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 dark:text-[#ecf0f3]">
                  <AiOutlineMail />
                </div>
                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 dark:text-[#ecf0f3]">
                  <BsFillPersonLinesFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
