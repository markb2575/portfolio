"use client"
import { Body, TopArrow, Hero, CursorAnimation, LoadAnimation, Scrollbar } from "@/components/layout";
export default function Home() {
    return (
        <div>
            <LoadAnimation />
            <CursorAnimation />
            <TopArrow />
            <Scrollbar />
            <div className="relative z-10">
                <Hero />
                <Body />
            </div>
        </div>
    );
}