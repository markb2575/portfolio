"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "skills-section",
  "experience-section",
  "education-section",
  "certifications-section",
  "projects-section",
  "stats-section",
];

const AnimatedText = ({
  text,
  delay = 0.1,
  className = "",
  animationClass = "animate-oscillate",
}: {
  text: string;
  delay?: number;
  className?: string;
  animationClass?: string;
}) => (
  <div className={cn("flex justify-center", className)}>
    {text.split("").map((char, index) => (
      <div
        key={index}
        style={{ animationDelay: `${index * delay}s` }}
        className={animationClass}
      >
        {char === " " ? <div className="m-2" /> : char}
      </div>
    ))}
  </div>
);

export default function Hero() {

  const handleTabChange = (value: number) => {
    const section = document.getElementById(SECTION_IDS[value]);
    if (section) {
      window.scrollTo({
        behavior: "smooth",
        top: section.offsetTop - 50,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between items-center px-10">
      {/* Centered Text */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <AnimatedText
          text="Software Engineer"
          delay={0.1}
          className="mb-10 text-neutral-600 dark:text-neutral-300 font-normal text-4xl"
          animationClass="animate-pulse"
        />

        <AnimatedText
          text="Mark Bassily"
          delay={0.2}
          className="mb-16 gap-1 font-light text-5xl text-neutral-600 dark:text-neutral-300"
        />

        <div className="flex gap-6 justify-center mb-10">
          <FaGithub
            className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md cursor-pointer hover:opacity-50"
            onClick={() =>
              window.open("https://github.com/markb2575", "_blank")
            }
          />
          <FaLinkedin
            className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md cursor-pointer hover:opacity-50"
            onClick={() =>
              window.open("https://linkedin.com/in/markb2575", "_blank")
            }
          />
          <FaEnvelope
            className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md cursor-pointer hover:opacity-50"
            onClick={() =>
              window.open("mailto:markbassily2575@gmail.com", "_blank")
            }
          />
        </div>
      </div>

      {/* Bottom Arrows */}
      <div
        id="hero-arrows"
        className={cn(
          "relative bottom-28 cursor-pointer transition-transform duration-500",
        )}
        onClick={() => handleTabChange(0)}
      >
        <div className="flex gap-5 dark:text-neutral-300 text-neutral-700 hover:opacity-50">
          <ArrowDown className="animate-bounce" />
          <ArrowDown className="animate-bounce delay-150" />
          <ArrowDown className="animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}
