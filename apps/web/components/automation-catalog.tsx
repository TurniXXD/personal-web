"use client";

import { useMemo, useState } from "react";
import { AutomationIcon } from "@/components/automation-icon";
import {
  type AutomationCategoryId,
  type AutomationExample,
  type AutomationPageCopy,
} from "@/lib/automation-content";
import type { Locale } from "@/lib/content";

type AutomationCatalogProps = {
  locale: Locale;
  examples: AutomationExample[];
  content: AutomationPageCopy["catalog"];
};

const initialVisibleCount = 9;

export const AutomationCatalog = ({
  locale,
  examples,
  content,
}: AutomationCatalogProps) => {
  const [activeCategory, setActiveCategory] = useState<
    AutomationCategoryId | "all"
  >("all");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const categoryIds = Object.keys(content.categories) as AutomationCategoryId[];
  const filteredExamples = useMemo(
    () =>
      activeCategory === "all"
        ? examples
        : examples.filter((example) => example.category === activeCategory),
    [activeCategory, examples],
  );
  const visibleExamples =
    activeCategory === "all"
      ? filteredExamples.slice(0, visibleCount)
      : filteredExamples;

  const selectCategory = (category: AutomationCategoryId | "all") => {
    setActiveCategory(category);
    setVisibleCount(initialVisibleCount);
  };

  return (
    <>
      <div
        className="automation-filters"
        aria-label={
          locale === "cs" ? "Kategorie automatizací" : "Automation categories"
        }
      >
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => selectCategory("all")}
        >
          {content.all}
        </button>
        {categoryIds.map((category) => (
          <button
            type="button"
            key={category}
            aria-pressed={activeCategory === category}
            onClick={() => selectCategory(category)}
          >
            {content.categories[category]}
          </button>
        ))}
      </div>

      <div className="automation-catalog__grid">
        {visibleExamples.map((example) => (
          <article className="automation-example" key={example.id}>
            <div className="automation-example__top">
              <span className="automation-example__icon">
                <AutomationIcon name={example.icon} size={23} />
              </span>
            </div>
            <span className="automation-example__category">
              {content.categories[example.category]}
            </span>
            <h3>{example.title}</h3>
            <p>{example.description}</p>
          </article>
        ))}
      </div>

      {activeCategory === "all" && visibleCount < filteredExamples.length && (
        <button
          className="automation-catalog__more"
          type="button"
          onClick={() => setVisibleCount((count) => count + 6)}
        >
          {content.showMore}
        </button>
      )}
    </>
  );
};
