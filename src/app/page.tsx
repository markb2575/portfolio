"use client"
import { Body, TopArrow, Hero, CursorAnimation, LoadAnimation } from "@/components/layout";
export default function Home() {
    return (
        <div>
            <LoadAnimation />
            <CursorAnimation />
            <TopArrow />
            <div className="relative z-10">
                <Hero />
                <Body />
            </div>
        </div>
    );
}