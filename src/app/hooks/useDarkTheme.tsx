
import { useEffect, useState } from "react";

function useDarkTheme() {
    const [darkTheme, setDarkTheme] = useState(true);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('darkTheme') === 'true';
            setDarkTheme(savedTheme);  // Load saved theme from local storage
            setLoading(false);  // Set loading to false after loading theme
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('darkTheme', JSON.stringify(darkTheme));

            // Update the document classes based on the darkTheme state
            if (darkTheme) {
                document.documentElement.classList.add('dark');
                document.body.classList.add('bg-slate-900');
                document.body.classList.remove('bg-white');
            } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.add('bg-white');
                document.body.classList.remove('bg-slate-900');
            }
        }
    }, [darkTheme]);

    const handleMode = () => setDarkTheme((prev) => !prev);

    return { darkTheme, isLoading, handleMode };
}

export default useDarkTheme;