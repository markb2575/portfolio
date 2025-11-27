"use client";

import { useRef, createRef } from "react";
import useIsVisible from "@/hooks/useIsVisible";
import { cn } from "@/lib/utils";

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


  return (
    <div
      className={cn(
        "px-10 w-full lg:w-2/3 justify-self-center transition-all duration-200 -z-10",
      )}
    >
      <Skills skillsRef={skillsRef} />
      <Experience experienceRef={experienceRef} />
      <Education educationRef={educationRef} />
      <Certifications certificationsRef={certificationsRef} />
      <Projects projectRefs={projectRefs.current} />
      <Stats statsRef={statsRef} />
    </div>
  );
}
