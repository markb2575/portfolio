"use client"
import { Header, Body } from "@/components/layout";
import { useState, useEffect } from "react";
import useDarkTheme from "../app/hooks/useDarkTheme";


export default function Home() {
    const { darkTheme, isLoading, handleMode } = useDarkTheme();

    if (isLoading) return null;

    return (
        <div className="background">
            <Header darkTheme={darkTheme} handleMode={handleMode}/>
            <Body />
        </div>
    );
}