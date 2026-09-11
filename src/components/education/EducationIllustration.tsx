import { GraduationCap } from "lucide-react";

const spines = ["Learn", "Build", "Grow", "Repeat"];

export function EducationIllustration() {
  return (
    <div className="ed-illustration" aria-hidden="true">
      <div className="ed-illustration-glow" />
      <GraduationCap className="ed-cap" size={72} strokeWidth={1.4} />
      <div className="ed-books">
        {spines.map((label) => (
          <div className="ed-book" key={label}>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <span className="ed-spark ed-spark-a" />
      <span className="ed-spark ed-spark-b" />
      <span className="ed-spark ed-spark-c" />
      <p className="ed-caption">Knowledge compounds.</p>
    </div>
  );
}
