"use client"
import * as Switch from "@radix-ui/react-switch";
import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Header({darkTheme, handleMode}:{darkTheme:boolean, handleMode:()=>void}) {

    return (
        <div>
            <div className="header">
                <div className="border-t flex-grow border-zinc-500 m-10"></div>
                <h1 className="title">Mark Bassily</h1>
                <div className="border-t flex-grow border-zinc-500 m-10"></div>
            </div>
            <div className="flex flex-row justify-between mb-5">
                <div className="flex flex-row">
                    <FaGithub className="ml-10 mr-5 dark:text-zinc-300 text-zinc-600 size-10 drop-shadow-md"/>
                    <FaLinkedin className="dark:text-zinc-300 text-zinc-600 size-10 drop-shadow-md"/>
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
    );
}
