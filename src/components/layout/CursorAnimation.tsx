"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Position = { x: number; y: number };

export default function CursorAnimation() {
  const dotDistance = 40;
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(Date.now());
  const animationFrameId = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });

  const handleResize = useCallback(() => {
    setGridSize({
      cols: Math.floor(window.innerWidth / dotDistance),
      rows: Math.floor(window.innerHeight / dotDistance),
    });
  }, [dotDistance]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    lastMouseMoveTime.current = Date.now();
  }, []);

  const animateMousePosition = useCallback(() => {
    const timeSinceLastMove = Date.now() - lastMouseMoveTime.current;
    if (timeSinceLastMove > 1000) {
      setMousePosition((prev) => ({
        x: (prev.x + 5) % window.innerWidth,
        y: (prev.y + 5) % window.innerHeight,
      }));
    }
    animationFrameId.current = requestAnimationFrame(animateMousePosition);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animationFrameId.current = requestAnimationFrame(animateMousePosition);

    const timer = setTimeout(() => setIsVisible(true), 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      clearTimeout(timer);
    };
  }, [animateMousePosition, handleMouseMove, handleResize]);

  const isNear = (x: number, y: number) =>
    Math.hypot(x - mousePosition.x, y - mousePosition.y) < 125;

  return (
    <div
      className={`fixed inset-0 pointer-events-none flex flex-row justify-evenly transition-opacity duration-1000  ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {Array.from({ length: gridSize.cols }).map((_, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col justify-evenly animate-pulse"
          style={{ animationDelay: `${colIndex * 0.05}s` }}
        >
          {Array.from({ length: gridSize.rows }).map((_, rowIndex) => {
            const x = colIndex * dotDistance;
            const y = rowIndex * dotDistance;
            const near = isNear(x, y);
            return (
              <div key={rowIndex} className="p-2 relative">
                <div
                  className={`dark:bg-neutral-500 bg-neutral-800 rounded-full transition-all duration-200 absolute inset-0 m-auto ${
                    near ? "size-1.5" : "size-0.5"
                  }`}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
