"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
// import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                V-Accel.ai delivers impact, not just software. Our expert team unites AI, machine learning, and full-stack engineering to turn ambitious ideas into reliable solutions that drive businesses forward.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                As a partner for growth, V-Accel.ai helps enterprises unlock innovation through deep SaaS expertise and AI-powered transformation. From discovery through deployment, we engineer every product and service to deliver real, measurable results—accelerating progress for tomorrow's leaders.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
                  alt="V-Accel.ai team collaborating"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>AI models deployed</p>
                  <h2>120+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Tech stacks integrated</p>
                  <h2>60</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Products delivered</p>
                  <h2>25+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>Uptime across clients</p>
                  <h2>99.9%</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <p>Deployments</p>
                  <h2>724</h2>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <CTAWindow
          img="https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1600&q=80"
          header="Solutions"
          callout="From prototype to production"
          description="Explore how we design, build, and scale AI‑powered platforms across SaaS, analytics, HR, and enterprise systems."
        />
        {/* <Spotlight /> */}
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
