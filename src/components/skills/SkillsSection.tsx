import { useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  BrainCircuit,
  Cloud,
  Code2,
  Monitor,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "../../data/portfolio";
import { SkillCard } from "./SkillCard";
import "../../skills.css";

const categoryIcons: Record<string, LucideIcon> = {
  programming: Code2,
  development: Monitor,
  "devops-cloud": Cloud,
  monitoring: Activity,
  ai: BrainCircuit,
  tools: Wrench,
};

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
} as const;

export function SkillsSection() {
  const [filter, setFilter] = useState<string>("All");
  const visible =
    filter === "All"
      ? skillGroups
      : skillGroups.filter((group) => group.name === filter);

  return (
    <section id="skills" className="sk-section">
      <div className="wrap">
        <div className="sk-top">
          <motion.div {...reveal} className="sk-filters" aria-label="Skill filters">
            <button
              className={filter === "All" ? "active" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            {skillGroups.map((group) => (
              <button
                key={group.id}
                className={filter === group.name ? "active" : ""}
                onClick={() => setFilter(group.name)}
              >
                {group.name}
              </button>
            ))}
          </motion.div>
          <p className="sk-microtag">
            // Constantly learning <span className="sk-microtag-dot" />
          </p>
        </div>
        <motion.div layout className="sk-grid">
          {visible.map((group) => {
            const originalIndex = skillGroups.findIndex(
              (g) => g.id === group.id,
            );
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: originalIndex * 0.05 }}
                key={group.id}
              >
                <SkillCard
                  group={group}
                  index={originalIndex}
                  icon={categoryIcons[group.id] ?? Code2}
                />
              </motion.div>
            );
          })}
        </motion.div>
        <div className="sk-bottombar">
          <p>// Skills power projects</p>
          <p className="sk-bottombar-hand">Same Student. Bigger Dreams.</p>
        </div>
      </div>
    </section>
  );
}
