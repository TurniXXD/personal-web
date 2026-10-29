import type { Locale } from "@/lib/site/content";
import { useTranslations } from "next-intl";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type TestimonialsSectionProps = { locale: Locale };

// Add verified client quotes here when permission to publish them is available.
const testimonials: Record<Locale, Testimonial[]> = { cs: [], en: [] };

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const t = useTranslations("testimonials");
  const items = testimonials[locale];
  if (items.length === 0) return null;

  return (
    <section
      className="section testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 id="testimonials-title">{t("title")}</h2>
          </div>
        </div>
        <div className="testimonials-grid">
          {items.map((item) => (
            <figure className="testimonial-card" key={item.name}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
