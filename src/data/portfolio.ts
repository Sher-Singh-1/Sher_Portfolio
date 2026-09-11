import robotIcon from '../assets/icons3d/robot.png'
import barChartIcon from '../assets/icons3d/bar_chart.png'
import fireIcon from '../assets/icons3d/fire.png'
import satelliteIcon from '../assets/icons3d/satellite_antenna.png'

export type Project = {
  id: string; title: string; category: 'DevOps' | 'AI / ML' | 'Monitoring' | 'Web Apps'; year: string; summary: string;
  problem: string; solution: string; contribution: string; technologies: string[]; features: string[]; accent: string; icon: string; link?: string; demo?: string;
}

export const profile = {
  name: 'Sher Singh', role: 'Jr. DevOps Engineer & Software Developer', company: 'Mirasys India Pvt. Ltd.',
  email: 'singhsher.me298@gmail.com',
  intro: 'I build dependable systems at the intersection of infrastructure, monitoring, AI-powered video analytics, and frontend development.',
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sher-singh-723203244' },
    { label: 'GitHub', url: 'https://github.com/sher-singh-1' },
    { label: 'LeetCode', url: 'https://leetcode.com/u/Sher_1122/' },
  ],
}

export const experiences = [
  { company: 'Mirasys India Pvt. Ltd.', role: 'DevOps Engineer', duration: 'Jun 2025 — Present', tech: ['Linux', 'Docker', 'Grafana', 'Prometheus', 'Python'], points: ['Supported deployment, production integration, and troubleshooting for government and enterprise VMS & Video Analytics projects.', 'Worked with Linux, networking, REST APIs, service deployment, and infrastructure monitoring.', 'Contributed Python automation, YOLO-based video analytics work, and React frontend development.'] },
  { company: 'Mobiloitte Technologies India Pvt. Ltd.', role: 'Software Developer Intern', duration: 'Jan 2025 — Mar 2025', tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Figma'], points: ['Collaborated on a dynamic e-commerce website using React, HTML, CSS, and JavaScript.', 'Built responsive, user-friendly interfaces and translated Figma designs into functional components.'] },
]

export const projects: Project[] = [
  { id: 'go-sheros', title: 'Go Sheros', category: 'Web Apps', year: '2026', accent: 'gold2', icon: robotIcon, link: 'https://github.com/Sher-Singh-1/Go-SHEROS', demo: 'https://go-sheros.vercel.app', summary: 'AI-powered goal planner and productivity coach — plan, do, track, and improve.', problem: 'Turning a big goal into a realistic, trackable plan usually takes manual effort and constant upkeep.', solution: 'A Next.js app that decomposes goals into milestones and tasks, backed by an AI coach (Claude, with a deterministic fallback) plus focus timers, habits, streaks, and analytics.', contribution: 'Built the full-stack MVP end-to-end: auth, goal-decomposition engine, AI coach integration, streak tracking, and analytics dashboard.', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Claude AI', 'Recharts'], features: ['AI-assisted goal decomposition into milestones & tasks', 'Focus timer, habits & streak tracking', 'Email-OTP auth with JWT sessions', 'Progress analytics dashboard'] },
  { id: 'fire', title: 'Fire Detection System', category: 'AI / ML', year: '2025', accent: 'orange', icon: fireIcon, summary: 'AI-powered fire-event detection for surveillance environments with operational monitoring.', problem: 'Surveillance workflows need dependable detection and visibility into system health.', solution: 'A custom YOLO model detects fire events while Grafana and Prometheus surface operational signals.', contribution: 'Trained custom YOLO detection models and helped integrate monitoring tools into the VMS environment.', technologies: ['Python', 'YOLOv5', 'YOLOE', 'Docker', 'Grafana', 'Prometheus', 'Netdata'], features: ['Real-time fire event detection', 'Custom AI model training', 'Machine health dashboard', 'VMS monitoring integration'] },
  { id: 'vms', title: 'VMS & Video Analytics', category: 'DevOps', year: '2025 — Present', accent: 'violet', icon: satelliteIcon, summary: 'Field deployment and production support for government & enterprise VMS/video-analytics sites.', problem: 'Government and enterprise video-surveillance rollouts span AWS, on-prem VMs, and physical servers — each site needs reliable deployment, integration, and fast production support.', solution: 'Deploy and support Mirasys VMS & video analytics across mixed AWS, Linux, VM, and physical-server environments, including enterprise analytics deployments running DIP software on both cloud and on-prem infrastructure.', contribution: 'Handled end-to-end field deployment, integration, and troubleshooting for government sites — GAIL Jhabua, HPHC, Bilaspur Smart City, FSL Mumbai Surveillance, and Moradabad Smart City — plus enterprise sites like the Metso warehouse.', technologies: ['AWS', 'Linux', 'VM & Physical Servers', 'DIP Software', 'REST APIs', 'Networking', 'Grafana', 'Prometheus'], features: ['Government deployments — GAIL Jhabua, HPHC, Bilaspur Smart City, FSL Mumbai Surveillance, Moradabad Smart City', 'Enterprise deployment — Metso warehouse analytics VMS & DIP software', 'AWS, Linux, VM & physical-server infrastructure', 'Production troubleshooting & observability'] },
  { id: 'sheros', title: 'SHEROS', category: 'Monitoring', year: '2025', accent: 'lime', icon: barChartIcon, summary: 'Cross-platform system health monitoring with a local dashboard and SQLite-backed history.', problem: 'System health signals can be hard to track consistently across Windows and Linux machines.', solution: 'A local monitoring application that exposes health metrics through REST APIs and presents them in a responsive dashboard.', contribution: 'Built the cross-platform monitoring workflow, dashboard, local storage, threshold alerts, and environment setup automation.', technologies: ['Python', 'psutil', 'SQLite', 'REST API', 'Shell', 'Windows', 'Linux'], features: ['CPU, memory, disk, network, uptime & process monitoring', 'SQLite storage with configurable retention', 'Threshold-based alerts', 'Automated Windows & Linux setup'] },
]

export type SkillGroup = {
  id: string; name: string; tag: string; level: number; description: string; items: string[];
}

export const skillGroups: SkillGroup[] = [
  { id: 'programming', name: 'Programming', tag: 'Core', level: 85, description: 'Write clean, efficient code to solve real-world problems.', items: ['Python', 'Java', 'JavaScript', 'SQL', 'Shell Scripting'] },
  { id: 'development', name: 'Development', tag: 'Frontend & Backend', level: 80, description: 'Build modern, responsive, user-friendly web applications.', items: ['React.js', 'Node.js', 'HTML5', 'CSS3', 'REST APIs'] },
  { id: 'devops-cloud', name: 'DevOps & Cloud', tag: 'Infrastructure', level: 90, description: 'Automate, deploy, and scale infrastructure for reliable systems.', items: ['Linux', 'Docker', 'AWS', 'CI/CD Pipeline', 'Server Deployment', 'Automation'] },
  { id: 'monitoring', name: 'Monitoring & Observability', tag: 'Reliability', level: 85, description: 'Keep systems visible, alertable, and easy to operate.', items: ['Grafana', 'Prometheus', 'Netdata'] },
  { id: 'ai', name: 'AI & Computer Vision', tag: 'AI / ML', level: 75, description: 'Apply AI and computer vision to real-time detection and analytics.', items: ['YOLOv5', 'YOLOE', 'AI Model Training'] },
  { id: 'tools', name: 'Tools & Collaboration', tag: 'Workflow', level: 80, description: 'Version control, data, and design tools that keep projects moving.', items: ['SQLite', 'Git', 'GitHub', 'Figma'] },
]

export type Education = {
  degree: string; school: string; duration: string; years: string; expected: boolean;
  description: string; tags: string[];
}

export const education: Education[] = [
  {
    degree: 'Master of Computer Applications', school: 'Maha Rishi Dayanand University, Rohtak, Haryana',
    duration: 'Aug 2026 — May 2028 (Expected)', years: '2026 – 2028', expected: true,
    description: 'Deepening my knowledge in software development, system design, and emerging technologies.',
    tags: ['Advanced Programming', 'System Design', 'Cloud & DevOps', 'AI & Data Analytics'],
  },
  {
    degree: 'Bachelor of Computer Applications', school: 'Maha Rishi Dayanand University, Rohtak, Haryana',
    duration: 'Aug 2022 — May 2025 · CGPA 7.0', years: '2022 – 2025', expected: false,
    description: 'Built a strong foundation in computer science, programming, and problem-solving.',
    tags: ['Programming', 'Data Structures', 'Web Development', 'Database Management'],
  },
]

export type Achievement = { title: string; subtitle: string }

export const achievements: Achievement[] = [
  { title: 'College Level Hackathon', subtitle: 'Qualified' },
  { title: 'CSS | JavaScript', subtitle: 'HackerRank' },
  { title: 'Data Analytics Certified', subtitle: 'Anudip Foundation' },
  { title: 'Mirasys VMS Certified', subtitle: 'Mirasys India' },
]
