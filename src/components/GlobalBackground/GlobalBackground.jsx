"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import UnicornScene from "unicornstudio-react/next";

export default function GlobalBackground() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideForHero, setHideForHero] = useState(false);

  // URL‑encode the filename with quotes and spaces
  const jsonPath = useMemo(
    () => "/WebGL-JSON/" + encodeURIComponent('"Huly" laser.json'),
    []
  );

  // Tune props for mobile vs desktop
  const scale = isMobile ? 0.7 : 0.9;
  const dpi = isMobile ? 1 : 1.25;
  const fps = isMobile ? 30 : 60;

  useEffect(() => {
    const updateMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  // On Home route, make the background appear seamlessly below the hero
  // Show the background as soon as the hero's bottom crosses ~85% of viewport height
  useEffect(() => {
    if (pathname !== "/") {
      setHideForHero(false);
      return;
    }
    if (typeof window === "undefined") return;
    const hero = document.querySelector(".hero");
    if (!hero) {
      setHideForHero(false);
      return;
    }

    let ticking = false;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const revealThreshold = viewportH - 1; // show as soon as hero no longer fully covers viewport
      const shouldHideNow = rect.bottom > revealThreshold;
      setHideForHero(shouldHideNow);
      ticking = false;
    };

    update();

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [pathname]);

  // Hydration guard and reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setCanRender(!reduceMotion.matches);
  }, []);

  // Observe body class to detect menu state and avoid double scenes
  useEffect(() => {
    if (typeof document === "undefined") return;
    const update = () => {
      setIsMenuOpen(document.body.classList.contains("menu-open"));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!canRender || isMenuOpen || hideForHero) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <UnicornScene
        jsonFilePath={jsonPath}
        width="100%"
        height="100%"
        scale={scale}
        dpi={dpi}
        fps={fps}
        lazyLoad={true}
        production={true}
        ariaLabel="Background animation"
      />
    </div>
  );
}
