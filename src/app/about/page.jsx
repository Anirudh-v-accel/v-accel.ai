"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
// import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import ScrollHero from "@/components/ScrollHero/ScrollHero";
import TeamSection from "@/components/TeamSection/TeamSection";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <ScrollHero />
        {/* Team Section heading with site text animation */}
        <section className="team-hero">
          <div className="container">
            <Copy animateOnScroll={true}>
              <h1>Face Behind the Frame</h1>
            </Copy>
          </div>
        </section>
        <TeamSection />
        {/* Catchy caption below team */}
        <section className="team-caption">
          <div className="container">
            <Copy animateOnScroll={true}>
              <h2>Build. Ship. Scale.</h2>
            </Copy>
            <Copy animateOnScroll={true} delay={0.15}>
              <p className="md">From concept to production with rigor and speed.</p>
            </Copy>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
       
        {/* <Spotlight /> */}
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
