import React from "react";
import Aurora from "./Aurora.jsx";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
function App() {
  const [path, setPath] = useState("M 10 100 Q 500 100 990 100");
  const finalPath = "M 10 100 Q 500 100 990 100";
  const stringRef = useRef(null);

  useEffect(() => {
    const stringElement = stringRef.current;

    if (!stringElement) return;

    const updatePath = (e) => {
      const svgRect = stringElement.getBoundingClientRect();
      const relativeX = e.clientX - svgRect.left;
      const relativeY = e.clientY - svgRect.top;

      const newPath = `M 10 100 Q ${relativeX} ${relativeY} 990 100`;
      setPath(newPath);

      gsap.to("svg path", {
        attr: { d: newPath },
        duration: 0.3,
      });
    };

    const resetPath = () => {
      gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1,0.2)",
      });
    };

    stringElement.addEventListener("mousemove", updatePath);
    stringElement.addEventListener("mouseleave", resetPath);

    return () => {
      stringElement.removeEventListener("mousemove", updatePath);
      stringElement.removeEventListener("mouseleave", resetPath);
    };
  }, []);
  return (
    <main className="h-[100vh] bg-black">
      <div className="absolute b pointer-events-auto w-[100vw] h-[400px]">
        <Aurora
          colorStops={["#71706C", "#1F1F1F", "#858584"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <section
        className="relative z-10 h-[100vh] w-[100vw] p-0 m-0 overflow-hidden flex justify-center
      items-center flex-col font-rethinkSans"
      >
        <div
          ref={stringRef}
          className="h-[200px] flex justify-center items-center w-[100vw] flex-col"
        >
          <svg
            className="w-[80vw] h-auto"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={path} stroke="white" stroke-width="1" fill="transparent" />
          </svg>
        </div>
        <div className="flex flex-col gap-8 ">
        <div className="flex flex-col md:flex-row w-[80vw] gap-16 ">
          <div className="md:w-1/2 flex md:justify-end ">
            <h1 className="text-white">Smart Development</h1>
          </div>
          <div className="md:w-1/2">
            <p className="text-white text-[24px] leading-[120%]">
            Combining unique design and rich technology, we build digital products exactly as they were designed, without shortcuts or simplifications.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  w-[80vw] gap-16">
          <div className="md:w-1/2 flex md:justify-end">
            <h1 className="text-white">Areas</h1>
          </div>
          <div className="md:w-1/2  text-white flex flex-wrap text-[18px] gap-2 pb-[40px] md:pb-0">
          <div className="border-[1px] p-[4px] px-[12px] rounded-3xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">E-COMMERCE</div>
          <div  className="border-[1px] p-[4px] px-[12px] rounded-3xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">FINANCE</div>
          <div  className="border-[1px] p-[4px] px-[12px] rounded-3xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">EDUCATION</div>
          <div  className="border-[1px] p-[4px] px-[12px] rounded-3xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">SOCIAL</div>
          <div  className="border-[1px] p-[4px] px-[12px] rounded-3xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">ENTERTAINMENT</div>
          <div  className="border-[1px] p-[4px] px-[12px] rounded-3xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">MEDICINE</div>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}

export default App;
