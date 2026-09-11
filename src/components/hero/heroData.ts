import type { ComponentType } from "react";
import {
  Building2,
  Cloud,
  Cpu,
  Landmark,
  Layers,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FaAws } from "react-icons/fa6";
import { siGrafana, siKubernetes } from "simple-icons";

export type TechIcon =
  | { kind: "lucide"; icon: LucideIcon }
  | { kind: "brand"; icon: { path: string } }
  | { kind: "component"; icon: ComponentType<{ size?: number }> };

export type WorldNode = {
  id: string;
  title: string;
  color: string;
  lines: string[];
  top: string;
  left: string;
  icon: TechIcon;
};

/**
 * AWS has no Simple Icons mark (Amazon has it removed for trademark reasons) —
 * Font Awesome's brand set is used for that one node only, everything else
 * below is sourced from Simple Icons.
 */
export const worldNodes: WorldNode[] = [
  {
    id: "aws",
    title: "AWS",
    color: "#E4B928",
    lines: ["EC2 · S3 · RDS", "VPC · IAM · CloudWatch"],
    top: "8%",
    left: "64%",
    icon: { kind: "component", icon: FaAws },
  },
  {
    id: "cicd",
    title: "CI/CD Pipeline",
    color: "#E4B928",
    lines: ["Automate · Test · Deploy", "Jenkins · Docker · Kubernetes", "GitHub Actions"],
    top: "23%",
    left: "3%",
    icon: { kind: "lucide", icon: Workflow },
  },
  {
    id: "k8s",
    title: "Kubernetes",
    color: "#E4B928",
    lines: ["Containerized", "Scalable Infrastructure"],
    top: "48%",
    left: "-2%",
    icon: { kind: "brand", icon: siKubernetes },
  },
  {
    id: "monitoring",
    title: "Monitoring",
    color: "#E4B928",
    lines: ["Grafana · Prometheus", "Alerting · Observability"],
    top: "70%",
    left: "6%",
    icon: { kind: "brand", icon: siGrafana },
  },
  {
    id: "ai",
    title: "AI / ML",
    color: "#E4B928",
    lines: ["YOLOv5 · Computer Vision", "Real-time Analytics"],
    top: "83%",
    left: "34%",
    icon: { kind: "lucide", icon: Cpu },
  },
  {
    id: "government",
    title: "Government",
    color: "#E4B928",
    lines: ["Contributed to", "government-level projects"],
    top: "27%",
    left: "82%",
    icon: { kind: "lucide", icon: Landmark },
  },
  {
    id: "enterprise",
    title: "Enterprise",
    color: "#E4B928",
    lines: ["Enterprise-grade", "systems & solutions"],
    top: "52%",
    left: "86%",
    icon: { kind: "lucide", icon: Building2 },
  },
];

export const heroStats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Layers, value: "4+", label: "Projects" },
  { icon: Cloud, value: "AWS", label: "Cloud Experience" },
  { icon: Landmark, value: "Govt. & Enterprise", label: "Contributions" },
  { icon: Zap, value: "∞", label: "Always Learning" },
];
