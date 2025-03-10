"use client";
import { useTheme } from "next-themes"
import { Dispatch, SetStateAction, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface MobileMenuProps {
    setMenuOpened: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({ setMenuOpened }: MobileMenuProps) {
    const { setTheme, theme } = useTheme()
    useEffect(() => {
        // Disable scrolling when the menu is open
        document.body.style.overflow = "hidden";

        return () => {
            // Re-enable scrolling when the menu is unmounted
            document.body.style.overflow = "";
        };
    }, []);
    const handleTabChange = (value: number) => {
        const sectionIds = [
            'skills-section',
            'experience-section',
            'education-section',
            'certifications-section',
            'projects-section',
        ];

        const section = document.getElementById(sectionIds[value]);

        if (section) {
            window.scrollTo({behavior: 'smooth', top: section.offsetTop + 120 })
        }
    };
    return (
        <>
            <div className="z-40 backdrop-blur-md w-screen h-screen fixed left-0 top-0 m-0 p-0 flex flex-col items-center justify-center" onClick={() => setMenuOpened(false)}>
                <div className=" flex flex-col gap-3 w-1/2 mb-3 ">
                    <div onClick={() => handleTabChange(0)} className="hover:text-neutral-500 cursor-pointer backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 text-base text-center border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">Skills</div>
                    <div onClick={() => handleTabChange(1)} className="hover:text-neutral-500 cursor-pointer backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 text-base text-center border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">Experience</div>
                    <div onClick={() => handleTabChange(2)} className="hover:text-neutral-500 cursor-pointer backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 text-base text-center border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">Education</div>
                    <div onClick={() => handleTabChange(3)} className="hover:text-neutral-500 cursor-pointer backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 text-base text-center border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">Certifications</div>
                    <div onClick={() => handleTabChange(4)} className="hover:text-neutral-500 cursor-pointer backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 text-base text-center border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">Projects</div>
                    <div onClick={() => (window.location.href = "/Resume.pdf")} className="hover:text-neutral-500 cursor-pointer backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 text-base text-center border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">Resume</div>

                </div>
                <div className="backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 cursor-pointer" onClick={() => {if (theme === "light") {setTheme("dark")} else {setTheme("light")}}}>
                    {theme === "light" ? (
                        <Sun className="theme-toggle-icon hover:text-neutral-500" />
                    ) : (
                        <Moon className="theme-toggle-icon hover:text-neutral-500" />
                    )}
                </div>
            </div>
        </>
    );
}
