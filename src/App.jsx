import React from "react"
import Aurora from './Aurora.jsx';
import GradientText from './Gradient.jsx'
import { useEffect,useState,useRef } from "react";
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
    <div className="absolute b pointer-events-auto w-[100vw] h-[320px]">

      <Aurora
     colorStops={["#71706C", "#1F1F1F", "#858584"]}
     blend={0.5}
     amplitude={1.0}
     speed={0.5}
   /> 
    </div>
      <section className='relative z-10 h-[100vh] w-[100vw] p-0 m-0 overflow-hidden flex justify-center
      items-center flex-col'>  
<h1 className="text-white text-[32px] lg:text-[56px] font-rethinkSans flex gap-3"><span className=" font-[700] italic">GSAP</span>
<GradientText
  colors={["#71706C", "#FFFFFF", "#858584", "#FFFFFF", "#858584"]}
  animationSpeed={3}
  showBorder={false}
  className="font-[200]"
>
  SVG animation
</GradientText>
</h1>
     <div ref={stringRef} className="h-[200px] flex justify-center items-center w-[100vw]">
      <svg className="w-[80vw] h-auto"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          stroke="white"
          stroke-width="1"
          fill="transparent"
        />
      </svg>
    </div>
      </section>
    </main>
  )
}

export default App
