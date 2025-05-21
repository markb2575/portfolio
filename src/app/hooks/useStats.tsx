import { useEffect, useRef, useState } from "react";

export function useStats() {
    const [clicks, setClicks] = useState(0);
    const [visits, setVisits] = useState(0);
    const localClickCount = useRef(0);

    // Fetch stats on mount
    useEffect(() => {
        fetch("https://m6rdbdiv01.execute-api.us-east-1.amazonaws.com/prod/clicker/fetch")
            .then((res) => res.json())
            .then((data) => {
                const parsed = JSON.parse(data.body);
                setClicks(Number(parsed.click_count));
                setVisits(Number(parsed.visits));
            });
    }, []);

    // Count local clicks
    useEffect(() => {
        const handleClick = () => {
            localClickCount.current += 1;
            setClicks((prev) => prev + 1);
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    // Send local click counts on page hide
    useEffect(() => {
        const flushClicks = () => {
            if (localClickCount.current > 0) {
                fetch("https://m6rdbdiv01.execute-api.us-east-1.amazonaws.com/prod/clicker/update",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            increment: localClickCount.current,
                        }),
                        keepalive: true,
                    }
                );
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") flushClicks();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    return { clicks, visits };
}
