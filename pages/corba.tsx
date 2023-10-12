import React from "react";
import Image from "next/image";
import Ens from "../public/assets/projects/ensApp.jpg";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const corba = () => {
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
          <h2 className="py-2">
            Common Object Request Broker-based Publisher-Subscriber Middleware
            for Internet of Things - Edge Computing
          </h2>
          <h3>Oracle Java ORB, OpenORB, JacORB </h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          {/* <p className="pb-8 text-blue-800">Project</p> */}
          <h2>Overview</h2>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            In the rapidly evolving landscape of the Internet of Things (IoT),
            where heterogeneous devices and applications interconnect
            seamlessly, the need for robust middleware solutions cannot be
            overstated. This thesis explores the utilization of the Common
            Object Request Broker Architecture (CORBA) as a middleware
            specification to facilitate communication across diverse IoT layers.
            The fundamental conclusion drawn from this research is that CORBA&apos;s
            intrinsic support for heterogeneity positions it as a viable option
            for bridging the communication gaps within the IoT ecosystem.
          </p>
          <h4>IoT Edge Computing and CORBA Communication</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            IoT edge computing involves a complex web of communication between
            cloud-based applications and the sensing layer&apos;s devices. CORBA, as
            a middleware, excels in this context due to its innate ability to
            transcend hardware and software disparities, programming language
            variations, and network idiosyncrasies. It inherently supports
            heterogeneity, making it an ideal candidate for the IoT edge
            computing layer.
          </p>
          <h4>Security Challenges in Sensing Layer Communication</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            One critical challenge in IoT communication is security within the
            sensing layer. Vulnerabilities in this layer have necessitated
            ongoing research. The study suggests that employing CORBA&apos;s Security
            Service, which includes channel security through SSL encryption and
            access control via authentication and authorization frameworks, can
            effectively secure communication within IoT layers. Additionally,
            CORBA enables the integration of existing identity management and
            custom authentication and authorization frameworks like OAuth,
            fortifying the IoT security triad.
          </p>
          <h4>CORBA as an Enabler of Security in Edge Computing</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            By leveraging CORBA as a middleware in the edge computing layer, it
            becomes feasible to realize a secure communication framework
            encompassing IoT devices, cloud applications, and identity
            management services. This capability is pivotal in enhancing the
            overall security posture of the IoT ecosystem.
          </p>
          <h4>Middleware Categories and Asynchronous Communication</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            This research further delves into the applicability of CORBA as a
            middleware by examining various middleware categories. CORBA&apos;s
            synchronous nature makes it suitable for request/response-based
            middleware like Name Servers. Overcoming the challenge of developing
            asynchronous middleware with CORBA is achieved through the Event
            Service specification. A publisher/subscriber middleware is
            developed and tested in a simulated environment using security and
            event services.
          </p>
          <h4>Success of CORBA-Based Publisher/Subscriber Middleware</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            The CORBA-based publisher/subscriber middleware demonstrates
            success, particularly in scenarios requiring mission-critical
            information flow with 100% message delivery assurance. Moreover, the
            inherent support for non-textual messages and the robust security
            features offered by CORBA implementations make it a compelling
            choice for such applications. The model effectively handles a high
            volume of connections simultaneously, positioning it as a middleware
            solution for IoT edge layers.
          </p>
          <h4>Resource Consumption and Future Prospects</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            It&apos;s important to note that CORBA&apos;s resource consumption exceeds
            that of typical middleware solutions. However, ongoing developments
            in hardware specifications and optimized Object Request Broker (ORB)
            implementations are poised to mitigate this issue. Furthermore,
            efforts to streamline CORBA&apos;s learning curve and introduce new
            development frameworks can facilitate the creation of CORBA-based
            applications.
          </p>
          <h4>Conclusion</h4>
          <p className="py-4 text-gray-600 dark:text-gray-300 text-justify">
            In summary, this thesis underscores CORBA&apos;s potential as a
            middleware solution for IoT edge computing. Its support for
            heterogeneity, security features, and ability to handle asynchronous
            communication, particularly evident in the successful
            publisher/subscriber middleware implementation, positions it as a
            strong candidate. While resource consumption remains a concern,
            emerging technologies and optimization strategies promise to address
            this limitation. The future holds promise for further exploring
            CORBA&apos;s applicability in diverse edge computing middleware
            scenarios, ultimately enhancing the security and efficiency of IoT
            ecosystems.
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
          <Link href="/#projects">
            <button className="px-8 py-2 mt-4">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default corba;
