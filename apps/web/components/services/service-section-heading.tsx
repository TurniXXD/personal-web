import { ScrollReveal } from "@/components/shared/scroll-reveal";

type ServiceSectionHeadingProps = {
  id: string;
  content: {
    title: string;
    eyebrow?: string;
    description?: string;
  };
};

export function ServiceSectionHeading({
  id,
  content,
}: ServiceSectionHeadingProps) {
  return (
    <ScrollReveal className="service-detail-heading">
      {content.eyebrow ? <p className="eyebrow">{content.eyebrow}</p> : null}
      <h2 id={id}>{content.title}</h2>
      {content.description ? <p>{content.description}</p> : null}
    </ScrollReveal>
  );
}
