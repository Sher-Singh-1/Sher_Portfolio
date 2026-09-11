import { motion } from "motion/react";
import { education, achievements } from "../../data/portfolio";
import { EducationIllustration } from "./EducationIllustration";
import { EducationTimeline } from "./EducationTimeline";
import { AchievementGrid } from "./AchievementGrid";
import "../../education.css";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
} as const;

export function EducationSection() {
  return (
    <section id="education" className="ed-section">
      <div className="wrap">
        <div className="ed-top">
          <motion.div {...reveal} className="ed-heading-col">
            <p className="ed-tag">// 06 — Education &amp; Recognition</p>
            <h2 className="ed-title">
              Always
              <br />
              <em>learning.</em>
            </h2>
            <p className="ed-lede">
              Formal education gave me the foundation, but my curiosity keeps
              building the future.
            </p>
            <div className="ed-stats">
              <div>
                <b>{education.length}</b>
                <span>Degrees</span>
              </div>
              <div>
                <b>{achievements.length}+</b>
                <span>Certifications</span>
              </div>
              <div>
                <b>∞</b>
                <span>Learning</span>
              </div>
            </div>
            <EducationIllustration />
          </motion.div>
          <div className="ed-content-col">
            <EducationTimeline items={education} />
            <AchievementGrid items={achievements} />
          </div>
        </div>
        <div className="ed-bottombar">
          <p className="ed-quote">
            <span>“</span> A degree opens doors, but{" "}
            <em>continuous learning builds the future.</em> <span>”</span>
          </p>
          <div className="ed-hand">
            <p>
              Same Student.
              <br />
              Bigger Dreams.
            </p>
            <svg viewBox="0 0 120 30" aria-hidden="true">
              <path d="M2 6c30 18 78 18 110-2" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
