import Link from "next/link";
import type { ReactNode } from "react";

type ContentCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  tags?: readonly string[];
  accentTags?: readonly string[];
  action?: ReactNode;
  href?: string;
  id?: string;
  className?: string;
};

export const ContentCard = ({
  title,
  description,
  icon,
  tags,
  accentTags,
  action,
  href,
  id,
  className,
}: ContentCardProps) => {
  const classes = [
    "content-card",
    href ? "content-card--interactive" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className="content-card__top">
        <h3>{title}</h3>
        <span className="content-card__icon">{icon}</span>
      </div>
      <p className="content-card__description">{description}</p>
      {((tags && tags.length > 0) || (accentTags && accentTags.length > 0)) && (
        <div className="content-card__tags">
          {tags?.map((tag) => (
            <span className="content-card__tag" key={tag}>
              {tag}
            </span>
          ))}
          {accentTags?.map((tag) => (
            <span
              className="content-card__tag content-card__tag--accent"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {action && <span className="content-card__action">{action}</span>}
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href} id={id}>
        {content}
      </Link>
    );
  }

  return (
    <article className={classes} id={id}>
      {content}
    </article>
  );
};
