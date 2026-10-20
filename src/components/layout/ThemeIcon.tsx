"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// The theme is only known in the browser, so render a same-size placeholder
// until mounted to keep the server and client HTML identical.
export default function ThemeIcon({ theme }: { theme: string | undefined }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <span className="theme-toggle-icon block" />;

    return theme === "light" ? (
        <Sun className="theme-toggle-icon hover:text-umber-500 dark:hover:text-neutral-500" />
    ) : (
        <Moon className="theme-toggle-icon hover:text-umber-500 dark:hover:text-neutral-500" />
    );
}
