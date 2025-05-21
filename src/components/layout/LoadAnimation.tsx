"use client";

import { useState, useEffect } from "react";

export default function LoadAnimation() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Start fade out after component mounts
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 100); // Small delay to ensure initial black state

        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className={`fixed inset-0 z-50 dark:bg-neutral-950 bg-neutral-200 transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        />
    );
}
