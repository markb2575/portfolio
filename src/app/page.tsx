"use client"
import { Header, Body, Tab } from "@/components/layout";
import useDarkTheme from "../app/hooks/useDarkTheme";


export default function Home() {
    const { darkTheme, isLoading, handleMode } = useDarkTheme();

    if (isLoading) return null;

    return (
        <div className="background">
            <Tab />
            <Header darkTheme={darkTheme} handleMode={handleMode}/>
            <Body />
        </div>
    );
}