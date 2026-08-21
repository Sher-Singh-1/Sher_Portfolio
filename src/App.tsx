import { FormEvent, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  Download,
  ExternalLink,
  Menu,
  Play,
  X,
} from "lucide-react";
import profileImage from "../data/Profile.jpeg";
import gearIcon from "./assets/icons3d/gear.png";
import barChartIcon from "./assets/icons3d/bar_chart.png";
import rocketIcon from "./assets/icons3d/rocket.png";
import sparklesIcon from "./assets/icons3d/sparkles.png";
import packageIcon from "./assets/icons3d/package.png";
import graduationCapIcon from "./assets/icons3d/graduation_cap.png";
import trophyIcon from "./assets/icons3d/trophy.png";
import envelopeIcon from "./assets/icons3d/envelope.png";
import {
  achievements,
  education,
  experiences,
  profile,
  projects,
  skillGroups,
  type Project,
} from "./data/portfolio";
import "./App.css";
import "./upgrade.css";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
} as const;
const filters = ["All", "DevOps", "AI / ML", "Monitoring"] as const;
const marqueeItems = Array.from(
  new Set(skillGroups.flatMap((group) => group.items)),
);

function MagneticLink({
  href,
  children,
  className = "",
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
      ref.current!.style.transform = `translate(${x}px, ${y}px)`;
    }
  };
  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={onMove}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className={className}
    >
      {children}
    </a>
  );
}

function FloatIcon({
  src,
  alt,
  className = "",
  duration = 4.5,
  delay = 0,
  distance = 12,
}: {
  src: string;
  alt: string;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`icon-3d ${className}`}
      animate={{ y: [0, -distance, 0], rotate: [0, 3, 0, -3, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function TechMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 20 });
  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(py * -14);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className={`project-card ${project.accent}`}
      onClick={onSelect}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      tabIndex={0}
      role="button"
      aria-label={`Read ${project.title} case study`}
      onKeyDown={(event) => event.key === "Enter" && onSelect()}
    >
      <div className="project-art">
        <span>{project.category}</span>
        <b>
          {project.id === "sheros"
            ? "S"
            : project.id === "fire"
              ? "AI"
              : "VMS"}
        </b>
        <FloatIcon
          src={project.icon}
          alt=""
          className="project-icon"
          duration={5}
        />
      </div>
      <div className="project-content">
        <p>{project.year}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>
        <div className="tags">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <button>
          View case study <ChevronRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}

function SherosVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "220px" });
  return (
    <div className="sheros-video" ref={ref}>
      {inView ? (
        <video
          controls
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-label="SherOS product demonstration"
        >
          <source src={withBase("media/sheros-demo.webm")} type="video/webm" />
          Your browser does not support the SherOS demonstration video.
        </video>
      ) : (
        <div className="video-poster">
          <Play size={22} /> SherOS demonstration loads when this section is
          near
        </div>
      )}
    </div>
  );
}

