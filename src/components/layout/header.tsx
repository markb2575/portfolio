"use client"
import * as Switch from "@radix-ui/react-switch";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Tab } from "@/components/layout";
import useIsVisible from "@/app/hooks/useIsVisible";
import { createRef } from "react";

export default function Header({ darkTheme, handleMode }: { darkTheme: boolean, handleMode: () => void }) {
    const ref = createRef<HTMLDivElement>();
    useIsVisible([ref]);

    return (
        <div id="header-section" className='fade-in' ref={ref}>
            <div className="header">
                <div className="border-t flex-grow border-slate-500 mx-10"></div>
                <h1 className="title mb-5">Mark Bassily</h1>
                <div className="border-t flex-grow border-slate-500 mx-10"></div>
            </div>
            <div className="relative mb-5">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <FaGithub className="ml-10 mr-5 dark:text-slate-300 text-slate-600 size-10 drop-shadow-md hover:text-slate-500 hover:dark:text-slate-500 cursor-pointer" onClick={() => window.location.href = "https://github.com/markb2575"} />
                        <FaLinkedin className="dark:text-slate-300 text-slate-600 size-10 drop-shadow-md hover:text-slate-500 hover:dark:text-slate-500 cursor-pointer" onClick={() => window.location.href = "https://linkedin.com/in/markb2575"} />
                    </div>
                    <div className="theme-toggle mr-10">
                        <Switch.Root checked={darkTheme} onCheckedChange={handleMode} className="shadow-md relative flex items-center justify-center p-1 gradient-bg rounded-full transition-colors">
                            <Switch.Thumb className="dark:translate-x-0 translate-x-2.5 transform transition-transform duration-300 ease-in-out">
                                {!darkTheme ? (
                                    <FaSun className="theme-toggle-icon" />
                                ) : (
                                    <FaMoon className="theme-toggle-icon" />
                                )}
                            </Switch.Thumb>
                        </Switch.Root>
                    </div>
                </div>
            </div>
            <div className="mb-5 flex justify-center">
                <Tab />
            </div>
        </div>
    );
}
