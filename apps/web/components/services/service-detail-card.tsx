import { Check } from "lucide-react";

type ServiceDetailCardProps = {
  title: string;
  description: string;
  index?: number;
  note?: string;
};

export function ServiceDetailCard({
  title,
  description,
  index,
  note,
}: ServiceDetailCardProps) {
  return (
    <article className="service-detail-card">
      {index === undefined ? (
        <Check size={18} aria-hidden="true" />
      ) : (
        <span>{String(index).padStart(2, "0")}</span>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {note ? <small>{note}</small> : null}
    </article>
  );
}
