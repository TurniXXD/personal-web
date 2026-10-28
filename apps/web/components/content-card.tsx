import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

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
    "content-card group relative min-w-0 gap-0 rounded-[1.35rem] border-[#dfe4fb] bg-white p-[1.35rem] text-inherit shadow-[0_16px_40px_rgba(47,59,125,0.045)] max-[600px]:p-[1.1rem]",
    href &&
      "content-card--interactive cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[#5f6cff45] focus-visible:outline-offset-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {href && (
        <span className="content-card__watermark" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="content-card__top flex items-center justify-between gap-4">
        <h3 className="m-0 text-[1.18rem] font-normal leading-[1.3] tracking-[-0.04em]">
          {title}
        </h3>
        <span className="content-card__icon grid size-[2.65rem] shrink-0 place-items-center rounded-[0.8rem] bg-[#eef0ff] text-primary transition-[background-color,color,transform] duration-500">
          {icon}
        </span>
      </div>
      <p className="content-card__description mb-0 mt-[1.2rem] text-[0.82rem] leading-[1.7] text-[#596484] max-[600px]:mt-5">
        {description}
      </p>
      {((tags && tags.length > 0) || (accentTags && accentTags.length > 0)) && (
        <div className="content-card__tags mt-auto flex flex-wrap gap-[0.4rem] pt-5 max-[600px]:hidden">
          {tags?.map((tag) => (
            <span
              className="content-card__tag rounded-full bg-[#f0f2ff] px-[0.55rem] py-[0.35rem] text-[0.68rem] font-bold text-primary"
              key={tag}
            >
              {tag}
            </span>
          ))}
          {accentTags?.map((tag) => (
            <span
              className="content-card__tag content-card__tag--accent rounded-full border border-white/30 bg-[linear-gradient(135deg,#5468ff,#8a5cff)] px-[0.55rem] py-[0.35rem] font-mono text-[0.68rem] font-bold tracking-[0.08em] text-white shadow-[0_0.35rem_0.9rem_rgba(94,88,255,0.2)]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {action && (
        <span className="content-card__action mt-auto inline-flex min-h-4 items-center gap-[0.35rem] self-start pt-4 text-[0.72rem] font-extrabold text-[#4654d4]">
          {action}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Card asChild className={classes}>
        <Link href={href} id={id}>
          {content}
        </Link>
      </Card>
    );
  }

  return (
    <Card asChild className={classes}>
      <article id={id}>{content}</article>
    </Card>
  );
};
