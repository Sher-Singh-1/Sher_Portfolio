import { ChevronRight } from "lucide-react";
import { HeroGlobe } from "./HeroGlobe";
import { TechnologyNode } from "./TechnologyNode";
import { worldNodes } from "./heroData";

export function OrbitalSystem() {
  return (
    <div className="hero-orbital" aria-hidden="true">
      <p className="hero-microtag">// DEVOPS × CLOUD × AI × IMPACT</p>
      <div className="hero-globe-stage">
        <svg
          className="hero-globe-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {worldNodes.map((node) => (
            <line
              key={node.id}
              x1="50"
              y1="50"
              x2={parseFloat(node.left) + 3}
              y2={parseFloat(node.top) + 3}
            />
          ))}
        </svg>
        <HeroGlobe />
        {worldNodes.map((node) => (
          <TechnologyNode
            key={node.id}
            node={node}
            style={{ top: node.top, left: node.left }}
          />
        ))}
      </div>
      <p className="hero-flow">
        IDEAS <ChevronRight size={11} /> CODE <ChevronRight size={11} />{" "}
        DEPLOY <ChevronRight size={11} /> IMPACT
      </p>
      <p className="hero-doodle">
        Same Student.
        <br />
        Bigger Dreams.
      </p>
    </div>
  );
}
