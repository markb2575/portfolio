"use client";

import { useEffect, useRef } from "react";

const MIN_THUMB = 40;

// Overlay scrollbar that floats over the background instead of reserving a
// solid strip like the native one (which is hidden in globals.css).
export default function Scrollbar() {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const thumb = thumbRef.current;
        if (!track || !thumb) return;

        let frame = 0;
        let thumbHeight = 0;
        let drag: { startY: number; startScroll: number } | null = null;

        const metrics = () => {
            const view = window.innerHeight;
            const content = document.documentElement.scrollHeight;
            // the track is inset from the screen edges, so the thumb travels within it
            return { view, content, maxScroll: Math.max(0, content - view), trackHeight: track.clientHeight };
        };

        const update = () => {
            frame = 0;
            const { view, maxScroll, content, trackHeight } = metrics();
            track.style.visibility = maxScroll > 0 ? "" : "hidden";
            if (maxScroll <= 0) return;
            thumbHeight = Math.max(MIN_THUMB, (trackHeight * view) / content);
            const top = (window.scrollY / maxScroll) * (trackHeight - thumbHeight);
            thumb.style.height = `${thumbHeight}px`;
            thumb.style.transform = `translateY(${top}px)`;
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        // px of page scroll per px of thumb movement
        const ratio = () => {
            const { maxScroll, trackHeight } = metrics();
            return maxScroll / Math.max(1, trackHeight - thumbHeight);
        };

        const onThumbDown = (e: PointerEvent) => {
            e.preventDefault();
            e.stopPropagation();
            thumb.setPointerCapture(e.pointerId);
            drag = { startY: e.clientY, startScroll: window.scrollY };
            track.dataset.dragging = "";
        };

        const onThumbMove = (e: PointerEvent) => {
            if (!drag) return;
            window.scrollTo({ top: drag.startScroll + (e.clientY - drag.startY) * ratio() });
        };

        const onThumbUp = (e: PointerEvent) => {
            if (!drag) return;
            thumb.releasePointerCapture(e.pointerId);
            drag = null;
            delete track.dataset.dragging;
        };

        // Clicking the track centres the thumb on the click point
        const onTrackDown = (e: PointerEvent) => {
            if (e.target !== track) return;
            const y = e.clientY - track.getBoundingClientRect().top;
            window.scrollTo({ top: (y - thumbHeight / 2) * ratio(), behavior: "smooth" });
        };

        update();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        // content height changes as sections load or fade in
        const observer = new ResizeObserver(schedule);
        observer.observe(document.body);
        thumb.addEventListener("pointerdown", onThumbDown);
        thumb.addEventListener("pointermove", onThumbMove);
        thumb.addEventListener("pointerup", onThumbUp);
        thumb.addEventListener("pointercancel", onThumbUp);
        track.addEventListener("pointerdown", onTrackDown);

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            observer.disconnect();
            thumb.removeEventListener("pointerdown", onThumbDown);
            thumb.removeEventListener("pointermove", onThumbMove);
            thumb.removeEventListener("pointerup", onThumbUp);
            thumb.removeEventListener("pointercancel", onThumbUp);
            track.removeEventListener("pointerdown", onTrackDown);
        };
    }, []);

    return (
        <div
            ref={trackRef}
            aria-hidden
            className="group fixed top-2 bottom-2 right-0 z-40 hidden w-3 md:block"
        >
            <div
                ref={thumbRef}
                className="absolute right-[3px] w-1.5 rounded-full bg-[var(--scrollbar-thumb)] opacity-70 transition-[opacity,width] duration-200 group-hover:w-2 group-hover:opacity-100 group-data-[dragging]:w-2 group-data-[dragging]:opacity-100 hover:bg-[var(--scrollbar-thumb-hover)]"
            />
        </div>
    );
}
