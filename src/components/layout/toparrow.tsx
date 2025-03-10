import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";


export default function TopArrow() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null

    return (
        <FaArrowUp
            onClick={scrollToTop}
            className="fixed right-5 bottom-5 dark:text-white text-neutral-900 cursor-pointer hover:opacity-50 z-30"
            size={24}
        />
    );
}
