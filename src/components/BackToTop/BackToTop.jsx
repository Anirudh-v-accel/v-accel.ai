"use client";
import "./BackToTop.css";

import { useEffect, useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop({ targetSelector = ".hero", threshold = 600 }) {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  const onScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    setVisible(y > threshold);
  }, [threshold]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToHero = useCallback(() => {
    if (!lenis) return;
    const target = document.querySelector(targetSelector);
    if (target) {
      lenis.scrollTo(target, { offset: -10 });
    } else {
      lenis.scrollTo(0);
    }
  }, [lenis, targetSelector]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToHero}
    >
      <FiArrowUp aria-hidden="true" />
    </button>
  );
}
