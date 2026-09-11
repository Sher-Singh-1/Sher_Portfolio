import { heroStats } from "./heroData";

export function HeroStats() {
  return (
    <div className="hero-stats">
      {heroStats.map((stat) => (
        <div className="hero-stat" key={stat.label}>
          <stat.icon size={16} />
          <div>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
