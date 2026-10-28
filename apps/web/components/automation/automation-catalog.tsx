"use client";

import { useMemo, useState } from "react";
import { AutomationIcon } from "@/components/automation-icon";
import { ContentCard } from "@/components/content-card";
import { Button } from "@/components/ui/button";
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
        : examples.filter((example) =>
            example.categories.includes(activeCategory),
          ),
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
        className="automation-filters mt-10 flex flex-wrap gap-[0.55rem]"
        aria-label={
          locale === "cs" ? "Kategorie automatizací" : "Automation categories"
        }
      >
        <Button
          type="button"
          variant="outline"
          className="h-auto rounded-full border-[#dce2fa] bg-white px-[0.85rem] py-[0.65rem] text-[0.76rem] font-bold text-[#4c5879] shadow-none transition-colors hover:border-primary hover:bg-[#f2f3ff] hover:text-primary aria-pressed:border-primary aria-pressed:bg-[#f2f3ff] aria-pressed:text-primary"
          aria-pressed={activeCategory === "all"}
          onClick={() => selectCategory("all")}
        >
          {content.all}
        </Button>
        {categoryIds.map((category) => (
          <Button
            type="button"
            variant="outline"
            className="h-auto rounded-full border-[#dce2fa] bg-white px-[0.85rem] py-[0.65rem] text-[0.76rem] font-bold text-[#4c5879] shadow-none transition-colors hover:border-primary hover:bg-[#f2f3ff] hover:text-primary aria-pressed:border-primary aria-pressed:bg-[#f2f3ff] aria-pressed:text-primary"
            key={category}
            aria-pressed={activeCategory === category}
            onClick={() => selectCategory(category)}
          >
            {content.categories[category]}
          </Button>
        ))}
      </div>

      <div className="automation-catalog__grid">
        {visibleExamples.map((example) => (
          <ContentCard
            className="automation-example"
            key={example.id}
            title={example.title}
            description={example.description}
            icon={<AutomationIcon name={example.icon} size={20} />}
            tags={example.categories.map(
              (category) => content.categories[category],
            )}
            accentTags={example.usesAi ? ["AI"] : undefined}
          />
        ))}
      </div>

      {activeCategory === "all" && visibleCount < filteredExamples.length && (
        <Button
          variant="outline"
          className="automation-catalog__more mx-auto mt-6 block h-auto rounded-full border-[#dce2fa] bg-white px-4 py-[0.8rem] text-[0.76rem] font-bold text-[#4c5879] shadow-none transition-colors hover:border-primary hover:bg-[#f2f3ff] hover:text-primary"
          type="button"
          onClick={() => setVisibleCount((count) => count + 6)}
        >
          {content.showMore}
        </Button>
      )}
    </>
  );
};
