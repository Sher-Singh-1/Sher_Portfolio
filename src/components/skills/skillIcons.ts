import {
  Bot,
  BrainCircuit,
  Code2,
  Database,
  ScanEye,
  Server,
  Webhook,
  Workflow,
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

export const skillIconMap: Record<string, LucideIcon | IconType> = {
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

export const skillIconFallback = Code2;
