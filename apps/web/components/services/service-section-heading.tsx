import { ScrollReveal } from "@/components/shared/scroll-reveal";

type ServiceSectionHeadingProps = {
  id: string;
  content: {
    title: string;
    description?: string;
  };
};

export function ServiceSectionHeading({
  id,
  content,
}: ServiceSectionHeadingProps) {
  return (
    <ScrollReveal className="service-detail-heading">
      <h2 id={id}>{content.title}</h2>
      {content.description ? <p>{content.description}</p> : null}
    </ScrollReveal>
  );
}
