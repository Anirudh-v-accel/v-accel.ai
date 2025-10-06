"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
// import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import ScrollHero from "@/components/ScrollHero/ScrollHero";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <ScrollHero />
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
       
        {/* <Spotlight /> */}
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
