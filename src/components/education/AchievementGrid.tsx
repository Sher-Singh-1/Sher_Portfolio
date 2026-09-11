import { motion } from "motion/react";
import {
  BarChart3,
  Code2,
  ExternalLink,
  ServerCog,
  ShieldCheck,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { Achievement } from "../../data/portfolio";

const icons: LucideIcon[] = [Code2, ShieldCheck, BarChart3, ServerCog];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
} as const;

export function AchievementGrid({ items }: { items: Achievement[] }) {
  return (
    <div className="ed-achievements">
      <p className="ed-achievements-label">
        <Trophy size={14} /> Certifications &amp; achievements
      </p>
      <div className="ed-achievements-grid">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              {...reveal}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="ed-achievement"
              key={item.title}
            >
              <span className="ed-achievement-icon">
                <Icon size={18} />
              </span>
              <span className="ed-achievement-copy">
                <b>{item.title}</b>
                <span>{item.subtitle}</span>
              </span>
              <ExternalLink size={14} className="ed-achievement-arrow" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
