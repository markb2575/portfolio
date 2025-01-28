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
            // 1 seconds
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

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [animateMousePosition]);

    const isNear = (dotX: number, dotY: number) => {
        const distance = Math.sqrt(
            Math.pow(dotX - mousePosition.x, 2) +
                Math.pow(dotY - mousePosition.y, 2)
        );
        return distance < 125; // Adjust this value to change the sensitivity
    };

    return (
        <div className="fixed inset-0 pointer-events-none flex flex-row justify-evenly">
            {dots.current.map((row: RefObject<unknown>[], rowIndex: number) => (
                <div key={rowIndex} className="flex flex-col justify-evenly">
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
                                    className={`bg-gray-500 rounded-full transition-all duration-200 absolute inset-0 m-auto ${
                                        near ? "size-1" : "size-0"
                                    } `}
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