function ProjectModal({
  project,
  close,
}: {
  project: Project;
  close: () => void;
}) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={close}
      role="presentation"
    >
      <motion.section
        className="project-modal"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        <button
          className="icon-button"
          onClick={close}
          aria-label="Close project details"
        >
          <X />
        </button>
        <p className="overline">
          {project.category} · {project.year}
        </p>
        <h2 id="project-title">{project.title}</h2>
        <p className="modal-lede">{project.summary}</p>
        <div className="detail-grid">
          <div>
            <h3>Problem</h3>
            <p>{project.problem}</p>
            <h3>Solution</h3>
            <p>{project.solution}</p>
          </div>
          <div>
            <h3>My contribution</h3>
            <p>{project.contribution}</p>
            <h3>Key features</h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [formMessage, setFormMessage] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -86]);
  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);
  useEffect(() => {
    const escape = (event: KeyboardEvent) =>
      event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) {
      setFormMessage("Please complete your name, email, and message.");
      return;
    }
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(String(form.get("subject") || "Portfolio enquiry"))}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    setFormMessage("Opening your email application…");
  };
  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <nav className="nav wrap" aria-label="Primary navigation">
          <a href="#home" className="brand">
            SHER<span>®</span>
          </a>
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {["About", "Experience", "Skills", "Projects", "Education"].map(
              (item) => (
                <a
                  onClick={() => setMenuOpen(false)}
                  href={`#${item.toLowerCase()}`}
                  key={item}
                >
                  {item}
                </a>
              ),
            )}
            <a onClick={() => setMenuOpen(false)} href="#contact">
              Contact
            </a>
          </div>
          <a
            className="resume-button"
            href={withBase("resume/sher-singh-resume.pdf")}
            target="_blank"
            rel="noreferrer"
          >
            <Download size={14} /> Resume
          </a>
        </nav>
      </header>
      <main id="home">
        <section className="hero wrap">
          <div className="hero-copy">
            <motion.p {...reveal} className="overline">
              <span className="status-dot" /> Available for technical
              opportunities
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
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
            <div className="social-row">
              {profile.social.map((social) => (
                <MagneticLink
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  key={social.label}
                >
                  {social.label} <span>↗</span>
                </MagneticLink>
              ))}
            </div>
          </div>
        <motion.div
          style={{ y: heroY }}
          className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            aria-hidden="true"
          >
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="core">
              <span>
                DEV
                <br />
                OPS
              </span>
            </div>
            <div className="code-card card-one">
              <img src={barChartIcon} alt="" className="icon-3d card-icon" />
              <span>01</span>
              <b>OBSERVE</b>
              <i>Grafana · Prometheus</i>
            </div>
            <div className="code-card card-two">
              <img src={gearIcon} alt="" className="icon-3d card-icon" />
              <span>02</span>
              <b>AUTOMATE</b>
              <i>Python · Shell</i>
            </div>
            <FloatIcon
              src={rocketIcon}
              alt=""
              className="hero-float-icon hero-float-rocket"
              duration={4}
              distance={16}
            />
            <FloatIcon
              src={sparklesIcon}
              alt=""
              className="hero-float-icon hero-float-sparkles"
              duration={3.4}
              delay={0.6}
              distance={10}
            />
            <div className="grid-planes" />
          </motion.div>
        </section>
        <TechMarquee />
        <section id="about" className="section wrap about">
          <motion.div {...reveal} className="profile-frame">
            <img
              src={profileImage}
              alt="Sher Singh"
              width="960"
              height="1280"
              loading="lazy"
            />
            <span>SHER SINGH · DEVOPS & SOFTWARE</span>
          </motion.div>
          <motion.div {...reveal} className="about-copy">
            <p className="overline">01 · About me</p>
            <h2>
              From code to <em>reliable operations.</em>
            </h2>
            <p className="lede">
              I’m {profile.name}, a {profile.role} at {profile.company}. I enjoy
              building, deploying, monitoring, and improving technology that
              works in real environments.
            </p>
            <dl>
              <div>
                <dt>Current role</dt>
                <dd>DevOps Engineer · Mirasys India Pvt. Ltd.</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>MCA, MDU Rohtak · Expected 2028</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>
                  AI/ML, computer vision, monitoring, automation & web
                  technologies
                </dd>
              </div>
            </dl>
          </motion.div>
        </section>
        <section id="experience" className="section muted-section">
          <div className="wrap">
            <motion.div {...reveal} className="section-heading">
              <p className="overline">02 · Experience</p>
              <h2>
                Hands-on work,
                <br />
                <em>in production.</em>
              </h2>
            </motion.div>
            <div className="timeline">
              {experiences.map((experience, index) => (
                <motion.article
                  {...reveal}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="timeline-item"
                  key={experience.company}
                >
                  <div className="timeline-dot" />
                  <p className="timeline-date">{experience.duration}</p>
                  <div>
                    <h3>{experience.role}</h3>
                    <p className="company">{experience.company}</p>
                    <ul>
                      {experience.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="tags">
                      {experience.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <section id="skills" className="section wrap">
          <motion.div {...reveal} className="section-heading split">
            <div>
              <p className="overline">03 · Technology ecosystem</p>
              <h2>
                Tools for
                <br />
                <em>real systems.</em>
              </h2>
            </div>
            <p>
              I select technology based on the problem: from infrastructure and
              monitoring to frontend interfaces and computer vision.
            </p>
          </motion.div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <motion.article
                {...reveal}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="skill-card"
                key={group.name}
              >
                <span className="skill-index">0{index + 1}</span>
                <img src={group.icon} alt="" className="icon-3d skill-icon" />
                <h3>{group.name}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="projects" className="section project-section">
          <div className="wrap">
            <motion.div {...reveal} className="section-heading split">
              <div>
                <p className="overline">04 · Selected projects</p>
                <h2>
                  Built to solve,
                  <br />
                  <em>made to last.</em>
                </h2>
              </div>
              <p>
                Each project reflects a practical engineering problem, from
                local system observability to AI-enabled video intelligence.
              </p>
            </motion.div>
            <div className="filter-bar" aria-label="Project filters">
              {filters.map((item) => (
                <button
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
            <motion.div layout className="project-grid">
              {visibleProjects.map((project) => (
                <ProjectCard
                  project={project}
                  onSelect={() => setSelected(project)}
                  key={project.id}
                />
              ))}
            </motion.div>
          </div>
        </section>
        <section className="sheros-section">
          <div className="wrap">
            <motion.div {...reveal} className="sheros-heading">
              <div>
                <p className="overline">05 · Featured case study</p>
                <h2>
                  <img
                    src={barChartIcon}
                    alt=""
                    className="icon-3d heading-icon"
                  />
                  SHEROS<span>™</span>
                </h2>
                <p>
                  A cross-platform system health monitor designed to make local
                  machine health visible, actionable, and easier to manage.
                </p>
              </div>
              <button
                className="case-link"
                onClick={() => setSelected(projects[0])}
              >
                Read the full case study <ArrowUpRight />
              </button>
            </motion.div>
            <SherosVideo />
            <div className="monitor-strip" aria-label="Illustrative monitoring activity">
              <div className="monitor-metric"><span>CPU LOAD</span><b>42%</b><i>STABLE</i></div>
              <div className="monitor-chart"><span>LIVE TELEMETRY</span><svg viewBox="0 0 480 92" role="img" aria-label="Animated system monitoring line chart"><path className="chart-grid" d="M0 22H480M0 46H480M0 70H480" /><polyline className="chart-line chart-line-one" points="0,63 34,52 70,61 104,31 139,45 174,40 210,59 245,22 279,35 317,27 352,51 386,42 420,58 450,28 480,37" /><polyline className="chart-line chart-line-two" points="0,75 38,68 75,73 115,56 154,65 190,60 231,74 270,50 309,59 348,46 384,64 423,54 458,67 480,59" /></svg></div>
              <div className="monitor-metric"><span>NETWORK</span><b>ONLINE</b><i>SYNCED</i></div>
            </div>
            <div className="case-grid">
              {[
                ["The problem", projects[0].problem],
                ["The solution", projects[0].solution],
                [
                  "Architecture",
                  "Python and psutil collect system data; REST APIs expose it to a responsive web dashboard; SQLite retains local historical data.",
                ],
                ["My role", projects[0].contribution],
              ].map(([title, content], index) => (
                <motion.div
                  {...reveal}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  key={title}
                >
                  <p className="overline">0{index + 1}</p>
                  <h3>{title}</h3>
                  <p>{content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="education" className="section wrap two-column">
          <motion.div {...reveal}>
            <p className="overline">06 · Education & recognition</p>
            <h2>
              <img
                src={graduationCapIcon}
                alt=""
                className="icon-3d heading-icon"
              />
              Always
              <br />
              <em>learning.</em>
            </h2>
          </motion.div>
          <div>
            <div className="education-list">
              {education.map((item) => (
                <motion.article
                  {...reveal}
                  className="education-item"
                  key={item.degree}
                >
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                  <span>{item.duration}</span>
                </motion.article>
              ))}
            </div>
            <div className="achievements">
              <p className="overline">
                <img
                  src={trophyIcon}
                  alt=""
                  className="icon-3d achievements-icon"
                />
                Certifications & achievements
              </p>
              {achievements.map((achievement) => (
                <motion.p {...reveal} key={achievement}>
                  ✦ {achievement}
                </motion.p>
              ))}
            </div>
          </div>
        </section>
        <section className="resume-section">
          <motion.div {...reveal} className="wrap resume-inner">
            <div>
              <p className="overline">07 · Resume</p>
              <h2>
                <img
                  src={packageIcon}
                  alt=""
                  className="icon-3d heading-icon"
                />
                The details,
                <br />
                <em>all together.</em>
              </h2>
            </div>
            <div>
              <p>
                View my complete experience, project history, technical skills,
                education, and certifications.
              </p>
              <div className="hero-actions">
                <a
                  className="button primary dark"
                  href={withBase("resume/sher-singh-resume.pdf")}
                  target="_blank"
                  rel="noreferrer"
                >
                  View resume <ExternalLink />
                </a>
                <a
                  className="button ghost dark"
                  href={withBase("resume/sher-singh-resume.pdf")}
                  download
                >
                  Download <Download />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        <section id="contact" className="section contact wrap">
          <motion.div {...reveal}>
            <p className="overline">08 · Contact</p>
            <h2>
              <img
                src={envelopeIcon}
                alt=""
                className="icon-3d heading-icon"
              />
              Let’s build
              <br />
              something <em>dependable.</em>
            </h2>
            <p className="contact-text">
              Have a technical opportunity, infrastructure challenge, or
              collaboration in mind? I’d be glad to hear about it.
            </p>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight />
            </a>
          </motion.div>
          <motion.form {...reveal} onSubmit={onSubmit} noValidate>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Subject
              <input name="subject" />
            </label>
            <label>
              Message
              <textarea name="message" required rows={5} />
            </label>
            <button className="button primary" type="submit">
              Start conversation <ArrowUpRight />
            </button>
            {formMessage && (
              <p className="form-message" role="status">
                {formMessage}
              </p>
            )}
            <p className="form-note">
              This form opens your email app; no message is sent from this
              website.
            </p>
          </motion.form>
        </section>
      </main>
      <footer>
        <div className="wrap footer-inner">
          <a href="#home" className="brand">
            SHER<span>®</span>
          </a>
          <p>DevOps engineer · software developer · technology builder</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>© {new Date().getFullYear()} Sher Singh</span>
        </div>
      </footer>
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} close={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
export default App;
