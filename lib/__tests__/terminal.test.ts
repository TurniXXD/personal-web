import { executeTerminalCommand, getTerminalSuggestions } from "@/lib/terminal";
import type { RouteItem } from "@/lib/site-data";

const routeItems: RouteItem[] = [
  {
    id: "about",
    title: "About",
    icon: (() => null) as unknown as RouteItem["icon"],
    summary: "About summary",
    command: "open about",
  },
  {
    id: "work",
    title: "Work",
    icon: (() => null) as unknown as RouteItem["icon"],
    summary: "Work summary",
    command: "open work",
  },
  {
    id: "capabilities",
    title: "Capabilities",
    icon: (() => null) as unknown as RouteItem["icon"],
    summary: "Capabilities summary",
    command: "open capabilities",
  },
  {
    id: "contact",
    title: "Contact",
    icon: (() => null) as unknown as RouteItem["icon"],
    summary: "Contact summary",
    command: "open contact",
  },
];

const t = (key: string, values?: Record<string, string | number>) => {
  const replacements = values ?? {};
  const map: Record<string, string> = {
    "help.open": "open <page>",
    "help.cd": "cd <page>",
    "help.ls": "ls",
    "help.cat": "cat <file.md>",
    "help.list": "list",
    "help.help": "help",
    "help.clear": "clear",
    "help.exit": "exit",
    "initial.line1": "Cluster terminal ready.",
    "initial.line2": "Type `cd about`, `cd work`, `cd capabilities`, or `cd contact`.",
    awaitingInput: "Awaiting input. Type `help` or `list`.",
    closing: "Closing terminal.",
    availableCommands: "Available commands:",
    unknownTarget: `Unknown target: ${replacements.target ?? ""}`.trim(),
    useList: "Use `list` to inspect clusters.",
    unknownTargetLs: "Use `ls` to inspect available page files.",
    unknownTargetCat: "Use `ls` to see available files.",
    catUsage: "Usage: `cat <file.md>`",
    unknownCommand: `Unknown command: ${replacements.command ?? ""}`.trim(),
    typeHelp: "Type `help` for supported commands.",
    focusCluster: `Focusing ${replacements.section ?? ""} cluster`.trim(),
    listLabel: `${replacements.title ?? ""}: cluster ${replacements.id ?? ""}`.trim(),
    fileLabel: `- ${replacements.id ?? ""}.md`.trim(),
    "pageMarkdown.about.title": "# About",
    "pageMarkdown.about.body": "About body",
    "pageMarkdown.about.focusTitle": "## Focus",
    "pageMarkdown.about.focus1": "- Product development",
    "pageMarkdown.about.focus2": "- End-to-end systems",
    "pageMarkdown.about.focus3": "- Bioinformatics and mathematical modeling",
    "pageMarkdown.work.title": "# Work",
    "pageMarkdown.work.body": "Work body",
    "pageMarkdown.work.includesTitle": "## Includes",
    "pageMarkdown.work.include1": "- Robe",
    "pageMarkdown.work.include2": "- Revizio",
    "pageMarkdown.work.include3": "- My213",
    "pageMarkdown.work.include4": "- Ondrasek",
    "pageMarkdown.work.include5": "- Kinedok",
    "pageMarkdown.capabilities.title": "# Capabilities",
    "pageMarkdown.capabilities.section1": "## Product & Design",
    "pageMarkdown.capabilities.s1i1": "- Product thinking",
    "pageMarkdown.capabilities.s1i2": "- UI/UX design",
    "pageMarkdown.capabilities.s1i3": "- Prototyping",
    "pageMarkdown.capabilities.section2": "## Development",
    "pageMarkdown.capabilities.s2i1": "- React, Next.js, TypeScript",
    "pageMarkdown.capabilities.s2i2": "- Node.js, Python, Go",
    "pageMarkdown.capabilities.s2i3": "- APIs, GraphQL, WebSockets",
    "pageMarkdown.capabilities.section3": "## Infrastructure & Data",
    "pageMarkdown.capabilities.s3i1": "- Docker, Linux, CI/CD",
    "pageMarkdown.capabilities.s3i2": "- PostgreSQL, Data modeling",
    "pageMarkdown.contact.title": "# Contact",
    "pageMarkdown.contact.line1": "- Email: contact@vantuch.dev",
    "pageMarkdown.contact.line2": "- LinkedIn, GitHub, Telegram available on page",
    "pageMarkdown.contact.formTitle": "## Form",
    "pageMarkdown.contact.formBody": "Use the contact form to send a project inquiry.",
    "suggestions.inspect": `inspect ${replacements.title ?? ""} content`.trim(),
    "suggestions.file": `show ${replacements.title ?? ""} file`.trim(),
  };

  return map[key] ?? key;
};

