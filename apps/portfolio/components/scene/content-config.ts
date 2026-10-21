type Translator = (key: string) => string;

export const getAboutCards = (t: Translator) =>
  [
    {
      title: t("cards.developer.title"),
      summary: t("cards.developer.summary"),
      accent: "violet",
    },
    {
      title: t("cards.technologies.title"),
      summary: t("cards.technologies.summary"),
      accent: "cyan",
    },
    {
      title: t("cards.focus.title"),
      summary: t("cards.focus.summary"),
      accent: "blue",
    },
  ] as const;

export const companyLinks = {
  appio: {
    href: "https://www.appio.dev/en",
  },
  proRocketeers: {
    href: "https://www.prorocketeers.com",
  },
} as const;
