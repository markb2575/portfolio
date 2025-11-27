"use client";

import { useRef, createRef } from "react";
import useIsVisible from "@/hooks/useIsVisible";
import useIsTop from "@/hooks/useIsTop";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import Projects from "./Projects";
import Stats from "./Stats";
import { projects } from "@/lib/data";

export default function Body() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef(projects.map(() => createRef<HTMLDivElement>()));
  const statsRef = useRef<HTMLDivElement>(null);

  useIsVisible([
    statsRef,
    skillsRef,
    experienceRef,
    educationRef,
    certificationsRef,
    ...projectRefs.current,
  ]);

  const isTop = useIsTop();

  return (
    <div
      className={cn(
        "px-10 w-full lg:w-2/3 justify-self-center transition-all duration-200 -z-10",
        // isTop
        //   ? "opacity-0 pointer-events-none scale-90"
        //   : "opacity-100 pointer-events-auto scale-100"
      )}
    >
      {/* <div
        className="flex flex-col items-center gap-2"
      >
        <div className="flex gap-5 dark:text-neutral-300 text-neutral-700 hover:opacity-50 cursor-pointer" onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}>
          <ArrowUp className="animate-bounce" />
          <ArrowUp className="animate-bounce delay-150" />
          <ArrowUp className="animate-bounce delay-300" />
        </div>
      </div> */}

      <Skills skillsRef={skillsRef} />
      <Experience experienceRef={experienceRef} />
      <Education educationRef={educationRef} />
      <Certifications certificationsRef={certificationsRef} />
      <Projects projectRefs={projectRefs.current} />
      <Stats statsRef={statsRef} />
    </div>
  );
}
