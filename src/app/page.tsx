"use client"
import { Header, Body, TopArrow } from "@/components/layout";
import CursorAnimation from "../components/layout/CursorAnimation";

export default function Home() {

    return (
        <div className="font-montserrat background no-scrollbar cursor-default">
            <CursorAnimation />
            <TopArrow />
            
            <div className="relative z-10">
                <Header />
                <Body />
            </div>
        </div>
    );
}