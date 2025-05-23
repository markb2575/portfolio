
import { RefObject, useEffect } from "react";

function useIsVisible(refs: Array<RefObject<HTMLElement | null>>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the 'opacity-100' class and remove 'opacity-0' when in view
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0");
          } else {
            // Remove 'opacity-100' and add 'opacity-0' when out of view
            entry.target.classList.add("opacity-0");
            entry.target.classList.remove("opacity-100");
          }
        });
      },
      {
        threshold: 0, // Trigger when 10% of the element is in view
      }
    );

    // Observe each ref in the array
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup the observer on unmount
    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs]);
}

export default useIsVisible;
