"use client";
import "./spaces.css";
import { spacesData } from "./spaces.js";
import { useRef, useEffect, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import { useViewTransition } from "@/hooks/useViewTransition";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
  const spacesRef = useRef(null);
  const scrollTriggerInstances = useRef([]);
  const { navigateWithTransition } = useViewTransition();
  const [activeFilter, setActiveFilter] = useState("All");

  const cleanupScrollTriggers = () => {
    scrollTriggerInstances.current.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances.current = [];
  };

  const setupAnimations = () => {
    cleanupScrollTriggers();

    if (!spacesRef.current) return;

    const spaces = spacesRef.current.querySelectorAll(".space");
    if (spaces.length === 0) return;

    spaces.forEach((space, index) => {
      gsap.set(space, {
        opacity: 0,
        scale: 0.75,
        y: 150,
      });

      if (index === 0) {
        gsap.to(space, {
          duration: 0.75,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          delay: 1.4,
        });
      } else {
        const trigger = ScrollTrigger.create({
          trigger: space,
          start: "top 100%",
          onEnter: () => {
            gsap.to(space, {
              duration: 0.75,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power3.out",
            });
          },
        });

        scrollTriggerInstances.current.push(trigger);
      }
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    setupAnimations();

    const handleResize = () => {
      setupAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupScrollTriggers();
    };
  }, []);

  // Re-run animations when the filter changes (DOM list updates)
  useEffect(() => {
    setupAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  const displayedSpaces =
    activeFilter === "All"
      ? spacesData
      : spacesData.filter((s) => s.categories.includes(activeFilter));

  return (
    <>
      <Nav />
      <div className="page spaces">
        <section className="spaces-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <Copy delay={1}>
                <h1>Solutions</h1>
              </Copy>
              <div className="prop-filters">
                <div
                  className={`filter ${activeFilter === "All" ? "active" : ""}`}
                  onClick={() => setActiveFilter("All")}
                >
                  <Copy delay={1}>
                    <p className="lg">All</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${activeFilter === "Business Operations" ? "active" : ""}`}
                  onClick={() => setActiveFilter("Business Operations")}
                >
                  <Copy delay={1.1}>
                    <p className="lg">Business Operations</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${activeFilter === "People & Talent" ? "active" : ""}`}
                  onClick={() => setActiveFilter("People & Talent")}
                >
                  <Copy delay={1.2}>
                    <p className="lg">People & Talent</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${activeFilter === "Project & Productivity" ? "active" : ""}`}
                  onClick={() => setActiveFilter("Project & Productivity")}
                >
                  <Copy delay={1.3}>
                    <p className="lg">Project & Productivity</p>
                  </Copy>
                </div>
                <div
                  className={`filter ${activeFilter === "Support & Service" ? "active" : ""}`}
                  onClick={() => setActiveFilter("Support & Service")}
                >
                  <Copy delay={1.4}>
                    <p className="lg">Support & Service</p>
                  </Copy>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="spaces-list">
          <div className="container" ref={spacesRef}>
            {displayedSpaces.map((space, index) => (
              <a
                key={space.id}
                href={space.route}
                className="space"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition(space.route);
                }}
              >
                <div className="space-img">
                  <img src={space.image} alt={space.name} />
                </div>
                <div className="space-info">
                  <div className="prop-info-col">
                    <div className="prop-date">
                      <p>{space.date}</p>
                    </div>
                  </div>
                  <div className="prop-info-col">
                    <div className="prop-info-sub-col">
                      <div className="prop-name">
                        <h3>{space.name}</h3>
                        <p className="lg">{space.location}</p>
                      </div>
                    </div>
                    <div className="prop-info-sub-col">
                      <div className="prop-client">
                        <div className="prop-client-img">
                          <img src={space.clientImage} alt={space.clientName} />
                        </div>
                        <div className="prop-client-name">
                          <p>{space.clientName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
