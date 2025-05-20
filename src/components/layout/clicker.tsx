"use client";

import { useEffect, useRef, useState } from "react";

export default function ClickerGame() {
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const localClickCount = useRef(0);

  // Fetch total clicks on mount
  useEffect(() => {
    fetch(
      "https://m6rdbdiv01.execute-api.us-east-1.amazonaws.com/prod/clicker/fetch"
    )
      .then((res) => res.json())
      .then((data) => {
        const parsed = JSON.parse(data.body);
        if (typeof parsed.count === "number") {
          setClicks(parsed.count);
        } else {
          console.warn("Unexpected data format:", parsed);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Handle all clicks on window
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

  useEffect(() => {
    const flushClicks = () => {
      if (localClickCount.current > 0) {
        fetch(
          "https://m6rdbdiv01.execute-api.us-east-1.amazonaws.com/prod/clicker/update",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ increment: localClickCount.current }),
            keepalive: true,
          }
        );
      }
    };

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === 'hidden') flushClicks();
    });

    return () => {
      document.removeEventListener("visibilitychange", flushClicks);
    };
  }, []);

  if (loading) return null;

  return (
    <div className="text-center mt-10 select-none">
      <p className="mt-8 text-lg">
        Total Clicks from All Visitors: {clicks}
      </p>
    </div>
  );
}
