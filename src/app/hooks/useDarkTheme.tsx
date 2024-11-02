import { useEffect, useState } from "react";

function useDarkTheme() {
    const [darkTheme, setDarkTheme] = useState(false);
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
            if (darkTheme) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [darkTheme]);

    const handleMode = () => setDarkTheme((prev) => !prev);

    return { darkTheme, isLoading, handleMode };
}

export default useDarkTheme;
