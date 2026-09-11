import type { LucideIcon } from "lucide-react";
import type { SkillGroup } from "../../data/portfolio";
import { skillIconMap, skillIconFallback } from "./skillIcons";

export function SkillCard({
  group,
  index,
  icon: Icon,
}: {
  group: SkillGroup;
  index: number;
  icon: LucideIcon;
}) {
  return (
    <article className="sk-card">
      <div className="sk-card-top">
        <span className="sk-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="sk-tag">{group.tag}</span>
      </div>
      <span className="sk-icon">
        <Icon size={22} />
      </span>
      <div className="sk-name-row">
        <h3>{group.name}</h3>
        <span className="sk-level">{group.level}%</span>
      </div>
      <div className="sk-bar">
        <div className="sk-bar-fill" style={{ width: `${group.level}%` }} />
      </div>
      <p className="sk-desc">{group.description}</p>
      <div className="sk-chips">
        {group.items.map((item) => {
          const ItemIcon = skillIconMap[item] ?? skillIconFallback;
          return (
            <span className="sk-chip" key={item} title={item}>
              <ItemIcon size={16} />
            </span>
          );
        })}
      </div>
    </article>
  );
}
