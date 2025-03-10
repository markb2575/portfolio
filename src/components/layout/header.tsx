"use client";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
} from "react-icons/fa";
import { Tab } from "@/components/layout";
import { useState } from "react";
import { ArrowDown, Menu, X } from "lucide-react";
import MobileMenu from "./mobile-menu";
import useIsTop from "@/app/hooks/useIsTop";
import { cn } from "@/lib/utils";

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false)
    const isTop = useIsTop()
    return (
        <div>
            <div className="hidden px-10 md:flex flex-col w-full md:w-2/3 justify-self-center">
                <Tab />
            </div>
            <div className="md:hidden px-10 flex flex-col justify-self-center">
                {menuOpened ? (
                    <div onClick={() => setMenuOpened(false)} className="cursor-pointer z-40 fixed top-6 right-0 -translate-x-1/2 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3 ">
                        <X className=" hover:text-neutral-500 transition-colors" />
                    </div>
                ) : (
                    <div  onClick={() => setMenuOpened(true)} className="cursor-pointer z-40 fixed top-6 right-0 -translate-x-1/2 backdrop-blur-sm bg-opacity-60 dark:bg-opacity-60 border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 rounded-lg p-3">
                        <Menu className="hover:text-neutral-500 transition-colors" />
                    </div>
                )}



                {menuOpened && <MobileMenu setMenuOpened={setMenuOpened} />}
            </div>
            <div className={cn("px-10 w-full lg:w-2/3 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-200", isTop ? "opacity-100 z-30" : "opacity-0 -z-30")}>
                <div className="flex justify-center mb-20 text-neutral-600 dark:text-neutral-300 font-normal text-4xl">
                    {"hi, my name is".split("").map((char, index) => (
                        <div
                            key={index}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            className=" animate-pulse"
                        >
                            {char === " " ? <div className="m-2" /> : char}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mb-28 gap-1 font-light text-5xl text-neutral-600 dark:text-neutral-300">
                    {"Mark Bassily".split("").map((char, index) => (
                        <div
                            key={index}
                            style={{ animationDelay: `${index * 0.2}s` }}
                            className="  animate-oscillate"
                        >
                            {char === " " ? <div className="m-2" /> : char}
                        </div>
                    ))}
                </div>
                <div className="flex gap-6 justify-center relative z-50">
                    <FaGithub
                        className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md hover:text-neutral-500 cursor-pointer animate-pulse hover:animate-none hover:opacity-80"
                        style={{ animationDelay: "0s" }}
                        onClick={() => (window.location.href = "https://github.com/markb2575")}
                    />
                    <FaLinkedin
                        className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md hover:text-neutral-500 cursor-pointer animate-pulse hover:animate-none hover:opacity-80"
                        style={{ animationDelay: "0.2s" }}
                        onClick={() => (window.location.href = "https://linkedin.com/in/markb2575")}
                    />
                    <FaEnvelope
                        className="dark:text-neutral-300 text-neutral-600 size-7 drop-shadow-md hover:text-neutral-500 cursor-pointer animate-pulse hover:animate-none hover:opacity-80"
                        style={{ animationDelay: "0.4s" }}
                        onClick={() => (window.location.href = "mailto:markbassily2575@gmail.com")}
                    />
                </div>
            </div>
            <div className={cn("fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", isTop ? "opacity-100" : "opacity-0")}>
                <div className="flex gap-5 dark:text-neutral-300 text-neutral-700">
                    <ArrowDown className="animate-bounce" />
                    <ArrowDown className="animate-bounce delay-150" />
                    <ArrowDown className="animate-bounce delay-300" />
                </div>
            </div>


        </div>
    );
}
