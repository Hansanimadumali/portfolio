import React from "react";
import Image from "next/image";
import AboutImg from "../public/assets/myProfile.png";

const About = () => {
  return (
    <div id="about" className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* <p className="uppercase text-xl tracking-widest text-[#5651e5]">
            About
          </p> */}
          <h2 className="py-4">Who I Am</h2>
          <p className="py-2 text-gray-600 dark:text-gray-300 text-justify">
            I specialize in building responsive front-end UI applications that
            connect with API&#39;s and other backend technologies. I&#39;m
            passionate about learning new technologies and understand there is
            more than one way to accomplish a task. Though I am most proficient
            in building front-end applications using HTML, CSS, Tailwind, MUI,
            Ant D, Javascript, and React, I am a quick learner and can take up
            new tech stacks as needed.Aside from that, I just graduated with a
            Masters in IT focus on cyber security, which has led me to
            investigate the context of secure application development and
            application vulnerabilities. Writing APIs and working with express
            js, dynamo database, aws cognito, aws amplify, and lambda functions
            are some of my experiences in backend development.
          </p>
          <p className="py-2 text-gray-600 dark:text-gray-300 text-justify">
            I admire the drive toward more inclusion and diversity, and I feel
            that being a great developer means using the greatest tool for the
            job rather than employing a certain language. I&#39;m excited to
            make the leap and continue refining my skills with the right
            company. Drop me a message in the contact form below if you&#39;re
            looking for a developer to add to your team. I&#39;d love to hear
            from you!
          </p>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300 dark:bg-gray-800">
          <Image src={AboutImg} className="rounded-xl" alt="/" />
        </div>
      </div>
    </div>
  );
};

export default About;
