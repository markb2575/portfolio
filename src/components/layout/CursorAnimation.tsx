"use client";

import {
    createRef,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

export default function CursorAnimation() {
    const dots = useRef<RefObject<unknown>[][]>([]);
    const dotDistance = 40;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const lastMouseMoveTime = useRef<number>(Date.now());
    const animationFrameId = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleResize = () => {
        const x_dots = Math.floor(window.innerWidth) / dotDistance;
        const y_dots = Math.floor(window.innerHeight) / dotDistance;
        dots.current = Array.from({ length: x_dots }, () =>
            Array.from({ length: y_dots }, () => createRef())
        );
    };

    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        lastMouseMoveTime.current = Date.now();
    };

    const animateMousePosition = useCallback(() => {
        const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;
        if (timeSinceLastMove > 1000) {
            setMousePosition((prevPosition) => ({
                x: (prevPosition.x + 5) % window.innerWidth,
                y: (prevPosition.y + 5) % window.innerHeight,
            }));
        }
        animationFrameId.current = requestAnimationFrame(animateMousePosition);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        handleResize();

        animationFrameId.current = requestAnimationFrame(animateMousePosition);

        // Start fade in after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            clearTimeout(timer);
        };
    }, [animateMousePosition]);

    const isNear = (dotX: number, dotY: number) => {
        const distance = Math.sqrt(
            Math.pow(dotX - mousePosition.x, 2) +
                Math.pow(dotY - mousePosition.y, 2)
        );
        return distance < 125;
    };

    return (
        <div className={`fixed inset-0 pointer-events-none flex flex-row justify-evenly transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {dots.current.map((row: RefObject<unknown>[], rowIndex: number) => (
                <div key={rowIndex} className="flex flex-col justify-evenly animate-pulse duration-1000" style={{animationDelay: `${rowIndex * 0.05}s`}}>
                    {row.map((dot: RefObject<unknown>, colIndex: number) => {
                        const dotY = colIndex * dotDistance;
                        const dotX = rowIndex * dotDistance;
                        const near = isNear(dotX, dotY);

                        return (
                            <div
                                key={colIndex}
                                className="flex p-2 flex-grow-0 relative"
                            >
                                <div
                                    className={`dark:bg-neutral-500 bg-neutral-800 rounded-full transition-all duration-200 absolute inset-0 m-auto ${near ? "size-1.5" : "size-0.5"}`}
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
