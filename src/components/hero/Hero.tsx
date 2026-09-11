import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MagneticLink } from "../MagneticLink";
import { HeroStats } from "./HeroStats";
import { SocialLinks } from "./SocialLinks";
import { OrbitalSystem } from "./OrbitalSystem";
import { profile } from "../../data/portfolio";
import "../../hero.css";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
} as const;

export function Hero() {
  return (
    <section className="hero-v2">
      <div className="wrap hero-v2-inner">
        <div className="hero-copy">
          <motion.p {...reveal} className="hero-status">
            <span className="hero-status-dot" /> Available for technical
            opportunities
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineering resilient systems for a world that{" "}
            <em>moves fast.</em>
          </motion.h1>
          <motion.p
            {...reveal}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="hero-text"
          >
            {profile.intro}
          </motion.p>
          <motion.div
            {...reveal}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="hero-actions"
          >
            <MagneticLink href="#projects" className="button primary">
              View my work <ArrowUpRight />
            </MagneticLink>
            <MagneticLink href="#contact" className="button ghost">
              Let’s connect <ArrowUpRight />
            </MagneticLink>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <HeroStats />
          </motion.div>
          <SocialLinks items={profile.social} />
        </div>
        <motion.div
          className="hero-orbital-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <OrbitalSystem />
        </motion.div>
      </div>
    </section>
  );
}
