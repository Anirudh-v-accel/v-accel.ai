"use client";
import "./Nav.css";

import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";
import UnicornScene from "unicornstudio-react/next";

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/SplitText";
import { useLenis } from "lenis/react";

import MenuBtn from "../MenuBtn/MenuBtn";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(SplitText);

const Nav = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);
  const isInitializedRef = useRef(false);
  const splitTextRefs = useRef([]);
  const router = useRouter();
  const lenis = useLenis();

  // Build a URL-safe path for the JSON file served from public/
  const jsonPath = "/WebGL-JSON/" + encodeURIComponent('"Huly" laser.json');
  const unicornScale = isMobile ? 0.7 : 1;
  const unicornDpi = isMobile ? 1 : 1.5;
  const unicornFps = isMobile ? 30 : 60;

  const { navigateWithTransition } = useViewTransition();

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isOpen]);

  useLayoutEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.651,1 1,1"
    );
  }, []);

  // Track mobile layout to tune Unicorn performance props
  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        const mq = window.matchMedia("(max-width: 768px)");
        setIsMobile(mq.matches);
      }
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useLayoutEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;

      splitTextRefs.current.forEach((split) => {
        if (split.revert) split.revert();
      });
      splitTextRefs.current = [];

      gsap.set(menu, {
        clipPath: "circle(0% at 50% 50%)",
      });

      const h2Elements = menu.querySelectorAll("h2");
      const pElements = menu.querySelectorAll("p");

      h2Elements.forEach((h2, index) => {
        const split = SplitText.create(h2, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      pElements.forEach((p, index) => {
        const split = SplitText.create(p, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.set(split.lines, { y: "120%" });

        split.lines.forEach((line) => {
          line.style.pointerEvents = "auto";
        });

        splitTextRefs.current.push(split);
      });

      isInitializedRef.current = true;
    }
  }, []);

  const animateMenu = useCallback((open) => {
    if (!menuRef.current) {
      return;
    }

    const menu = menuRef.current;

    setIsAnimating(true);

    if (open) {
      document.body.classList.add("menu-open");

      gsap.to(menu, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power3.out",
        duration: 2,
        onStart: () => {
          menu.style.pointerEvents = "all";
        },
        onStart: () => {
          splitTextRefs.current.forEach((split, index) => {
            gsap.to(split.lines, {
              y: "0%",
              stagger: 0.05,
              delay: 0.35 + index * 0.1,
              duration: 1,
              ease: "power4.out",
            });
          });
        },
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    } else {
      const textTimeline = gsap.timeline({
        onStart: () => {
          gsap.to(menu, {
            clipPath: "circle(0% at 50% 50%)",
            ease: "power3.out",
            duration: 1,
            delay: 0.75,
            onComplete: () => {
              menu.style.pointerEvents = "none";

              splitTextRefs.current.forEach((split) => {
                gsap.set(split.lines, { y: "120%" });
              });

              document.body.classList.remove("menu-open");

              setIsAnimating(false);
              setIsNavigating(false);
            },
          });
        },
      });

      splitTextRefs.current.forEach((split, index) => {
        textTimeline.to(
          split.lines,
          {
            y: "-120%",
            stagger: 0.03,
            delay: index * 0.05,
            duration: 1,
            ease: "power3.out",
          },
          0
        );
      });
    }
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      animateMenu(isOpen);
    }
  }, [isOpen, animateMenu]);

  const toggleMenu = useCallback(() => {
    if (!isAnimating && isInitializedRef.current && !isNavigating) {
      setIsOpen((prevIsOpen) => {
        return !prevIsOpen;
      });
    } else {
    }
  }, [isAnimating, isNavigating]);

  const handleLinkClick = useCallback(
    (e, href) => {
      e.preventDefault();

      const currentPath = window.location.pathname;
      if (currentPath === href) {
        if (isOpen) {
          setIsOpen(false);
        }
        return;
      }

      if (isNavigating) return;

      setIsNavigating(true);
      navigateWithTransition(href);
    },
    [isNavigating, router, isOpen, setIsOpen]
  );

  const splitTextIntoSpans = (text) => {
    return text
      .split("")
      .map((char, index) =>
        char === " " ? (
          <span key={index}>&nbsp;&nbsp;</span>
        ) : (
          <span key={index}>{char}</span>
        )
      );
  };

  return (
    <div>
      <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      <div
        className="menu"
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        ref={menuRef}
      >
        <div className="menu-bg">
          {isOpen && (
            <UnicornScene
              jsonFilePath={jsonPath}
              width="100%"
              height="100%"
              scale={unicornScale}
              dpi={unicornDpi}
              fps={unicornFps}
              lazyLoad={true}
              production={true}
              ariaLabel="Menu background animation"
              className="menu-unicorn-scene"
            />
          )}
        </div>
        <div className="menu-wrapper">
          <div className="col col-1">
            <div className="links">
              <div className="link">
                <a href="/" onClick={(e) => handleLinkClick(e, "/")}>
                  <h2>Home</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, "/about")}
                >
                  <h2>About</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/solutions"
                  onClick={(e) => handleLinkClick(e, "/solutions")}
                >
                  <h2>Solutions</h2>
                </a>
              </div>
              {/* <div className="link">
                <a
                  href="/sample-space"
                  onClick={(e) => handleLinkClick(e, "/sample-space")}
                >
                  <h2>Case Study</h2>
                </a>
              </div>
              <div className="link">
                <a
                  href="/blueprints"
                  onClick={(e) => handleLinkClick(e, "/blueprints")}
                >
                  <h2>Resources</h2>
                </a>
              </div> */}
              <div className="link">
                <a
                  href="/connect"
                  onClick={(e) => handleLinkClick(e, "/connect")}
                >
                  <h2>Contact</h2>
                </a>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="socials">
              <div className="sub-col">
                <div className="menu-meta menu-commissions">
                  <p>Inquiries</p>
                  <p>contact@v-accel.ai</p>
                  <p>sales@v-accel.ai</p>
                </div>
                <div className="menu-meta">
                  <p>Where We Craft</p>
                  <p>SM Towers, Perungudi, Chennai</p>
                  <p>Tamil Nadu, India</p>
                </div>
              </div>
              <div className="sub-col">
                <div className="menu-meta">
                  <p>Social</p>
                  <p>LinkedIn</p>
                  <p>GitHub</p>
                  <p>YouTube</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
