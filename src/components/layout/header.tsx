"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ArrowDown, Menu, X } from "lucide-react";
import { Tab } from "@/components/layout";
import MobileMenu from "./mobile-menu";
import useIsTop from "@/hooks/useIsTop";
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

const MenuToggleButton = ({
    opened,
    toggle,
}: {
    opened: boolean;
    toggle: () => void;
}) => (
    <div
        onClick={toggle}
        className="cursor-pointer z-50 fixed top-6 right-2 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3"
    >
        {opened ? (
            <X className="hover:text-neutral-500 transition-colors" />
        ) : (
            <Menu className="hover:text-neutral-500 transition-colors" />
        )}
    </div>
);

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const isTop = useIsTop();

    const handleTabChange = (value: number) => {
        const section = document.getElementById(SECTION_IDS[value]);
        if (section) {
            window.scrollTo({
                behavior: "smooth",
                top: section.offsetTop + 50,
            });
        }
    };

    return (
        <div>
            {/* Desktop Tabs */}
            <div className="hidden px-10 lg:flex flex-col w-full lg:w-2/3 justify-self-center">
                <Tab />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden px-10 flex flex-col justify-self-center">
                <MenuToggleButton
                    opened={menuOpened}
                    toggle={() => setMenuOpened((prev) => !prev)}
                />
                {menuOpened && <MobileMenu setMenuOpened={setMenuOpened} />}
            </div>

            {/* Centered Header Text */}
            <div
                className={cn(
                    "px-10 w-full lg:w-2/3 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-200",
                    isTop ? "opacity-100 z-20" : "opacity-0 -z-20"
                )}
            >
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

                {/* Social Icons */}
                <div className="flex gap-6 justify-center relative z-20 mb-20">
                    <FaGithub
                        className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md cursor-pointer hover:opacity-50"
                        onClick={() =>
                            window.open(
                                "https://github.com/markb2575",
                                "_blank"
                            )
                        }
                    />
                    <FaLinkedin
                        className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md cursor-pointer hover:opacity-50"
                        onClick={() =>
                            window.open(
                                "https://linkedin.com/in/markb2575",
                                "_blank"
                            )
                        }
                    />
                    <FaEnvelope
                        className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md cursor-pointer hover:opacity-50"
                        onClick={() =>
                            window.open(
                                "mailto:markbassily2575@gmail.com",
                                "_blank"
                            )
                        }
                    />
                </div>
            </div>

            {/* Scroll Down Arrows */}
            <div
                className={cn(
                    "fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer",
                    isTop ? "opacity-100 z-20" : "opacity-0 -z-20"
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
