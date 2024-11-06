"use client"
import { Header, Body, TopArrow } from "@/components/layout";
import useDarkTheme from "../app/hooks/useDarkTheme";

export default function Home() {
    const { darkTheme, isLoading, handleMode } = useDarkTheme();
    if (isLoading) return null;
    return (
        <div className="font-montserrat">
            <TopArrow />
            <div className="background">
                <Header darkTheme={darkTheme} handleMode={handleMode}  />
                <Body />
            </div>
        </div>
    );
}