"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import Script from "next/script";

let isInitialLoad = true;
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  // Re-initialize Unicorn Studio embed when Home mounts (client-side navigation)
  useEffect(() => {
    const tryInitUnicorn = () => {
      if (typeof window === "undefined") return false;
      const us = window.UnicornStudio;
      const hasTarget = !!document.querySelector('[data-us-project]');
      if (us && hasTarget && typeof us.init === "function") {
        try {
          us.init();
        } catch (e) {
          // no-op
        }
        return true;
      }
      return false;
    };

    if (!tryInitUnicorn()) {
      let tries = 0;
      const timer = setInterval(() => {
        if (tryInitUnicorn() || ++tries > 20) {
          clearInterval(timer);
        }
      }, 300);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    if (showPreloader) {
      setLoaderAnimating(true);
      const counts = document.querySelectorAll(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1
        );

        if (index < counts.length) {
          tl.to(
            digits,
            {
              y: "-100%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1
          );
        }
      });

      tl.to(".spinner", {
        opacity: 0,
        duration: 0.3,
      });

      // Directly reveal the page behind after the countdown
      tl.to(".block", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.35,
        onStart: () => {
          gsap.to(".hero-img", { scale: 1, duration: 1.6, ease: "hop" });
        },
        onComplete: () => {
          gsap.set(".loader", { pointerEvents: "none" });
          setLoaderAnimating(false);
        },
      });
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  // Roll-in animation for hero stats
  useGSAP(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stats = gsap.utils.toArray(".hero-stats .stat");
    if (!stats.length) return;

    if (prefersReduced) {
      gsap.set(stats, { clearProps: "all", opacity: 1, y: 0, rotateX: 0 });
      const heads = gsap.utils.toArray(".hero-stats .stat .stat-count h2");
      gsap.set(heads, { clearProps: "all", opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    // Initial 3D rolled state
    gsap.set(stats, {
      opacity: 0,
      y: 80,
      rotateX: -45,
      transformOrigin: "50% 100%",
      willChange: "transform, opacity",
    });

    const heads = gsap.utils.toArray(".hero-stats .stat .stat-count h2");
    gsap.set(heads, {
      opacity: 0,
      y: 24,
      rotateX: -45,
      transformOrigin: "50% 100%",
      willChange: "transform, opacity",
    });

    const tl = gsap.timeline();
    tl.to(stats, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1,
      stagger: 0.12,
      ease: "back.out(1.6)",
    }).to(
      heads,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      },
      "<0.1"
    );

    ScrollTrigger.create({
      trigger: ".hero-stats",
      start: "top 85%",
      once: true,
      animation: tl,
    });
  });

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="overlay">
            <div className="block"></div>
            <div className="block"></div>
          </div>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
          <div className="counter">
            <div className="count">
              <div className="digit">
                <h1>0</h1>
              </div>
              <div className="digit">
                <h1>0</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>2</h1>
              </div>
              <div className="digit">
                <h1>7</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>6</h1>
              </div>
              <div className="digit">
                <h1>5</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>8</h1>
              </div>
            </div>
            <div className="count">
              <div className="digit">
                <h1>9</h1>
              </div>
              <div className="digit">
                <h1>9</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <Nav />
      <section className="hero">
        <div className="hero-bg">
          <div
            data-us-project="rF0CD8qXybhbdgj6qjdL"
            style={{ width: "100%", height: "100%" }}
          ></div>
          <Script id="unicornstudio-loader" strategy="afterInteractive">
            {`!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();`}
          </Script>
         
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 8 : 0.85}>
                <h1>Innovate, Accelerate, Lead Bridging SaaS and AI for Tomorrow's Enterprise.</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 8.15 : 1}>
                <p>
                Transform your business with next-generation software powered by artificial intelligence and scalable cloud solutions. V-Accel delivers bespoke SaaS, AI, and enterprise platforms — built to solve real-world challenges and unlock new opportunities.
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="Explore Solutions"
              route="/spaces"
              animateOnScroll={false}
              delay={showPreloader ? 8.3 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>225+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>Successful deployments</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>36</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Active projects</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>12</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>Cross‑functional experts</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>98%</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>Client retention rate</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                At V-Accel.ai, advanced AI-driven platforms are tailored for scalability and measurable business growth.
Unlock the potential of modern SaaS, analytics, and enterprise solutions engineered for real impact your journey to intelligent operations starts here.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <h1>How we build</h1>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                From vision to launch, our team collaborates with you at every stage—strategy, prototyping, agile development, and continuous enhancement—ensuring that your solutions go live faster and achieve transformative performance.
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>AI/ML</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>SaaS</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Data Analytics</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>ERP</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>CRM</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>ITSM</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Featured solutions</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>A selection of products, solutions, and case studies</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <h2>What our clients say</h2>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img
                  src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80"
                  alt="Dashboard and analytics"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80"
                  alt="Team collaborating"
                />
                <div className="gallery-callout-img-content">
                  <h3>100+</h3>
                  <p>Projects</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img
                  src="https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1600&q=80"
                  alt="Data visualization"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img
                  src="https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=1600&q=80"
                  alt="Code and UI"
                />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                  Explore highlights from our product work—platforms, tools,
                  and systems designed to transform business operations and
                  customer experience.
                </h3>
              </Copy>
              <AnimatedButton label="Explore Solutions" route="blueprints" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
        header="V-Accel.ai"
        callout="Build with AI. Deliver with confidence."
        description="We design and ship AI‑powered software across SaaS, analytics, HR, and enterprise systems to unlock measurable results."
      />
      <ConditionalFooter />
    </>
  );
}
