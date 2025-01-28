"use client"
import { Header, Body, TopArrow } from "@/components/layout";
import useDarkTheme from "../app/hooks/useDarkTheme";
import CursorAnimation from "../components/layout/CursorAnimation";

export default function Home() {
    const { darkTheme, isLoading, handleMode } = useDarkTheme();
    if (isLoading) return null;
    return (
        <div className="font-montserrat background">
            <CursorAnimation />
            <TopArrow />
            <div className="relative z-10">
                <Header darkTheme={darkTheme} handleMode={handleMode}  />
                <Body />
            </div>
        </div>
    );
}