describe("getTerminalSuggestions", () => {
  it("returns no suggestions for blank input", () => {
    expect(getTerminalSuggestions("   ", routeItems, t)).toEqual([]);
  });

  it("suggests terminal commands that match the query", () => {
    expect(getTerminalSuggestions("he", routeItems, t)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "help",
          value: "help",
        }),
      ]),
    );
  });

  it("suggests route commands for matching section queries", () => {
    expect(getTerminalSuggestions("wor", routeItems, t)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "open work",
        }),
      ]),
    );
  });

  it("caps the suggestion list", () => {
    expect(getTerminalSuggestions("o", routeItems, t)).toHaveLength(8);
  });
});

describe("executeTerminalCommand", () => {
  it("returns a prompt for empty input", () => {
    expect(executeTerminalCommand("   ", routeItems, t)).toEqual({
      type: "output",
      output: ["Awaiting input. Type `help` or `list`."],
    });
  });

  it("returns the help output", () => {
    expect(executeTerminalCommand("help", routeItems, t)).toEqual(
      expect.objectContaining({
        type: "output",
        output: expect.arrayContaining(["Available commands:", "- help", "- list"]),
      }),
    );
  });

  it("lists the available clusters", () => {
    expect(executeTerminalCommand("list", routeItems, t)).toEqual({
      type: "output",
      output: [
        "About: cluster about",
        "Work: cluster work",
        "Capabilities: cluster capabilities",
        "Contact: cluster contact",
      ],
    });
  });

  it("lists available page files", () => {
    expect(executeTerminalCommand("ls", routeItems, t)).toEqual({
      type: "output",
      output: ["- about.md", "- work.md", "- capabilities.md", "- contact.md"],
    });
  });

  it("prints a page file with cat", () => {
    expect(executeTerminalCommand("cat work.md", routeItems, t)).toEqual(
      expect.objectContaining({
        type: "output",
        output: expect.arrayContaining(["# Work", "Work body"]),
      }),
    );
  });

  it("clears the terminal history", () => {
    expect(executeTerminalCommand("clear", routeItems, t)).toEqual({
      type: "clear",
      output: [],
    });
  });

  it("closes the terminal for exit", () => {
    expect(executeTerminalCommand("exit", routeItems, t)).toEqual({
      type: "close",
      output: ["Closing terminal."],
    });
  });

  it("focuses a section for open commands", () => {
    expect(executeTerminalCommand("open work", routeItems, t)).toEqual({
      type: "focus",
      target: "work",
      output: ["Focusing work cluster"],
    });
  });

  it("supports cd when focusing sections", () => {
    expect(executeTerminalCommand("cd home", routeItems, t)).toEqual({
      type: "focus",
      target: "about",
      output: ["Focusing about cluster"],
    });
  });

  it("focuses the capabilities section", () => {
    expect(executeTerminalCommand("open capabilities", routeItems, t)).toEqual({
      type: "focus",
      target: "capabilities",
      output: ["Focusing capabilities cluster"],
    });
  });

  it("reports unknown targets", () => {
    expect(executeTerminalCommand("open missing", routeItems, t)).toEqual({
      type: "output",
      output: ["Unknown target: missing", "Use `list` to inspect clusters."],
    });
  });

  it("reports unsupported commands", () => {
    expect(executeTerminalCommand("launch work", routeItems, t)).toEqual({
      type: "output",
      output: ["Unknown command: launch work", "Type `help` for supported commands."],
    });
  });
});
