"use client";
import "./sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page sample-space">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80"
              alt="Customer Retention System hero"
            />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>Customer Retention System</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>SaaS Platform</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>Use Case</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>
                      Predict and prevent churn with ML models, lifecycle
                      automation, and customer 360—shipped as a modular,
                      API‑first platform.
                    </h3>
                    <h3>
                      Built to integrate with your CRM and data stack, the
                      system delivers high‑precision alerts, cohort insights,
                      and automated journeys to grow LTV.
                    </h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Date Completed</p>
                        <p>2025</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Project Type</p>
                        <p>AI/ML</p>
                        <p>SaaS</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Collaborators</p>
                        <p>Data Science</p>
                        <p>Engineering</p>
                        <p>Product Design</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Tech Stack</p>
                        <p>Next.js • Node.js</p>
                        <p>Python • Postgres</p>
                      </Copy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-1">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Business Impact</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <h3>
                  Reduced churn by 17% within two quarters through ML‑driven
                  risk scoring and targeted engagement.
                </h3>

                <h3>
                  Unified data across CRM, billing, and support to surface
                  high‑value segments and next‑best actions for retention.
                </h3>
              </Copy>
              <div className="sample-space-details-img">
                <img
                  src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1600&q=80"
                  alt="Retention dashboard overview"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-2">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Capabilities</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Models</p>
                      <p>Churn risk</p>
                      <p>Propensity scoring</p>
                      <p>Next‑best action</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Journeys</p>
                      <p>Lifecycle automation</p>
                      <p>Trigger‑based outreach</p>
                      <p>Multi‑channel</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Data</p>
                      <p>CRM events</p>
                      <p>Billing signals</p>
                      <p>Support tickets</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Delivery</p>
                      <p>APIs & webhooks</p>
                      <p>Dashboards</p>
                      <p>Embedded widgets</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-details-img">
                <img
                  src="https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1600&q=80"
                  alt="Lifecycle automation and alerts"
                />
              </div>
              <Copy delay={0.2}>
                <h3>
                  Built with privacy and reliability in mind—governed datasets,
                  auditability, and observability end‑to‑end.
                </h3>
              </Copy>
            </div>
          </div>
        </section>
        <CTAWindow
          img="/sample-space/next-project.jpg"
          header="Next Case"
          callout="Built for scale and reliability"
          description="Explore how V‑Accel.ai delivers AI‑powered platforms that integrate with your stack and scale with your growth."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
