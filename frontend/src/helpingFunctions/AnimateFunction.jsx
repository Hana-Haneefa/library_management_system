import { useEffect, useRef } from "react";

export function Animation(delay = 0) {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return; // null guard

    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";

    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay); // use delay param instead of hardcoded 1500
    });
  }, []);

  return contentRef; // must return the ref
}
