// Server Component: allows direct params access and notFound()
import "../../sample-space/sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import { notFound } from "next/navigation";
import { solutionsContent } from "../solutionsContent";

export default function SolutionPage({ params }) {
  const { slug } = params || {};
  const data = solutionsContent[slug];

  if (!data) return notFound();

  return (
    <>
      <Nav />
      <div className="page sample-space">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img src={data.heroImage} alt={`${data.title} hero`} />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>{data.title}</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>{data.projectType?.join(" • ")}</p>
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
                    {data.useCase?.map((line, i) => (
                      <h3 key={i}>{line}</h3>
                    ))}
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Date Completed</p>
                        <p>{data.dateCompleted}</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Project Type</p>
                        {data.projectType?.map((t) => (
                          <p key={t}>{t}</p>
                        ))}
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Collaborators</p>
                        {data.collaborators?.map((c) => (
                          <p key={c}>{c}</p>
                        ))}
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Tech Stack</p>
                        {data.techStack?.map((t) => (
                          <p key={t}>{t}</p>
                        ))}
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
                {data.businessImpact?.map((line, i) => (
                  <h3 key={i}>{line}</h3>
                ))}
              </Copy>
              <div className="sample-space-details-img">
                <img src={data.businessImpactImage} alt={`${data.title} impact visual`} />
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
                      <p>{data.capabilitiesLeft?.heading}</p>
                      {data.capabilitiesLeft?.items?.map((it) => (
                        <p key={it}>{it}</p>
                      ))}
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>{data.capabilitiesRight?.heading}</p>
                      {data.capabilitiesRight?.items?.map((it) => (
                        <p key={it}>{it}</p>
                      ))}
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  {/* Additional meta or case details could go here if needed */}
                </div>
              </div>
              <div className="sample-space-details-img">
                <img src={data.capabilitiesImage} alt={`${data.title} capabilities visual`} />
              </div>
              <Copy delay={0.2}>
                <h3>{data.closing}</h3>
                <AnimatedButton
                  route="/connect"
                  label={data.ctaLabel || "Contact Us"}
                  delay={0.2}
                  animateOnScroll={false}
                />
              </Copy>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
}
