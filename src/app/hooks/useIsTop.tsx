import { useEffect, useState } from "react";

export default function useIsTop() {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsTop(window.scrollY < 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isTop;
}
