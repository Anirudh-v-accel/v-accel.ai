"use client";
import "./HowWeWork.css";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Copy from "../Copy/Copy";
import ScrollLightText from "../ScrollLightText/ScrollLightText";

gsap.registerPlugin(ScrollTrigger);

const HowWeWork = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggersRef = useRef([]);
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useGSAP(
    () => {
      if (!stepsRef.current) return;

      const steps = stepsRef.current.querySelectorAll(".how-we-work-step");
      gsap.set(steps, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: "top 75%",
        once: true,
        animation: gsap.to(steps, {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: -0.1,
          ease: "none",
        }),
      });
    },
    { scope: stepsRef }
  );

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!container || !header || !cards) return;

    if (!isMobile) {
      const mainTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        endTrigger: cards,
        end: "bottom bottom",
        pin: header,
        pinSpacing: false,
      });
      scrollTriggersRef.current.push(mainTrigger);

      const cardElements = cards.querySelectorAll(".how-we-work-card");

      cardElements.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
          onLeave: () => {
            if (index < cardElements.length - 1) {
              setActiveStep(index + 1);
            }
          },
          onLeaveBack: () => {
            if (index > 0) {
              setActiveStep(index - 1);
            }
          },
        });
        scrollTriggersRef.current.push(cardTrigger);
      });
    }

    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [isMobile]);

  return (
    <div className="how-we-work" ref={containerRef}>
      <div className="how-we-work-col how-we-work-header" ref={headerRef}>
        <div className="container">
          <div className="how-we-work-header-content">
            <div className="how-we-work-header-callout">
              <ScrollLightText>
                <p>Process in focus</p>
              </ScrollLightText>
            </div>
            <ScrollLightText>
              <h3>
                From discovery to deployment, our delivery model turns ideas
                into shipped, scalable software
              </h3>
            </ScrollLightText>
            <div className="how-we-work-steps" ref={stepsRef}>
              <div
                className={`how-we-work-step ${
                  activeStep === 0 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">1</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 1 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">2</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 2 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">3</p>
              </div>
              <div
                className={`how-we-work-step ${
                  activeStep === 3 ? "active" : ""
                }`}
              >
                <p className="how-we-work-step-label">Step</p>
                <p className="how-we-work-step-index">4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-we-work-col how-we-work-cards" ref={cardsRef}>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img
              src="https://images.unsplash.com/photo-1726250873166-814c1f2cb74b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Discovery and scoping"
            />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <ScrollLightText>
                <h3>Discovery & Scoping</h3>
              </ScrollLightText>
            </div>
            <ScrollLightText>
              <p className="md">
              Leaders align on goals, risks, and what success looks like. We turn key user journeys, data, and integrations into a clear, time boxed roadmap with budget and milestones. Approve the plan and a quick prototype follows, so progress and value are visible early.
              </p>
            </ScrollLightText>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img
              src="https://images.unsplash.com/photo-1753715613388-7e03410b1dce?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Solution design"
            />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <ScrollLightText>
                <h3>Solution Design</h3>
              </ScrollLightText>
            </div>
            <ScrollLightText>
              <p className="md">
              We design the simplest, safest solution to meet the goal. You get clear architecture, data models, and APIs plus clickable prototypes to test before the full build. Approve the design pack to lock scope, cost, and timelines with confidence.
              </p>
            </ScrollLightText>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80"
              alt="Engineering and QA"
            />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <ScrollLightText>
                <h3>Engineering & QA</h3>
              </ScrollLightText>
            </div>
            <ScrollLightText>
              <p className="md">
              We ship in small, safe steps. Automated tests, peer reviews, and performance checks protect quality, while live health dashboards keep everyone informed. Controlled rollouts make releases smooth, secure, and easy to reverse if needed.
              </p>
            </ScrollLightText>
          </div>
        </div>
        <div className="how-we-work-card">
          <div className="how-we-work-card-img">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80"
              alt="Deployment and support"
            />
          </div>
          <div className="how-we-work-card-copy">
            <div className="how-we-work-card-index-label">
              <ScrollLightText>
                <h3>Deployment & Support</h3>
              </ScrollLightText>
            </div>
            <ScrollLightText>
              <p className="md">
              We launch carefully and support continuously. Automated deploys, monitoring, and runbooks keep systems healthy; training and regular reviews keep teams enabled and features improving. Set the go live date and quarterly reviews to track impact and ROI.
              </p>
            </ScrollLightText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
