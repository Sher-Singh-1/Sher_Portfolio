import { motion } from "motion/react";
import { BookOpen, GraduationCap } from "lucide-react";
import type { Education } from "../../data/portfolio";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
} as const;

export function EducationTimeline({ items }: { items: Education[] }) {
  return (
    <div className="ed-timeline">
      {items.map((item, index) => (
        <motion.div
          {...reveal}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="ed-row"
          key={item.degree}
        >
          <div className="ed-row-years">
            <span className="ed-dot" />
            {item.years}
            {item.expected && <i>(Expected)</i>}
          </div>
          <div className="ed-card">
            <span className="ed-card-icon">
              {index === 0 ? (
                <GraduationCap size={22} />
              ) : (
                <BookOpen size={22} />
              )}
            </span>
            <div className="ed-card-body">
              <h3>{item.degree}</h3>
              <p className="ed-school">{item.school}</p>
              <p className="ed-desc">{item.description}</p>
              <div className="ed-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
