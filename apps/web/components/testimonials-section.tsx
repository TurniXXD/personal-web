import type { Locale } from "@/lib/content";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Add verified client quotes here when permission to publish them is available.
const testimonials: Record<Locale, Testimonial[]> = { cs: [], en: [] };

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const items = testimonials[locale];
  if (items.length === 0) return null;

  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{locale === "cs" ? "ZKUŠENOSTI KLIENTŮ" : "CLIENT FEEDBACK"}</p>
            <h2 id="testimonials-title">{locale === "cs" ? "Co říkají klienti" : "What clients say"}</h2>
          </div>
        </div>
        <div className="testimonials-grid">
          {items.map((item) => (
            <figure className="testimonial-card" key={item.name}>
              <blockquote>{item.quote}</blockquote>
              <figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
