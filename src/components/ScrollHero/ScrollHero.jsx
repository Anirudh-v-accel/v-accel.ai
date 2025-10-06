"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./ScrollHero.css";

export default function ScrollHero() {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const iconsRef = useRef(null);
  const textRef = useRef(null);
  const duplicatesRef = useRef(null);
  const stRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scrolling like the original
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const heroSection = rootRef.current;
    const heroHeader = headerRef.current;
    const animatedIcons = iconsRef.current;

    const iconElements = animatedIcons
      ? Array.from(animatedIcons.querySelectorAll(".animated-icon"))
      : [];
    const textSegments = textRef.current
      ? Array.from(textRef.current.querySelectorAll(".text-segment"))
      : [];
    const placeholders = textRef.current
      ? Array.from(textRef.current.querySelectorAll(".placeholder-icon"))
      : [];

    const textAnimationOrder = [];
    textSegments.forEach((segment, index) => {
      textAnimationOrder.push({ segment, originalIndex: index });
    });

    // shuffle
    for (let i = textAnimationOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [textAnimationOrder[i], textAnimationOrder[j]] = [
        textAnimationOrder[j],
        textAnimationOrder[i],
      ];
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 1000;
    const headerIconSize = isMobile ? 30 : 60;
    const currentIconSize = iconElements[0]
      ? iconElements[0].getBoundingClientRect().width || headerIconSize
      : headerIconSize;
    const exactScale = currentIconSize ? headerIconSize / currentIconSize : 1;

    // clean up any previous duplicates if hot reloaded
    if (duplicatesRef.current) {
      duplicatesRef.current.forEach((dup) => dup?.parentNode?.removeChild(dup));
      duplicatesRef.current = null;
    }

    // original animation uses only temporary duplicates; no permanent embedding

    stRef.current = ScrollTrigger.create({
      trigger: heroSection,
      start: "top top",
      end: `+=${(typeof window !== "undefined" ? window.innerHeight : 1000) * 2.5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        textSegments.forEach((segment) => {
          gsap.set(segment, { opacity: 0 });
        });

        if (progress <= 0.3) {
          const moveProgress = progress / 0.3;
          const containerMoveY = -(typeof window !== "undefined" ? window.innerHeight : 1000) * 0.3 * moveProgress;

          if (progress <= 0.15) {
            const headerProgress = progress / 0.15;
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;

            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }

          if (duplicatesRef.current) {
            duplicatesRef.current.forEach((duplicate) => {
              if (duplicate.parentNode) duplicate.parentNode.removeChild(duplicate);
            });
            duplicatesRef.current = null;
          }

          gsap.set(animatedIcons, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          });

          iconElements.forEach((icon, index) => {
            const staggerDelay = index * 0.1;
            const iconStart = staggerDelay;
            const iconEnd = staggerDelay + 0.5;
            const iconProgress = gsap.utils.mapRange(
              iconStart,
              iconEnd,
              0,
              1,
              moveProgress
            );
            const clampedProgress = Math.max(0, Math.min(1, iconProgress));

            const startOffset = -containerMoveY;
            const individualY = startOffset * (1 - clampedProgress);

            gsap.set(icon, { x: 0, y: individualY });
          });
        } else if (progress <= 0.6) {
          const scaleProgress = (progress - 0.3) / 0.3;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });
          // keep background dark to match site theme (no switching)

          if (duplicatesRef.current) {
            duplicatesRef.current.forEach((duplicate) => {
              if (duplicate.parentNode) duplicate.parentNode.removeChild(duplicate);
            });
            duplicatesRef.current = null;
          }

          const targetCenterY = (typeof window !== "undefined" ? window.innerHeight : 1000) / 2;
          const targetCenterX = (typeof window !== "undefined" ? window.innerWidth : 1000) / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;
          const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
          const deltaY = (targetCenterY - currentCenterY) * scaleProgress;
          const baseY = -(typeof window !== "undefined" ? window.innerHeight : 1000) * 0.3;
          const currentScale = 1 + (exactScale - 1) * scaleProgress;

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: currentScale,
            opacity: 1,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });
        } else if (progress <= 0.75) {
          const moveProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });
          // keep background dark to match site theme

          const targetCenterY = (typeof window !== "undefined" ? window.innerHeight : 1000) / 2;
          const targetCenterX = (typeof window !== "undefined" ? window.innerWidth : 1000) / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const currentCenterX = containerRect.left + containerRect.width / 2;
          const currentCenterY = containerRect.top + containerRect.height / 2;
          const deltaX = targetCenterX - currentCenterX;
          const deltaY = targetCenterY - currentCenterY;
          const baseY = -(typeof window !== "undefined" ? window.innerHeight : 1000) * 0.3;

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: exactScale,
            opacity: 0,
          });

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0 });
          });

          if (!duplicatesRef.current) {
            duplicatesRef.current = [];
            iconElements.forEach((icon) => {
              const duplicate = icon.cloneNode(true);
              duplicate.className = "duplicate-icon";
              duplicate.style.position = "absolute";
              duplicate.style.width = headerIconSize + "px";
              duplicate.style.height = headerIconSize + "px";
              document.body.appendChild(duplicate);
              duplicatesRef.current.push(duplicate);
            });
          }

          if (duplicatesRef.current) {
            duplicatesRef.current.forEach((duplicate, index) => {
              if (index < placeholders.length) {
                const iconRect = iconElements[index].getBoundingClientRect();
                const startCenterX = iconRect.left + iconRect.width / 2;
                const startCenterY = iconRect.top + iconRect.height / 2;
                const startPageX = startCenterX + (typeof window !== "undefined" ? window.pageXOffset : 0);
                const startPageY = startCenterY + (typeof window !== "undefined" ? window.pageYOffset : 0);

                const targetRect = placeholders[index].getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + (typeof window !== "undefined" ? window.pageXOffset : 0);
                const targetPageY = targetCenterY + (typeof window !== "undefined" ? window.pageYOffset : 0);

                const moveX = targetPageX - startPageX;
                const moveY = targetPageY - startPageY;

                let currentX = 0;
                let currentY = 0;

                if (moveProgress <= 0.5) {
                  const verticalProgress = moveProgress / 0.5;
                  currentY = moveY * verticalProgress;
                } else {
                  const horizontalProgress = (moveProgress - 0.5) / 0.5;
                  currentY = moveY;
                  currentX = moveX * horizontalProgress;
                }

                const finalPageX = startPageX + currentX;
                const finalPageY = startPageY + currentY;

                duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
                duplicate.style.top = finalPageY - headerIconSize / 2 + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }
        } else {
          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -100px))`,
            opacity: 0,
          });
          // keep background dark to match site theme
          gsap.set(animatedIcons, { opacity: 0 });

          if (duplicatesRef.current) {
            duplicatesRef.current.forEach((duplicate, index) => {
              if (index < placeholders.length) {
                const targetRect = placeholders[index].getBoundingClientRect();
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;
                const targetPageX = targetCenterX + (typeof window !== "undefined" ? window.pageXOffset : 0);
                const targetPageY = targetCenterY + (typeof window !== "undefined" ? window.pageYOffset : 0);

                duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
                duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }

          textAnimationOrder.forEach((item, randomIndex) => {
            const segmentStart = 0.75 + randomIndex * 0.03;
            const segmentEnd = segmentStart + 0.015;
            const segmentProgress = gsap.utils.mapRange(
              segmentStart,
              segmentEnd,
              0,
              1,
              progress
            );
            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));
            gsap.set(item.segment, { opacity: clampedProgress });
          });
          // no permanent embedding in original implementation
        }
      },
    });

    return () => {
      try {
        stRef.current && stRef.current.kill();
        ScrollTrigger.refresh();
      } catch {}
      try {
        lenis && typeof lenis.destroy === "function" && lenis.destroy();
      } catch {}
      if (duplicatesRef.current) {
        duplicatesRef.current.forEach((dup) => dup?.parentNode?.removeChild(dup));
        duplicatesRef.current = null;
      }
    };
  }, []);

  return (
    <section className="scroll-hero" ref={rootRef}>
      <div className="hero-header" ref={headerRef}>
        <h1>V-Accel.ai</h1>
        <p>We are an AI + product engineering studio for enterprises and SaaS.</p>
      </div>

      <div className="animated-icons" ref={iconsRef}>
        <div className="animated-icon icon-1" aria-label="React">
          <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" />
        </div>
        <div className="animated-icon icon-2" aria-label="Next.js">
          <img src="https://cdn.simpleicons.org/nextdotjs/FFFFFF" alt="Next.js" />
        </div>
        <div className="animated-icon icon-3" aria-label="Node.js">
          <img src="https://cdn.simpleicons.org/nodedotjs/339933" alt="Node.js" />
        </div>
        <div className="animated-icon icon-4" aria-label="Python">
          <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" />
        </div>
        <div className="animated-icon icon-5" aria-label="MongoDB">
          <img
            src="https://cdn.simpleicons.org/mongodb/47A248"
            alt="MongoDB"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
            }}
          />
        </div>
      </div>

      <h1 className="animated-text" ref={textRef}>
        <div className="placeholder-icon"></div>
        <span className="text-segment">An AI + product engineering studio.</span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">We turn ideas into reliable software.</span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">Partner to enterprises and SaaS teams.</span>
        <div className="placeholder-icon"></div>
        <span className="text-segment">Measured by outcomes, not hype.</span>
        <div className="placeholder-icon"></div>
      </h1>
    </section>
  );
}
