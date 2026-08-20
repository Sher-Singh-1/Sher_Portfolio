export type Project = {
  id: string; title: string; category: 'DevOps' | 'AI / ML' | 'Monitoring'; year: string; summary: string;
  problem: string; solution: string; contribution: string; technologies: string[]; features: string[]; accent: string;
}

export const profile = {
  name: 'Sher Singh', role: 'Jr. DevOps Engineer & Software Developer', company: 'Mirasys India Pvt. Ltd.',
  email: 'singhsher.me298@gmail.com',
  intro: 'I build dependable systems at the intersection of infrastructure, monitoring, AI-powered video analytics, and frontend development.',
  social: [
    { label: 'LinkedIn', url: null }, { label: 'GitHub', url: null }, { label: 'LeetCode', url: null },
  ],
}

export const experiences = [
  { company: 'Mirasys India Pvt. Ltd.', role: 'DevOps Engineer', duration: 'Jun 2025 — Present', tech: ['Linux', 'Docker', 'Grafana', 'Prometheus', 'Python'], points: ['Supported deployment, production integration, and troubleshooting for government and enterprise VMS & Video Analytics projects.', 'Worked with Linux, networking, REST APIs, service deployment, and infrastructure monitoring.', 'Contributed Python automation, YOLO-based video analytics work, and React frontend development.'] },
  { company: 'Mobiloitte Technologies India Pvt. Ltd.', role: 'Software Developer Intern', duration: 'Jan 2025 — Mar 2025', tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Figma'], points: ['Collaborated on a dynamic e-commerce website using React, HTML, CSS, and JavaScript.', 'Built responsive, user-friendly interfaces and translated Figma designs into functional components.'] },
]

export const projects: Project[] = [
  { id: 'sheros', title: 'SHEROS', category: 'Monitoring', year: '2025', accent: 'lime', summary: 'Cross-platform system health monitoring with a local dashboard and SQLite-backed history.', problem: 'System health signals can be hard to track consistently across Windows and Linux machines.', solution: 'A local monitoring application that exposes health metrics through REST APIs and presents them in a responsive dashboard.', contribution: 'Built the cross-platform monitoring workflow, dashboard, local storage, threshold alerts, and environment setup automation.', technologies: ['Python', 'psutil', 'SQLite', 'REST API', 'Shell', 'Windows', 'Linux'], features: ['CPU, memory, disk, network, uptime & process monitoring', 'SQLite storage with configurable retention', 'Threshold-based alerts', 'Automated Windows & Linux setup'] },
  { id: 'fire', title: 'Fire Detection System', category: 'AI / ML', year: '2025', accent: 'orange', summary: 'AI-powered fire-event detection for surveillance environments with operational monitoring.', problem: 'Surveillance workflows need dependable detection and visibility into system health.', solution: 'A custom YOLO model detects fire events while Grafana and Prometheus surface operational signals.', contribution: 'Trained custom YOLO detection models and helped integrate monitoring tools into the VMS environment.', technologies: ['Python', 'YOLOv5', 'YOLOE', 'Docker', 'Grafana', 'Prometheus', 'Netdata'], features: ['Real-time fire event detection', 'Custom AI model training', 'Machine health dashboard', 'VMS monitoring integration'] },
  { id: 'vms', title: 'VMS & Video Analytics', category: 'DevOps', year: '2025 — Present', accent: 'violet', summary: 'Deployment, integration, production support, and troubleshooting for enterprise video systems.', problem: 'Enterprise VMS and video analytics projects need reliable deployment and fast production support.', solution: 'Hands-on Linux, Docker, networking, API, and observability practices across project environments.', contribution: 'Supported deployment, integration, production issue resolution, monitoring, and frontend contributions.', technologies: ['Linux', 'Docker', 'REST APIs', 'Networking', 'Grafana', 'Prometheus'], features: ['Server deployment', 'Production troubleshooting', 'Infrastructure observability', 'Video analytics integration'] },
]

export const skillGroups = [
  { name: 'Programming', items: ['Python', 'Java', 'JavaScript', 'SQL', 'Shell Scripting'] },
  { name: 'Development', items: ['React.js', 'Node.js', 'HTML5', 'CSS3', 'REST APIs'] },
  { name: 'DevOps & Monitoring', items: ['Linux', 'Docker', 'Grafana', 'Prometheus', 'Netdata', 'Server Deployment', 'Automation'] },
  { name: 'AI & Tools', items: ['YOLOv5', 'YOLOE', 'AI Model Training', 'SQLite', 'Git', 'GitHub', 'Figma'] },
]

export const education = [
  { degree: 'Master of Computer Applications', school: 'Maha Rishi Dayanand University, Rohtak, Haryana', duration: 'Aug 2026 — May 2028 (Expected)' },
  { degree: 'Bachelor of Computer Applications', school: 'Maha Rishi Dayanand University, Rohtak, Haryana', duration: 'Aug 2022 — May 2025 · CGPA 7.0' },
]

export const achievements = ['College Level Hackathon Qualified', 'CSS | JavaScript — HackerRank', 'Data Analytics Certified — Anudip Foundation', 'Mirasys VMS Certified — Mirasys India']
