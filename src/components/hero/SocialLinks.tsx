type Social = { label: string; url: string };

export function SocialLinks({ items }: { items: Social[] }) {
  return (
    <div className="hero-social-row">
      {items.map((social) => (
        <a
          href={social.url}
          target="_blank"
          rel="noreferrer noopener"
          className="hero-social-link"
          key={social.label}
        >
          {social.label} <span>↗</span>
        </a>
      ))}
    </div>
  );
}
