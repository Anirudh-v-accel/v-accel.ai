"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TeamSection.css";

export default function TeamSection() {
  const teamSectionRef = useRef(null);
  const placeholderTriggerRef = useRef(null);
  const slideInTriggerRef = useRef(null);

  useEffect(() => {
    if (!teamSectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const teamSection = teamSectionRef.current;
    const teamMembers = () => gsap.utils.toArray(
      teamSection.querySelectorAll(".team-member")
    );
    const teamMemberCards = () => gsap.utils.toArray(
      teamSection.querySelectorAll(".team-member-card")
    );

    function initTeamAnimations() {
      // Clean previous triggers
      placeholderTriggerRef.current && placeholderTriggerRef.current.kill();
      slideInTriggerRef.current && slideInTriggerRef.current.kill();

      const isMobile = typeof window !== "undefined" && window.innerWidth < 1000;

      if (isMobile) {
        // Clear transforms on mobile (stacked layout)
        teamMembers().forEach((member) => gsap.set(member, { clearProps: "all" }));
        teamMemberCards().forEach((card) => gsap.set(card, { clearProps: "all" }));
        ScrollTrigger.refresh();
        return;
      }

      placeholderTriggerRef.current = ScrollTrigger.create({
        trigger: teamSection,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          teamMembers().forEach((member, index) => {
            const entranceDelay = 0.15;
            const entranceDuration = 0.7;
            const entranceStart = index * entranceDelay;
            const entranceEnd = entranceStart + entranceDuration;

            if (progress >= entranceStart && progress <= entranceEnd) {
              const memberEntranceProgress =
                (progress - entranceStart) / entranceDuration;

              const entranceY = 125 - memberEntranceProgress * 125;
              gsap.set(member, { y: `${entranceY}%` });

              const teamMemberInitial = member.querySelector(
                ".team-member-name-initial h1"
              );
              const initialLetterScaleDelay = 0.4;
              const initialLetterScaleProgress = Math.max(
                0,
                (memberEntranceProgress - initialLetterScaleDelay) /
                  (1 - initialLetterScaleDelay)
              );
              gsap.set(teamMemberInitial, { scale: initialLetterScaleProgress });
            } else if (progress > entranceEnd) {
              gsap.set(member, { y: `0%` });
              const teamMemberInitial = member.querySelector(
                ".team-member-name-initial h1"
              );
              gsap.set(teamMemberInitial, { scale: 1 });
            }
          });
        },
      });

      slideInTriggerRef.current = ScrollTrigger.create({
        trigger: teamSection,
        start: "top top",
        end: `+=${(typeof window !== "undefined" ? window.innerHeight : 1000) * 2}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          teamMemberCards().forEach((card, index) => {
            // Slide and rotate in
            const slideStagger = 0.075;
            const rotDuration = 0.4;
            const rotStart = index * slideStagger;
            const rotEnd = rotStart + rotDuration;

            if (progress >= rotStart && progress <= rotEnd) {
              const cardProgress = (progress - rotStart) / rotDuration;
              const cardInitialX = 150 - index * 50; // shorter travel for single-card
              const cardTargetX = 0; // end centered (CSS already has xPercent:-50 for anchor)
              const cardSlideInX = cardInitialX + cardProgress * (cardTargetX - cardInitialX);
              const cardSlideInRotation = 20 - cardProgress * 20;

              gsap.set(card, { x: `${cardSlideInX}%`, rotation: cardSlideInRotation });
            } else if (progress > rotEnd) {
              gsap.set(card, { x: `0%`, rotation: 0 });
            }

            // Scale up
            const scaleStagger = 0.12;
            const scaleStart = 0.4 + index * scaleStagger;
            const scaleEnd = 1;

            if (progress >= scaleStart && progress <= scaleEnd) {
              const scaleProgress = (progress - scaleStart) / (scaleEnd - scaleStart);
              const scaleValue = 0.85 + scaleProgress * 0.15; // subtle scale-up to 1.0
              gsap.set(card, { scale: scaleValue });
            } else if (progress > scaleEnd) {
              gsap.set(card, { scale: 1 });
            }
          });
        },
      });

      ScrollTrigger.refresh();
    }

    // initialize and resize handling
    initTeamAnimations();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initTeamAnimations();
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      placeholderTriggerRef.current && placeholderTriggerRef.current.kill();
      slideInTriggerRef.current && slideInTriggerRef.current.kill();
    };
  }, []);

  return (
    <section className="team-section" ref={teamSectionRef}>
      <div className="team">
        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>V</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img
                src="/studio/MD.png"
                alt="Managing Director"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </div>
            <div className="team-member-info">
              <p>( Managing Director )</p>
              <h1>
                Venkteshan <span>J</span>
              </h1>
            </div>
          </div>
        </div>

        {/** Single creative card only */}
      </div>
    </section>
  );
}
