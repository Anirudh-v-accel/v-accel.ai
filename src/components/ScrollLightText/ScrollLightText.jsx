"use client";
import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollLightText({
  children,
  start = "top 35%",
  end = "bottom 75%",
  scrub = true,
  mode = "timeline", // 'timeline' (like reference) or 'gradient'
  charSpacing = 0.1, // timeline mode: placement per char (index * charSpacing)
  charDuration = 0.1, // timeline mode: each char's tween duration
  charWindow = 8,
  minOpacity = 0.25,
  maxOpacity = 1,
  pin = false,
  pinSpacing = true,
  scrollPerChar = 10, // px of scroll per character when pinning is enabled
  scrollDistance, // optional override for end distance; number (px) or string like "+=1000"
  anticipatePin = 1,
  pinTarget = null, // optional CSS selector string or HTMLElement to pin instead of the trigger
  triggerTarget = null, // optional CSS selector string or HTMLElement to use as the ScrollTrigger trigger
}) {
  const containerRef = useRef(null);
  const splitRef = useRef(null);
  const styleRef = useRef(null);
  const triggerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Inject minimal styles for SplitType spans
      const style = document.createElement("style");
      style.textContent = `
        .word { display: inline-block; margin-right: 0em; }
        .char { display: inline-block; }
      `;
      document.head.appendChild(style);
      styleRef.current = style;

      // Split into words and characters (same approach as the reference code)
      const split = new SplitType(containerRef.current, {
        types: "words,chars",
        tagName: "span",
        wordClass: "word",
        charClass: "char",
      });
      splitRef.current = split;

      // Initial dim state
      gsap.set(split.chars, { opacity: minOpacity });

      // Resolve trigger target
      let triggerEl = containerRef.current;
      if (triggerTarget) {
        if (typeof triggerTarget === "string") {
          const byClosest = containerRef.current.closest(triggerTarget);
          if (byClosest) {
            triggerEl = byClosest;
          } else {
            const byDesc = containerRef.current.querySelector(triggerTarget);
            if (byDesc) {
              triggerEl = byDesc;
            } else {
              const byDoc = document.querySelector(triggerTarget);
              if (byDoc) triggerEl = byDoc;
            }
          }
        } else if (triggerTarget && triggerTarget.nodeType === 1) {
          triggerEl = triggerTarget;
        }
      }

      if (mode === "gradient") {
        // Smooth, continuous light sweep using onUpdate
        const trig = ScrollTrigger.create({
          trigger: triggerEl,
          start,
          end,
          scrub,
          markers: false,
          onUpdate: (self) => {
            const chars = splitRef.current?.chars || [];
            const total = chars.length;
            if (!total) return;

            // Current position along the characters
            const pos = self.progress * (total - 1);
            const w = Math.max(1, charWindow);
            const min = minOpacity;
            const max = maxOpacity;

            // Update each char's opacity based on distance to the current pos
            for (let i = 0; i < total; i++) {
              const d = Math.abs(i - pos);
              // Triangular falloff mapped through smoothstep for softness
              let t = 1 - Math.min(1, d / w); // 1 at center, 0 outside window
              t = t * t * (3 - 2 * t); // smoothstep
              const opacity = min + (max - min) * t;
              gsap.set(chars[i], { opacity });
            }
          },
        });
        triggerRef.current = trig;
      } else {
        // Reference-like behavior: letter-by-letter via timeline
        // Compute end distance if pinning, so scroll length matches the number of characters
        let computedEnd = end;
        if (pin) {
          if (typeof scrollDistance === "number") {
            computedEnd = `+=${scrollDistance}`;
          } else if (typeof scrollDistance === "string") {
            computedEnd = scrollDistance;
          } else {
            const charsCount = split.chars?.length || 0;
            computedEnd = `+=${Math.max(400, Math.round(charsCount * scrollPerChar))}`;
          }
        }

        // Resolve pin target: boolean true pins the trigger; otherwise use a selector/element if provided
        let pinOption = pin;
        if (pin && pinTarget) {
          if (typeof pinTarget === "string") {
            const el = containerRef.current.closest(pinTarget);
            if (el) pinOption = el;
          } else if (pinTarget && pinTarget.nodeType === 1) {
            pinOption = pinTarget;
          }
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start,
            end: computedEnd,
            scrub,
            markers: false,
            pin: pinOption,
            pinSpacing,
            anticipatePin,
          },
        });

        split.chars.forEach((char, index) => {
          tl.to(
            char,
            {
              opacity: maxOpacity,
              duration: charDuration,
              ease: "none",
            },
            index * charSpacing
          );
        });

        timelineRef.current = tl;
      }

      return () => {
        if (triggerRef.current) triggerRef.current.kill();
        if (timelineRef.current) timelineRef.current.kill();
        if (splitRef.current) splitRef.current.revert();
        if (styleRef.current && styleRef.current.parentNode) {
          styleRef.current.parentNode.removeChild(styleRef.current);
        }
      };
    },
    { scope: containerRef, dependencies: [start, end, scrub, mode, charSpacing, charDuration, charWindow, minOpacity, maxOpacity, pin, pinSpacing, anticipatePin, scrollPerChar, scrollDistance, pinTarget, triggerTarget] }
  );

  const shouldWrap = pin || React.Children.count(children) !== 1;
  if (shouldWrap) {
    return (
      <div ref={containerRef} data-copy-wrapper="true">
        {children}
      </div>
    );
  }
  return React.cloneElement(children, { ref: containerRef });
}
