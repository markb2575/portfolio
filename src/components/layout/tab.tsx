import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import useIsTop from "@/app/hooks/useIsTop";
export default function Tab() {
    const { setTheme, theme } = useTheme()
    const handleTabChange = (value: number) => {
        const sectionIds = [
            'skills-section',
            'experience-section',
            'education-section',
            'certifications-section',
            'projects-section',
            'stats-section'
        ];

        const section = document.getElementById(sectionIds[value]);

        if (section) {
            window.scrollTo({behavior: 'smooth', top: section.offsetTop + 50 })
        }
    };

    const isTop = useIsTop()

    return (
        <div className={cn("hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-20 items-center gap-2 transition-opacity hover:opacity-100 hover:backdrop-blur-sm duration-200", isTop ? "opacity-100":"opacity-0")}>
            <div className="backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
                    <div className="flex gap-3 mx-5">
                        <div onClick={() => handleTabChange(0)} className="hover:text-neutral-500 cursor-pointer p-3">Skills</div>
                        <div onClick={() => handleTabChange(1)} className="hover:text-neutral-500 cursor-pointer p-3">Experience</div>
                        <div onClick={() => handleTabChange(2)} className="hover:text-neutral-500 cursor-pointer p-3">Education</div>
                        <div onClick={() => handleTabChange(3)} className="hover:text-neutral-500 cursor-pointer p-3">Certifications</div> 
                        <div onClick={() => handleTabChange(4)} className="hover:text-neutral-500 cursor-pointer p-3">Projects</div>
                        <div onClick={() => handleTabChange(5)} className="hover:text-neutral-500 cursor-pointer p-3">Stats</div>
                        <div onClick={() => (window.location.href = "/Resume.pdf")} className="hover:text-neutral-500 cursor-pointer p-3">Resume</div>
                    </div>
            </div>
            <div className="backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 cursor-pointer" onClick={() => {if (theme === "light") {setTheme("dark")} else {setTheme("light")}}}>
                {theme === "light" ? (
                    <Sun className="theme-toggle-icon hover:text-neutral-500"/>
                ) : (
                    <Moon className="theme-toggle-icon hover:text-neutral-500"/>
                )}
            </div>
        </div>
    );
}
