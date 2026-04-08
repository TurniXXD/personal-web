import type { RouteItem, SectionId } from "@/lib/site-data";

export type TerminalResult =
  | { type: "focus"; target: SectionId; output: string[] }
  | { type: "output"; output: string[] }
  | { type: "clear"; output: string[] };

type Translator = (key: string, values?: Record<string, string | number>) => string;

const baseRouteAliases = new Map([
  ["home", "about"],
  ["index", "about"],
] as const);

const getTerminalHelp = (t: Translator) => [
  t("help.open"),
  t("help.cd"),
  t("help.ls"),
  t("help.cat"),
  t("help.list"),
  t("help.help"),
  t("help.clear"),
];

const getPageMarkdown = (t: Translator): Record<SectionId, string[]> => ({
  about: [
    t("pageMarkdown.about.title"),
    "",
    t("pageMarkdown.about.body"),
    "",
    t("pageMarkdown.about.focusTitle"),
    t("pageMarkdown.about.focus1"),
    t("pageMarkdown.about.focus2"),
    t("pageMarkdown.about.focus3"),
  ],
  work: [
    t("pageMarkdown.work.title"),
    "",
    t("pageMarkdown.work.body"),
    "",
    t("pageMarkdown.work.includesTitle"),
    t("pageMarkdown.work.include1"),
    t("pageMarkdown.work.include2"),
    t("pageMarkdown.work.include3"),
    t("pageMarkdown.work.include4"),
    t("pageMarkdown.work.include5"),
  ],
  capabilities: [
    t("pageMarkdown.capabilities.title"),
    "",
    t("pageMarkdown.capabilities.section1"),
    t("pageMarkdown.capabilities.s1i1"),
    t("pageMarkdown.capabilities.s1i2"),
    t("pageMarkdown.capabilities.s1i3"),
    "",
    t("pageMarkdown.capabilities.section2"),
    t("pageMarkdown.capabilities.s2i1"),
    t("pageMarkdown.capabilities.s2i2"),
    t("pageMarkdown.capabilities.s2i3"),
    "",
    t("pageMarkdown.capabilities.section3"),
    t("pageMarkdown.capabilities.s3i1"),
    t("pageMarkdown.capabilities.s3i2"),
  ],
  contact: [
    t("pageMarkdown.contact.title"),
    "",
    t("pageMarkdown.contact.line1"),
    t("pageMarkdown.contact.line2"),
    "",
    t("pageMarkdown.contact.formTitle"),
    t("pageMarkdown.contact.formBody"),
  ],
});

const getRouteAliases = (routeItems: RouteItem[]) =>
  new Map([
    ...baseRouteAliases,
    ...routeItems.flatMap((item) => {
      const key = item.title.toLowerCase();
      const slug = item.id;

      return [
        [key, item.id],
        [slug, item.id],
      ] as const;
    }),
  ]);

const getCommandSuggestions = (routeItems: RouteItem[], t: Translator) => [
  ...getTerminalHelp(t).map((command) => ({ label: command, value: command })),
  ...routeItems.flatMap((item) => [
    {
      label: `${item.command}  ->  ${item.summary}`,
      value: item.command,
    },
    {
      label: `cd ${item.title.toLowerCase()}  ->  ${item.summary}`,
      value: `cd ${item.title.toLowerCase()}`,
    },
    {
      label: `ls ${item.title.toLowerCase()}  ->  ${t("suggestions.file", {
        title: item.title.toLowerCase(),
      })}`,
      value: `ls ${item.title.toLowerCase()}`,
    },
    {
      label: `cat ${item.id}.md  ->  ${t("suggestions.inspect", {
        title: item.title.toLowerCase(),
      })}`,
      value: `cat ${item.id}.md`,
    },
  ]),
];

export const getInitialTerminalHistory = (t: Translator) => [
  {
    id: 1,
    command: "help",
    output: [t("initial.line1"), t("initial.line2")],
  },
];

export const getTerminalSuggestions = (
  input: string,
  routeItems: RouteItem[],
  t: Translator,
) => {
  const value = input.trim().toLowerCase();

  if (!value) {
    return [];
  }

  const commandSuggestions = getCommandSuggestions(routeItems, t);
  const rankedSuggestions = commandSuggestions.filter((suggestion) => {
    const label = suggestion.label.toLowerCase();
    const suggestionValue = suggestion.value.toLowerCase();

    return suggestionValue.startsWith(value) || label.includes(value);
  });

  return Array.from(
    new Map(rankedSuggestions.map((suggestion) => [suggestion.value, suggestion])).values(),
  ).slice(0, 8);
};

export const executeTerminalCommand = (
  rawInput: string,
  routeItems: RouteItem[],
  t: Translator,
): TerminalResult => {
  const input = rawInput.trim().toLowerCase();
  const terminalHelp = getTerminalHelp(t);
  const pageMarkdown = getPageMarkdown(t);
  const aliases = getRouteAliases(routeItems);
  const fileAliases = new Map<string, SectionId>(
    routeItems.map((item) => [`${item.id}.md`, item.id] as const),
  );

  if (!input) {
    return { type: "output", output: [t("awaitingInput")] };
  }

  if (input === "help") {
    return {
      type: "output",
      output: [t("availableCommands"), ...terminalHelp.map((command) => `- ${command}`)],
    };
  }

  if (input === "list") {
    return {
      type: "output",
      output: routeItems.map((item) =>
        t("listLabel", { title: item.title, id: item.id }),
      ),
    };
  }

  if (input === "clear") {
    return { type: "clear", output: [] };
  }

  const [command, ...args] = input.split(/\s+/);
  const target = args.join(" ").trim();

  if ((command === "open" || command === "cd") && target) {
    const section = aliases.get(target) as SectionId | undefined;

    if (!section) {
      return {
        type: "output",
        output: [t("unknownTarget", { target }), t("useList")],
      };
    }

    return {
      type: "focus",
      target: section,
      output: [t("focusCluster", { section })],
    };
  }

  if (command === "ls") {
    if (!target) {
      return {
        type: "output",
        output: routeItems.map((item) => t("fileLabel", { id: item.id })),
      };
    }

    const section = aliases.get(target) as SectionId | undefined;

    if (!section) {
      return {
        type: "output",
        output: [t("unknownTarget", { target }), t("unknownTargetLs")],
      };
    }

    return {
      type: "output",
      output: [t("fileLabel", { id: section })],
    };
  }

  if (command === "cat") {
    if (!target) {
      return {
        type: "output",
        output: [t("catUsage")],
      };
    }

    const normalizedTarget = target.endsWith(".md") ? target : `${target}.md`;
    const section = fileAliases.get(normalizedTarget);

    if (!section) {
      return {
        type: "output",
        output: [t("unknownTarget", { target }), t("unknownTargetCat")],
      };
    }

    return {
      type: "output",
      output: pageMarkdown[section],
    };
  }

  return {
    type: "output",
    output: [t("unknownCommand", { command: rawInput }), t("typeHelp")],
  };
};
