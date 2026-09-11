import type { WorldNode } from "./heroData";

function NodeIcon({ node }: { node: WorldNode }) {
  const { icon } = node;
  if (icon.kind === "brand") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={icon.icon.path} />
      </svg>
    );
  }
  const Icon = icon.icon;
  return <Icon size={18} />;
}

export function TechnologyNode({
  node,
  style,
}: {
  node: WorldNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="hero-node" style={style}>
      <span className="hero-node-badge">
        <NodeIcon node={node} />
      </span>
      <span className="hero-node-label">
        <b>{node.title}</b>
        {node.lines.map((line) => (
          <i key={line}>{line}</i>
        ))}
      </span>
    </div>
  );
}
