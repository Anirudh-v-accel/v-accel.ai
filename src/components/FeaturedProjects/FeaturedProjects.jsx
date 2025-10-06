"use client";
import "./FeaturedProjects.css";
import featuredProjectsContent from "./featured-projects-content";

import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollLightText from "../ScrollLightText/ScrollLightText";

const FeaturedProjects = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const featuredProjectCards = gsap.utils.toArray(".featured-project-card");

    featuredProjectCards.forEach((featuredProjectCard, index) => {
      if (index < featuredProjectCards.length - 1) {
        const featuredProjectCardInner = featuredProjectCard.querySelector(
          ".featured-project-card-inner"
        );

        const isMobile = window.innerWidth <= 1000;

        gsap.fromTo(
          featuredProjectCardInner,
          {
            y: "0%",
            z: 0,
            rotationX: 0,
          },
          {
            y: "-50%",
            z: -250,
            rotationX: 45,
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: isMobile ? "top 85%" : "top 100%",
              end: "top -75%",
              scrub: true,
              pin: isMobile ? false : featuredProjectCard,
              pinSpacing: false,
            },
          }
        );

        gsap.to(featuredProjectCardInner, {
          "--after-opacity": 1,
          scrollTrigger: {
            trigger: featuredProjectCards[index + 1],
            start: "top 75%",
            end: "top 0%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="featured-projects">
        {featuredProjectsContent.map((project, index) => (
          <div key={index} className="featured-project-card">
            <div className="featured-project-card-inner">
              <div className="featured-project-card-content">
                <div className="featured-project-card-info">
                  <ScrollLightText
                    triggerTarget=".featured-project-card"
                    start="top bottom"
                    end="+=800"
                    scrub={true}
                    charSpacing={0.08}
                    charDuration={0.1}
                  >
                    <p>{project.info}</p>
                  </ScrollLightText>
                </div>
                <div className="featured-project-card-content-main">
                  <div className="featured-project-card-title">
                    <ScrollLightText
                      triggerTarget=".featured-project-card"
                      start="top bottom"
                      end="+=800"
                      scrub={true}
                      charSpacing={0.08}
                      charDuration={0.1}
                    >
                      <h2>{project.title}</h2>
                    </ScrollLightText>
                  </div>
                  <div className="featured-project-card-description">
                    <ScrollLightText
                      triggerTarget=".featured-project-card"
                      start="top bottom"
                      end="+=800"
                      scrub={true}
                      charSpacing={0.08}
                      charDuration={0.1}
                    >
                      <p className="lg">{project.description}</p>
                    </ScrollLightText>
                  </div>
                </div>
              </div>
              <div className="featured-project-card-img">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src =
                      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80";
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedProjects;
