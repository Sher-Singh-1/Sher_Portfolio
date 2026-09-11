import { FormEvent, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
} from "motion/react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Box,
  BrainCircuit,
  ChevronRight,
  Code2,
  Crown,
  Database,
  Download,
  ExternalLink,
  LayoutDashboard,
  Mail,
  Menu,
  Moon,
  Play,
  ScanEye,
  Server,
  Sun,
  Webhook,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import { DiJava } from "react-icons/di";
import {
  SiCss,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiGnubash,
  SiGrafana,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNetdata,
  SiNodedotjs,
  SiPrometheus,
  SiPython,
  SiReact,
  SiSqlite,
} from "react-icons/si";
import { MagneticLink } from "./components/MagneticLink";
import { Hero } from "./components/hero/Hero";
import profileImage from "../data/Profile.jpeg";
import barChartIcon from "./assets/icons3d/bar_chart.png";
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
import "./projects.css";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
} as const;
const filters = ["All", "AI / ML", "DevOps", "Monitoring", "Web Apps"] as const;
const projectCaptions: Record<string, string[]> = {
  "go-sheros": ["Plan", "Track", "Improve"],
  fire: ["Detect", "Alert", "Protect"],
  vms: ["Deploy", "Monitor", "Scale"],
  sheros: ["Monitor", "Analyze", "Keep it Healthy"],
};
type Theme = "light" | "dark";
const getInitialTheme = (): Theme => {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
  }
  return "dark";
};
const marqueeItems = Array.from(
  new Set(skillGroups.flatMap((group) => group.items)),
);
const skillIconMap: Record<string, LucideIcon | IconType> = {
  Python: SiPython,
  Java: DiJava,
  JavaScript: SiJavascript,
  SQL: Database,
  "Shell Scripting": SiGnubash,
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  HTML5: SiHtml5,
  CSS3: SiCss,
  "REST APIs": Webhook,
  Linux: SiLinux,
  Docker: SiDocker,
  AWS: FaAws,
  "CI/CD Pipeline": Workflow,
  Grafana: SiGrafana,
  Prometheus: SiPrometheus,
  Netdata: SiNetdata,
  "Server Deployment": Server,
  Automation: Bot,
  YOLOv5: ScanEye,
  YOLOE: ScanEye,
  "AI Model Training": BrainCircuit,
  SQLite: SiSqlite,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
};
function LinkedInMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55z" />
    </svg>
  );
}

function GithubMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.53-1.32-1.28-1.68-1.28-1.68-1.05-.7.08-.69.08-.69 1.16.08 1.77 1.18 1.77 1.18 1.03 1.75 2.7 1.24 3.36.95.1-.75.4-1.24.73-1.53-2.55-.28-5.24-1.27-5.24-5.63 0-1.24.45-2.26 1.18-3.05-.12-.28-.51-1.44.11-3 0 0 .96-.3 3.15 1.17a11.05 11.05 0 0 1 5.74 0c2.18-1.47 3.14-1.17 3.14-1.17.63 1.56.24 2.72.12 3 .74.79 1.18 1.81 1.18 3.05 0 4.37-2.7 5.34-5.27 5.62.42.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
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

