"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

const page = () => {
  // Text-only creative effect: scramble-to-reveal on hover
  const phoneDisplay = "+91 8610262853";
  const phoneLink = "918610262853";

  const scrambleNumber = (el, finalText = phoneDisplay) => {
    if (!el) return;
    const original = finalText;
    const chars = "0123456789";
    let frame = 0;
    const total = 18; // ~300ms at 60fps
    const update = () => {
      const progress = frame / total;
      const out = original
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "+") return ch;
          return progress > i / original.length
            ? ch
            : chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      el.textContent = out;
      frame++;
      if (frame <= total) requestAnimationFrame(update);
      else el.textContent = original;
    };
    requestAnimationFrame(update);
  };

  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>Let’s build your next AI‑powered solution</h1>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;25</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block contact-text-only">
                  <Copy delay={0.85}>
                    <p className="contact-label">Ping us at</p>
                    <p className="contact-line">
                      <a
                        className="contact-number"
                        href={`https://wa.me/${phoneLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={(e) => scrambleNumber(e.currentTarget)}
                        onFocus={(e) => scrambleNumber(e.currentTarget)}
                      >
                        {phoneDisplay}
                      </a>
                    </p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>Sales & Partnerships</p>
                    <p>sales@v-accel.ai</p>
                    <p>v-accel.ai</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Head Office</p>
                    <p>Chennai</p>
                    <p>Tamil Nadu, India</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>Social</p>
                    <p>LinkedIn</p>
                    <p>GitHub</p>
                    <p>YouTube</p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
                  alt="V-Accel.ai workspace"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