function ProjectIllustration({ id }: { id: string }) {
  if (id === "go-sheros") {
    return (
      <div className="pj-phone" aria-hidden="true">
        <div className="pj-phone-screen">
          <span className="pj-phone-today">Today</span>
          {["Complete project", "Workout", "Read a book", "Learn DevOps"].map(
            (task, index) => (
              <div className="pj-phone-row" key={task}>
                <span
                  className={`pj-phone-check ${index < 2 ? "done" : ""}`}
                />
                {task}
              </div>
            ),
          )}
          <div className="pj-phone-progress">
            <span>Goal Progress</span>
            <b>70%</b>
          </div>
          <div className="pj-phone-bars">
            {[40, 70, 55, 90, 60].map((h, index) => (
              <i key={index} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (id === "fire") {
    return (
      <div className="pj-camera" aria-hidden="true">
        <div className="pj-camera-glow" />
        <div className="pj-camera-body">
          <div className="pj-camera-lens">
            <span className="pj-camera-dot" />
          </div>
          <div className="pj-camera-arm" />
          <div className="pj-camera-base" />
        </div>
        <div className="pj-camera-alert">
          <AlertTriangle size={12} /> Fire Detected
        </div>
      </div>
    );
  }
  if (id === "vms") {
    return (
      <div className="pj-servers" aria-hidden="true">
        <div className="pj-cloud" />
        {[0, 1, 2].map((row) => (
          <div className="pj-server" key={row}>
            <span className="pj-server-light" />
            <span className="pj-server-light" />
          </div>
        ))}
        <svg className="pj-tux" viewBox="0 0 24 28" aria-hidden="true">
          <ellipse cx="12" cy="15" rx="9" ry="12" fill="#0a0a0a" />
          <ellipse cx="12" cy="17" rx="5" ry="8" fill="#fff" />
          <circle cx="9.2" cy="8.5" r="1.1" fill="#fff" />
          <circle cx="14.8" cy="8.5" r="1.1" fill="#fff" />
          <path d="M10.5 10.5L12 12.5L13.5 10.5Z" fill="#f0a500" />
          <path d="M6 22c1.5 1.5 3 2 6 2s4.5-.5 6-2" stroke="none" fill="none" />
          <ellipse cx="8" cy="25.5" rx="1.6" ry="0.8" fill="#f0a500" />
          <ellipse cx="16" cy="25.5" rx="1.6" ry="0.8" fill="#f0a500" />
        </svg>
      </div>
    );
  }
  return (
    <div className="pj-monitor" aria-hidden="true">
      <div className="pj-monitor-screen">
        <div className="pj-monitor-bars">
          {[35, 65, 45, 80].map((h, index) => (
            <i key={index} style={{ height: `${h}%` }} />
          ))}
        </div>
        <svg
          className="pj-monitor-line"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <polyline points="0,20 14,20 22,6 30,26 38,14 46,20 60,20 68,8 76,24 84,16 100,16" />
        </svg>
      </div>
      <div className="pj-monitor-stand" />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
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
  const letter =
    project.id === "sheros"
      ? "S"
      : project.id === "fire"
        ? "AI"
        : project.id === "go-sheros"
          ? "GS"
          : "VMS";
  const caption = projectCaptions[project.id] ?? [];
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
      className={`pj-card ${project.accent}`}
      onClick={onSelect}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      tabIndex={0}
      role="button"
      aria-label={`Read ${project.title} case study`}
      onKeyDown={(event) => event.key === "Enter" && onSelect()}
    >
      <div className="pj-card-art">
        <div className="pj-topline">
          <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="pj-year">{project.year}</span>
        </div>
        <span className="pj-bigletter">{letter}</span>
        {caption.length > 0 && (
          <div className="pj-caption">
            {caption.map((word) => (
              <span key={word}>{word}</span>
            ))}
            <svg className="pj-caption-arrow" viewBox="0 0 60 44" aria-hidden="true">
              <path d="M4 4c18 2 10 26 38 24" />
              <path d="M42 28l-3-8M42 28l-9 1" />
            </svg>
          </div>
        )}
        <ProjectIllustration id={project.id} />
        {project.id === "go-sheros" && (
          <span className="pj-badge pj-badge-left">
            <Crown size={14} />
          </span>
        )}
        {project.id === "sheros" && (
          <span className="pj-badge pj-badge-right">
            <LayoutDashboard size={14} />
          </span>
        )}
      </div>
      <div className="pj-card-body">
        <h3>{project.title}</h3>
        <p className="pj-summary">{project.summary}</p>
        <div className="tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <button className="pj-case">
          View case study
          <span className="pj-case-icon">
            <ExternalLink size={12} />
          </span>
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
        {(project.demo || project.link) && (
          <div className="modal-links">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
              >
                Live preview <ExternalLink size={14} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
              >
                View repository <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
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
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [formMessage, setFormMessage] = useState("");
  const [linkedInNote, setLinkedInNote] = useState("");
  const linkedInUrl = profile.social.find(
    (social) => social.label === "LinkedIn",
  )?.url;
  const githubUrl = profile.social.find(
    (social) => social.label === "GitHub",
  )?.url;
  const sherosProject = projects.find((project) => project.id === "sheros")!;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
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
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [theme]);
  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));
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
  const onLinkedInConnect = async () => {
    if (!linkedInUrl) return;
    const draft = `Hi ${profile.name.split(" ")[0]}, I came across your portfolio site and wanted to connect!`;
    try {
      await navigator.clipboard.writeText(draft);
      setLinkedInNote(
        "Opening LinkedIn — a friendly intro message has been copied to your clipboard, just paste it into the message box.",
      );
    } catch {
      setLinkedInNote(
        "Opening LinkedIn — feel free to say hello! (Your browser blocked auto-copying a suggested message.)",
      );
    }
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
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
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
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
        <Hero />
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
                <div className="skill-chips">
                  {group.items.map((item) => {
                    const Icon = skillIconMap[item] ?? Code2;
                    return (
                      <span className="skill-chip" key={item}>
                        <Icon size={13} />
                        {item}
                      </span>
                    );
                  })}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <section id="projects" className="pj-section">
          <div className="wrap">
            <div className="pj-top">
              <motion.div {...reveal} className="pj-heading-col">
                <p className="pj-tag">// 04</p>
                <h2 className="pj-title">
                  <span className="pj-white-text">PRO</span>
                  <span className="pj-yellow-text">JECTS</span>
                </h2>
                <p className="pj-flow">
                  IDEAS <ChevronRight size={12} /> CODE{" "}
                  <ChevronRight size={12} /> DEPLOY{" "}
                  <ChevronRight size={12} /> IMPACT
                </p>
                <p className="pj-desc">
                  A collection of real-world projects that showcase my
                  skills, passion and curiosity for building solutions.
                </p>
                <div className="pj-filters" aria-label="Project filters">
                  {filters.map((item) => {
                    const count =
                      item === "All"
                        ? projects.length
                        : projects.filter(
                            (project) => project.category === item,
                          ).length;
                    return (
                      <button
                        className={filter === item ? "active" : ""}
                        onClick={() => setFilter(item)}
                        key={item}
                      >
                        {item === "All" ? "All Projects" : item} ({count})
                      </button>
                    );
                  })}
                </div>
              </motion.div>
              <motion.div {...reveal} className="pj-aside">
                <p className="pj-doodle">
                  Turning Ideas
                  <br />
                  into Impact.
                </p>
                <svg className="pj-doodle-arrow" viewBox="0 0 80 90" aria-hidden="true">
                  <path d="M8 6c52 4 45 40 15 56" />
                  <path d="M23 62l-11-4M23 62l-5 11" />
                </svg>
                <div className="pj-note">
                  <span className="pj-note-icon">
                    <Box size={18} />
                  </span>
                  <p>Each project is a step in my learning journey.</p>
                  <p>
                    Different problems.
                    <br />
                    Same mindset.
                  </p>
                  <p className="pj-note-strong">
                    Build. Learn. Improve. Repeat.
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.div layout className="pj-grid">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={() => setSelected(project)}
                  key={project.id}
                />
              ))}
            </motion.div>
            <div className="pj-bottombar">
              <p>
                <span className="pj-quote">&ldquo;</span> Building solutions
                for a better tomorrow. <span className="pj-quote">&rdquo;</span>
              </p>
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noreferrer noopener">
                  Explore more on GitHub <GithubMark size={16} />
                </a>
              )}
            </div>
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
                onClick={() => setSelected(sherosProject)}
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
                ["The problem", sherosProject.problem],
                ["The solution", sherosProject.solution],
                [
                  "Architecture",
                  "Python and psutil collect system data; REST APIs expose it to a responsive web dashboard; SQLite retains local historical data.",
                ],
                ["My role", sherosProject.contribution],
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
            <div className="contact-options">
              <a
                className="contact-option"
                href={`mailto:${profile.email}`}
              >
                <span className="contact-option-icon">
                  <Mail size={17} />
                </span>
                <span className="contact-option-copy">
                  <b>Email</b>
                  <p>{profile.email}</p>
                </span>
                <ArrowUpRight size={16} />
              </a>
              {linkedInUrl && (
                <button
                  type="button"
                  className="contact-option"
                  onClick={onLinkedInConnect}
                >
                  <span className="contact-option-icon">
                    <LinkedInMark size={17} />
                  </span>
                  <span className="contact-option-copy">
                    <b>LinkedIn</b>
                    <p>Send me a message</p>
                  </span>
                  <ArrowUpRight size={16} />
                </button>
              )}
            </div>
            {linkedInNote && (
              <p className="form-message" role="status">
                {linkedInNote}
              </p>
            )}
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
